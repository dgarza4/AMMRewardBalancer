//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2; 

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV2V3Interface.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./interfaces/IUniswapV2Pair.sol";
import "./libraries/FixedPoint.sol";
import "./libraries/FullMath.sol";
import "./libraries/Babylonian.sol";
import "./libraries/BitMath.sol";
import "./libraries/UniswapV2Library.sol";
import "./libraries/UniswapV2OracleLibrary.sol";

contract ShyftBALV2LPStaking is Ownable {
  using FixedPoint for *;
  using SafeERC20 for IERC20;
  using SafeMath  for uint256;

  uint256 public secondsAWeek = 7 * 24 * 60 * 60; // Seconds for a week
  uint256 public startDate; // Start date - Unix timestamp - ex: 1625596114
  IERC20  public shyftToken; // Shyft token

  address public immutable factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

  // mainnet
  // address public immutable daiToken = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
  // address public immutable wEthToken = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

  // kovan testnet
  address public immutable daiToken = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;
  address public immutable wEthToken = 0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1;
  address public immutable wEth9Token = 0xd0A1E359811322d97991E03f863a0C30C2cF029C;

  // the desired amount of time over which the moving average should be computed, e.g. 10 mins
  uint256 public immutable windowSize;

  // the number of observations stored for each pair, i.e. how many price observations are stored for the window.
  // as granularity increases from 1, more frequent updates are needed, but moving averages become more precise.
  // averages are computed over intervals with sizes in the range:
  //   [windowSize - (windowSize / granularity) * 2, windowSize]
  // e.g. if the window size is 10 mins, and the granularity is 10, the oracle will return the average price for
  //   the period:
  //   [now - [8 mins, 10 mins], now]
  uint8 public immutable granularity;

  // this is redundant with granularity and windowSize, but stored for gas savings & informational purposes.
  uint256 public immutable periodSize;

  struct Observation {
    uint256 timestamp;
    uint256 price0Cumulative;
    uint256 price1Cumulative;
  }
  struct BalancePair {
    uint256 balanceA;
    uint256 balanceB;
    uint256 balPoolId;
  }

  struct PoolData {
    IERC20 lpToken;
    IERC20 rewardToken;
    uint256 numShyftPerWeek;
    uint256 lastClaimDate;
    uint256 shyftPerStock;
  }
  struct UserData {
    uint256 lpAmount;
    uint256 preReward;
  }
  
  PoolData[] public poolData;
  mapping (uint256 => mapping (address => UserData)) public userData;
  mapping (address => Observation[]) public pairObservations;

  event Deposited(
    address indexed _from,
    uint256 indexed _id,
    uint256 _amount
  );

  event Withdrew(
    address indexed _to,
    uint256 indexed _id,
    uint256 _amount
  );

  constructor(
    IERC20 _shyftToken,
    uint256 _startDate,
    uint256 _windowSize, 
    uint8 _granularity
  ) {
    shyftToken = _shyftToken;
    startDate  = _startDate;

    require(_granularity > 1, 'SlidingWindowOracle: GRANULARITY');
    require(
      (periodSize = _windowSize / _granularity) * _granularity == _windowSize,
      'SlidingWindowOracle: WINDOW_NOT_EVENLY_DIVISIBLE'
    );
    windowSize = _windowSize;
    granularity = _granularity;
  }
  
  // Add a new Balancer Pool
  function addPool(
    IERC20 _balLPToken, 
    IERC20 _rewardToken,
    uint256 _numShyftPerWeek,
    uint256 _currentDate
  ) public onlyOwner {
    uint256 lastRewardDate = _currentDate > startDate ? _currentDate : startDate;
    poolData.push(PoolData({
      lpToken: _balLPToken,
      rewardToken: _rewardToken,
      numShyftPerWeek: _numShyftPerWeek,
      lastClaimDate: lastRewardDate,
      shyftPerStock: 0 
    }));
  }
  
  // Change numShyftPerWeek for a sepcific Balancer Pool
  function changeNumShyftPerWeek(
    uint256 _balPoolId,
    uint256 _numShyftPerWeek
  ) public onlyOwner {
    PoolData storage pool = poolData[_balPoolId];
    pool.numShyftPerWeek = _numShyftPerWeek;
  }
  
  // Change rewardToken for a sepcific Balancer Pool
  function changeRewardToken(
    uint256 _balPoolId,
    IERC20 _rewardToken
  ) public onlyOwner {
    PoolData storage pool = poolData[_balPoolId];
    pool.rewardToken = _rewardToken;
  }

  // Fund reward token
  function preFund(
    IERC20 _rewardToken, 
    uint256 _amount
  ) public {
    require(msg.sender != address(0), "Require valid address");
    require(_amount > 0, "Require positive value");
    require(_rewardToken.balanceOf(msg.sender) >= _amount, "Require enough amount of reward token");
    _rewardToken.transferFrom(msg.sender, address(this), _amount);
  }
  
  // Get pending reward for a user
  function pendingReward(
    uint256 _balPoolId
  ) public view returns (uint256 pendingAmount) {
    PoolData storage pool = poolData[_balPoolId];
    UserData storage user = userData[_balPoolId][msg.sender];

    uint256 _currentDate = block.timestamp;

    uint256 shyftPerStock = pool.shyftPerStock;
    uint256 totalPoolLP = pool.lpToken.balanceOf(address(this));

    if (user.lpAmount > 0 && totalPoolLP > 0 && _currentDate > pool.lastClaimDate) {
      uint256 diffDate = getDiffDate(_currentDate, pool.lastClaimDate);
      uint256 totalReward = diffDate.mul(1e18).div(secondsAWeek).mul(pool.numShyftPerWeek);
      shyftPerStock = shyftPerStock.add(totalReward.div(totalPoolLP));
    }

    pendingAmount = user.lpAmount.mul(shyftPerStock).div(1e18).sub(user.preReward);
  }
  
  // Claim reward for a user
  function claim(
    uint256 _balPoolId,
    uint256 _currentDate
  ) external returns (uint256) {
    PoolData storage pool = poolData[_balPoolId];
    UserData storage user = userData[_balPoolId][msg.sender];

    readyPool(_balPoolId, _currentDate);

    if (user.lpAmount > 0) {
      uint256 claimAmount = user.lpAmount.mul(pool.shyftPerStock).div(1e18).sub(user.preReward);
      safeRewardTransfer(msg.sender, _balPoolId, claimAmount);

      return claimAmount;
    }
    return 0;
  }

  // Deposit Balancer LP token
  function deposit(
    uint256 _balPoolId, 
    uint256 _amount,
    uint256 _currentDate
  ) public {
    PoolData storage pool = poolData[_balPoolId];
    UserData storage user = userData[_balPoolId][msg.sender];

    readyPool(_balPoolId, _currentDate);

    if (user.lpAmount > 0) {
      uint256 claimAmount = user.lpAmount.mul(pool.shyftPerStock).div(1e18).sub(user.preReward);
      safeRewardTransfer(msg.sender, _balPoolId, claimAmount);
    }
    
    user.lpAmount = user.lpAmount.add(_amount);
    user.preReward = user.lpAmount.mul(pool.shyftPerStock).div(1e18);
    pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);

    emit Deposited(msg.sender, _balPoolId, _amount);
  }

  // Withdraw Balancer LP token
  function withdraw(
    uint256 _balPoolId,
    uint256 _amount,
    uint256 _currentDate
  ) public {
    PoolData storage pool = poolData[_balPoolId];
    UserData storage user = userData[_balPoolId][msg.sender];

    require(user.lpAmount >= _amount, 'Insufficient amount');

    readyPool(_balPoolId, _currentDate);
    
    uint256 claimAmount = user.lpAmount.mul(pool.shyftPerStock).div(1e18).sub(user.preReward);
    safeRewardTransfer(msg.sender, _balPoolId, claimAmount);

    user.lpAmount = user.lpAmount.sub(_amount);
    user.preReward = user.lpAmount.mul(pool.shyftPerStock).div(1e18);
    pool.lpToken.safeTransferFrom(address(this), address(msg.sender), _amount);

    emit Withdrew(msg.sender, _balPoolId, _amount);
  }

  // Calculate the shyft amount per stock before performing transactioin
  function readyPool(
    uint256 _balPoolId,
    uint256 _currentDate
  ) public {
    PoolData storage pool = poolData[_balPoolId];

    if (_currentDate < pool.lastClaimDate) {
      return;
    }
    
    uint256 totalPoolLP = pool.lpToken.balanceOf(address(this));
    if (totalPoolLP == 0) {
      pool.lastClaimDate = _currentDate;
      return;
    }

    uint256 diffDate = getDiffDate(_currentDate, pool.lastClaimDate);
    uint256 totalReward = diffDate.mul(1e18).div(secondsAWeek).mul(pool.numShyftPerWeek);

    pool.shyftPerStock = pool.shyftPerStock.add(totalReward.div(totalPoolLP));
    pool.lastClaimDate = _currentDate;
  }
  
  // Get different date between 2 dates
  function getDiffDate(uint256 _from, uint256 _to) internal pure returns(uint256 diffDate) {
    return _from.sub(_to);
  }

  // Transfer reward
  function safeRewardTransfer(
    address _to, 
    uint256 _balPoolId,
    uint256 _amount
  ) internal {
    PoolData memory pool = poolData[_balPoolId];
    uint256 rewardTokenVal = pool.rewardToken.balanceOf(address(this));
    
    if (_amount > rewardTokenVal) {
      pool.rewardToken.transfer(_to, rewardTokenVal);
    } else {
      pool.rewardToken.transfer(_to, _amount);
    }
  }

  // Get pools length
  function getPoolsLength() external view returns (uint256 poolsLength) {
    poolsLength = poolData.length;
  }

  // Get total pool lp for a specific balancer pool
  function getTotalPoolLP(
    uint256 _balPoolId
  ) external view returns (uint256 totalPoolLP) {
    PoolData storage pool = poolData[_balPoolId];
    totalPoolLP = pool.lpToken.balanceOf(address(this));
  }

  /**
   * Kovan
   * UNI DAI: 0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa
   * UNI UNI: 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984
   * 
   * SHFT: 0xb17c88bda07d28b3838e0c1de6a30eafbcf52d85
   * WETH: 0xdfcea9088c8a88a76ff74892c1457c17dfeef9c1
   */
  

    
  /**
    * Aggregator: ETH/USD
    * Mainnet Address: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
    * Rinkeby Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
    * Kovan Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
    *
    * https://docs.chain.link/docs/ethereum-addresses/
    * for test
    */
  function getTokenUSDPrice(address _priceFeed) external view returns (int) {
    AggregatorV3Interface priceFeed = AggregatorV3Interface(_priceFeed);
    (,int price,,,) = priceFeed.latestRoundData();
    return price;
  }



  // returns the index of the observation corresponding to the given timestamp
  function observationIndexOf(
    uint256 timestamp
  ) public view returns (uint8 index) {
    uint256 epochPeriod = timestamp / periodSize;
    return uint8(epochPeriod % granularity);
  }

  // returns the observation from the oldest epoch (at the beginning of the window) relative to the current time
  function getFirstObservationInWindow(
    address pair
  ) private view returns (Observation storage firstObservation) {
    uint8 observationIndex = observationIndexOf(block.timestamp);
    // no overflow issue. if observationIndex + 1 overflows, result is still zero.
    uint8 firstObservationIndex = (observationIndex + 1) % granularity;
    firstObservation = pairObservations[pair][firstObservationIndex];
  }

  // update the cumulative price for the observation at the current timestamp. each observation is updated at most
  // once per epoch period.
  function updatePairObservations(
    address _tokenA, 
    address _tokenB
  ) external {
    address pair = UniswapV2Library.pairFor(factory, _tokenA, _tokenB);

    // populate the array with empty observations (first call only)
    for (uint256 i = pairObservations[pair].length; i < granularity; i++) {
      pairObservations[pair].push();
    }

    // get the observation for the current period
    uint8 observationIndex = observationIndexOf(block.timestamp);
    Observation storage observation = pairObservations[pair][observationIndex];

    // we only want to commit updates once per period (i.e. windowSize / granularity)
    uint256 timeElapsed = block.timestamp - observation.timestamp;
    if (timeElapsed > periodSize) {
      (uint256 price0Cumulative, uint256 price1Cumulative,) = UniswapV2OracleLibrary.currentCumulativePrices(pair);
      observation.timestamp = block.timestamp;
      observation.price0Cumulative = price0Cumulative;
      observation.price1Cumulative = price1Cumulative;
    }
  }

  function computeAveragePrice(
    uint256 priceCumulativeStart, 
    uint256 priceCumulativeEnd,
    uint256 timeElapsed
  ) private pure returns (uint256 price) {
    // overflow is desired.
    FixedPoint.uq112x112 memory priceAverage = FixedPoint.uq112x112(
      uint224((priceCumulativeEnd - priceCumulativeStart) / timeElapsed)
    );
    price = priceAverage.mul(1).decode144();
  }
    
  function getPair(
    address _tokenA, 
    address _tokenB
  ) public view returns (address) {
    return UniswapV2Library.pairFor(factory, _tokenA, _tokenB);
  }
    
  function getPrice(
    address _tokenA, 
    address _tokenB
  ) public view returns (uint256 priceA, uint256 priceB) {
    address pair = UniswapV2Library.pairFor(factory, _tokenA, _tokenB);    
    Observation storage firstObservation = getFirstObservationInWindow(pair);

    uint256 timeElapsed = block.timestamp - firstObservation.timestamp;
    require(timeElapsed <= windowSize, 'SlidingWindowOracle: MISSING_HISTORICAL_OBSERVATION');
    // should never happen.
    require(timeElapsed >= windowSize - periodSize * 2, 'SlidingWindowOracle: UNEXPECTED_TIME_ELAPSED');

    (uint256 price0Cumulative, uint256 price1Cumulative,) = UniswapV2OracleLibrary.currentCumulativePrices(pair);
    
    priceA = computeAveragePrice(firstObservation.price0Cumulative, price0Cumulative, timeElapsed);
    priceB = computeAveragePrice(firstObservation.price1Cumulative, price1Cumulative, timeElapsed);

    return (priceA, priceB);
  }

  function getShyftPrice() public view returns(uint256 shyftPrice) {
    
    address pair = getPair(address(shyftToken), daiToken);
    if (pair != address(0)) {
      (shyftPrice,) = getPrice(address(shyftToken), daiToken);
    }

    return shyftPrice;
  }
    
  function getTimeElapsed(
    address _tokenA, 
    address _tokenB
  ) external view returns (uint256) {
    address pair = UniswapV2Library.pairFor(factory, _tokenA, _tokenB);
    Observation storage firstObservation = getFirstObservationInWindow(pair);
    
    uint256 timeElapsed = block.timestamp - firstObservation.timestamp;
    return timeElapsed;
  }

  // Get reward with several tokens
  function getTwoTokensReward(
    uint256 _balPoolId, 
    address _tokenA, 
    address _tokenB
  ) external view returns (uint256 amountA, uint256 amountB) {
    uint256 balanceA = IERC20(_tokenA).balanceOf(address(this));
    uint256 balanceB = IERC20(_tokenB).balanceOf(address(this));

    BalancePair memory balancePair;
    balancePair.balanceA = balanceA;
    balancePair.balanceB = balanceB;
    balancePair.balPoolId = _balPoolId;

    require(balancePair.balanceA > 0 && balancePair.balanceB > 0, "Insufficient token");

    uint256 priceA;
    uint256 priceB;
    uint256 shyftPrice;

    address pair;

    pair = getPair(_tokenA, _tokenB);

    // the price of SHFT
    shyftPrice = getShyftPrice();

    // get prices for the tokens
    if (pair != address(0)) {
      (priceA, priceB) = getPrice(_tokenA, _tokenB);
    } else {
      (priceA,) = getPrice(_tokenA, daiToken);
      (priceB,) = getPrice(_tokenB, daiToken);
    }

    // SHFT reward
    uint256 pendingAmount = pendingReward(_balPoolId);
    // reward amount USD
    uint256 pendingUSD = pendingAmount.mul(shyftPrice).mul(1e18);

    require((priceA * balancePair.balanceA + priceB * balancePair.balanceB) > pendingUSD.div(1e18), "Insufficient amount of tokens");

    if (pendingUSD > 0 && priceA > 0 && priceB > 0) {
      // total USD for tokenA, tokenB    
      uint256 totalValue = getTotalValue(priceA, priceB, balanceA, balanceB);
      
      if (totalValue > 0) {
        uint256 shareA = priceA.mul(balancePair.balanceA).mul(1e18).div(totalValue.div(1e18));
        uint256 shareB = priceB.mul(balancePair.balanceB).mul(1e18).div(totalValue.div(1e18));

        amountA = shareA.mul(pendingUSD).div(priceA).div(1e18);
        amountB = shareB.mul(pendingUSD).div(priceB).div(1e18);
      }
    }
  }

  function getTotalValue(
    uint256 _pA, 
    uint256 _pB, 
    uint256 _bA, 
    uint256 _bB
  ) private pure returns (uint256 totalValue) {
    totalValue = _pA.mul(_bA).add(_pB.mul(_bB)).mul(1e18);
  }
  
  function getCurrentCumulativePrices(
    address _tokenA, 
    address _tokenB
  ) external view returns (uint256 price0Cumulative, uint256 price1Cumulative) {
    address pair = UniswapV2Library.pairFor(factory, _tokenA, _tokenB);
    
    (price0Cumulative, price1Cumulative,) = UniswapV2OracleLibrary.currentCumulativePrices(pair);
  }
}