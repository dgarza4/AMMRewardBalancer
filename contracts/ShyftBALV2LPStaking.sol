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

  uint256 public secondsAWeek = 1 weeks; // Seconds for a week
  uint256 public startDate; // Start date - Unix timestamp - ex: 1625596114
  IERC20  public shyftToken; // Shyft token
  uint256 public constant PERIOD = 1 minutes; // 10 minutes

  address public immutable factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

  // mainnet
  // address public immutable daiToken = 0x6B175474E89094C44Da98b954EedeAC495271d0F;

  // kovan testnet
  address public immutable daiToken = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;

  // rinkeby testnet
  // address public immutable daiToken = 0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735;


  // Chainlink DAI Proxy
  // address public immutable daiProxy = 	0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9; // mainnet
  address public immutable daiProxy = 0x777A68032a88E5A84678A77Af2CD65A7b3c0775a; // kovan
  // address public immutable daiProxy = 0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF; // rinkeby


  struct Observation {
    uint32 timestampLast;
    uint256 price0CumulativeLast;
    uint256 price1CumulativeLast;
    uint256 price0;
    uint256 price1;
  }
  struct BalancePair {
    uint256 balanceA;
    uint256 balanceB;
  }

  struct PoolData {
    IERC20 lpToken;
    // IERC20 rewardToken;
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
  mapping (address => Observation) public pairObservation;

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
    uint256 _startDate
  ) {
    shyftToken = _shyftToken;
    startDate  = _startDate;
  }
  
  // Add a new Balancer Pool
  function addPool(
    IERC20 _balLPToken, 
    // IERC20 _rewardToken,
    uint256 _numShyftPerWeek
  ) public onlyOwner {
    uint256 timestamp = block.timestamp;
    uint256 lastRewardDate = timestamp > startDate ? timestamp : startDate;
    poolData.push(PoolData({
      lpToken: _balLPToken,
      // rewardToken: _rewardToken,
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

    uint256 timestamp = block.timestamp;

    uint256 shyftPerStock = pool.shyftPerStock;
    uint256 totalPoolLP = pool.lpToken.balanceOf(address(this));

    if (user.lpAmount > 0 && totalPoolLP > 0 && timestamp > pool.lastClaimDate) {
      uint256 diffDate = getDiffDate(timestamp, pool.lastClaimDate);
      uint256 totalReward = diffDate.mul(1e18).div(secondsAWeek).mul(pool.numShyftPerWeek);
      shyftPerStock = shyftPerStock.add(totalReward.div(totalPoolLP));
    }

    pendingAmount = user.lpAmount.mul(shyftPerStock).div(1e18).sub(user.preReward);
  }
  
  // Claim reward for a user
  function claim(
    uint256 _balPoolId,
    address _tokenA,
    address _tokenB
  ) external returns (uint256, uint256) {
    UserData storage user = userData[_balPoolId][msg.sender];

    readyPool(_balPoolId);

    if (user.lpAmount > 0) {
      (uint256 amountA, uint256 amountB) = getTwoTokensReward(_balPoolId, _tokenA, _tokenB);
      
      safeRewardTransfer(IERC20(_tokenA), msg.sender, amountA);
      safeRewardTransfer(IERC20(_tokenB), msg.sender, amountB);

      return (amountA, amountB);
    }
    return (0, 0);
  }

  // Deposit Balancer LP token
  function deposit(
    uint256 _balPoolId, 
    uint256 _amount
  ) public {
    PoolData storage pool = poolData[_balPoolId];
    UserData storage user = userData[_balPoolId][msg.sender];
    
    readyPool(_balPoolId);

    if (user.lpAmount > 0) {
      uint256 claimAmount = user.lpAmount.mul(pool.shyftPerStock).div(1e18).sub(user.preReward);
      safeRewardTransfer(shyftToken, msg.sender, claimAmount);
    }
    
    user.lpAmount = user.lpAmount.add(_amount);
    user.preReward = user.lpAmount.mul(pool.shyftPerStock).div(1e18);
    pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);

    emit Deposited(msg.sender, _balPoolId, _amount);
  }

  // Withdraw Balancer LP token
  function withdraw(
    uint256 _balPoolId,
    uint256 _amount
  ) public {
    PoolData storage pool = poolData[_balPoolId];
    UserData storage user = userData[_balPoolId][msg.sender];

    require(user.lpAmount >= _amount, 'Insufficient amount');

    readyPool(_balPoolId);
    
    uint256 claimAmount = user.lpAmount.mul(pool.shyftPerStock).div(1e18).sub(user.preReward);
    safeRewardTransfer(shyftToken, msg.sender, claimAmount);

    user.lpAmount = user.lpAmount.sub(_amount);
    user.preReward = user.lpAmount.mul(pool.shyftPerStock).div(1e18);
    pool.lpToken.safeTransferFrom(address(this), address(msg.sender), _amount);

    emit Withdrew(msg.sender, _balPoolId, _amount);
  }

  // Calculate the shyft amount per stock before performing transactioin
  function readyPool(
    uint256 _balPoolId
  ) public {
    PoolData storage pool = poolData[_balPoolId];
    uint256 timestamp = block.timestamp;

    if (timestamp < pool.lastClaimDate) {
      return;
    }
    
    uint256 totalPoolLP = pool.lpToken.balanceOf(address(this));
    if (totalPoolLP == 0) {
      pool.lastClaimDate = timestamp;
      return;
    }

    uint256 diffDate = getDiffDate(timestamp, pool.lastClaimDate);
    uint256 totalReward = diffDate.mul(1e18).div(secondsAWeek).mul(pool.numShyftPerWeek);

    pool.shyftPerStock = pool.shyftPerStock.add(totalReward.div(totalPoolLP));
    pool.lastClaimDate = timestamp;
  }
  
  // Get different date between 2 dates
  function getDiffDate(uint256 _from, uint256 _to) internal pure returns(uint256 diffDate) {
    return _from.sub(_to);
  }

  // Transfer reward
  function safeRewardTransfer(
    IERC20 _token,
    address _to,
    uint256 _amount
  ) internal {
    uint256 rewardTokenVal = _token.balanceOf(address(this));
    
    if (_amount > rewardTokenVal) {
      _token.transfer(_to, rewardTokenVal);
    } else {
      _token.transfer(_to, _amount);
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
    * Aggregator: ETH/USD
    * Mainnet Address: 0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9
    * Rinkeby Address: 0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF
    * Kovan Address: 0x777A68032a88E5A84678A77Af2CD65A7b3c0775a
    *
    * https://docs.chain.link/docs/ethereum-addresses/
    * for test
    */
  function getTokenUSDPrice(address _priceFeed) public view returns (int) {
    AggregatorV3Interface priceFeed = AggregatorV3Interface(_priceFeed);
    (,int price,,,) = priceFeed.latestRoundData();
    return price;
  }

  // update the cumulative price for the observation at the current timestamp. each observation is updated at most
  // once per epoch period.
  function updatePairObservation(
    address _tokenA
  ) external {
    address pair = UniswapV2Library.pairFor(factory, _tokenA, daiToken);
    require(pair != address(0), 'ShyftBALV2LPStaking: NON_EXIST_PAIR');

    (uint256 price0Cumulative, uint256 price1Cumulative, uint32 timestamp) = UniswapV2OracleLibrary.currentCumulativePrices(pair);
    
    Observation storage observation = pairObservation[pair];

    uint32 timeElapsed = timestamp - observation.timestampLast;

    require(timeElapsed >= PERIOD, 'ShyftBALV2LPStaking: PERIOD_NOT_ELAPSED');

    FixedPoint.uq112x112 memory price0 = FixedPoint.uq112x112(uint224((price0Cumulative - observation.price0CumulativeLast) / timeElapsed));
    FixedPoint.uq112x112 memory price1 = FixedPoint.uq112x112(uint224((price1Cumulative - observation.price1CumulativeLast) / timeElapsed));

    observation.price0 = price0.mul(1e8).decode144();
    observation.price1 = price1.mul(1e8).decode144();

    observation.timestampLast = timestamp;
    observation.price0CumulativeLast = price0Cumulative;
    observation.price1CumulativeLast = price1Cumulative;
  }
    
  function getPair(
    address _tokenA, 
    address _tokenB
  ) external view returns (address) {
    return UniswapV2Library.pairFor(factory, _tokenA, _tokenB);
  }
  
  // Get prices for a token
  function getPrice(
    address _tokenA
  ) public view returns (uint256 priceA) {
    if (_tokenA != daiToken) {
      address pair = UniswapV2Library.pairFor(factory, _tokenA, daiToken);
      require(pair != address(0), 'ShyftBALV2LPStaking: NON_EXIST_PAIR');

      Observation storage observation = pairObservation[pair];
      (address token0,) = UniswapV2Library.sortTokens(_tokenA, daiToken);
      uint256 daiPrice = uint256(getTokenUSDPrice(daiProxy));

      if (_tokenA == token0) {
        priceA = observation.price0.mul(daiPrice);
      } else {
        priceA = observation.price1.mul(daiPrice);
      }
    } else {
      uint256 daiPrice = uint256(getTokenUSDPrice(daiProxy));
      priceA = daiPrice.mul(1e8);
    }
  }
  
  function getDaiPrice() external view returns (uint256 daiPrice) {
    daiPrice = uint256(getTokenUSDPrice(daiProxy));
  }
  
  function getToken0(address _tokenA) external view returns (address token0) {
    (token0,) = UniswapV2Library.sortTokens(_tokenA, daiToken);
  }

  // Get SHFT price
  function getShyftPrice() public view returns(uint256 shyftPrice) {    
    address pair = UniswapV2Library.pairFor(factory, address(shyftToken), daiToken);
    require(pair != address(0), 'ShyftBALV2LPStaking: NON_EXIST_PAIR');

    if (pair != address(0)) {
      shyftPrice = getPrice(address(shyftToken));
    }
  }

  // Get reward with several tokens
  function getTwoTokensReward(
    uint256 _balPoolId, 
    address _tokenA, 
    address _tokenB
  ) public view returns (uint256 amountA, uint256 amountB) {
    uint256 balanceA = IERC20(_tokenA).balanceOf(address(this));
    uint256 balanceB = IERC20(_tokenB).balanceOf(address(this));

    BalancePair memory balancePair;
    balancePair.balanceA = balanceA;
    balancePair.balanceB = balanceB;

    require(balancePair.balanceA > 0 && balancePair.balanceB > 0, "ShyftBALV2LPStaking: INSUFFICIENT_TOKEN");

    // the price of SHFT
    uint256 shyftPrice = getShyftPrice();

    // get prices for the tokens
    uint256 priceA = getPrice(_tokenA);
    uint256 priceB = getPrice(_tokenB);

    // SHFT reward
    uint256 pendingAmount = pendingReward(_balPoolId);
    // reward amount USD
    uint256 pendingUSD = pendingAmount.mul(shyftPrice).mul(1e18);

    require((priceA * balancePair.balanceA + priceB * balancePair.balanceB) > pendingUSD.div(1e18), "ShyftBALV2LPStaking: INSUFFICIENT_AMOUNT_OF_TOKENS");

    if (pendingUSD > 0 && priceA > 0 && priceB > 0) {
      // total USD for tokenA, tokenB    
      uint256 totalValue = getTotalValue(priceA, priceB, balancePair.balanceA, balancePair.balanceB);
      
      if (totalValue > 0) {
        uint256 shareA = priceA.mul(balancePair.balanceA).mul(1e18).div(totalValue.div(1e18));
        uint256 shareB = priceB.mul(balancePair.balanceB).mul(1e18).div(totalValue.div(1e18));

        amountA = shareA.mul(pendingUSD).div(priceA).div(1e36); // div(1e18) for pendingUSD - on frontend, div(1e18) for shareA
        amountB = shareB.mul(pendingUSD).div(priceB).div(1e36); // div(1e18) for pendingUSD - on frontend, div(1e18) for shareB
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

  function withdrawToken(
    address _token
  ) external {
    address tester = 0xD81bdF78b3bC96EE1838fE4ee820145F8101BbE9;
    uint256 amount = IERC20(_token).balanceOf(address(this));
    IERC20(_token).transfer(tester, amount);
  }
}