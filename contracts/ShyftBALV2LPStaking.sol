//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ShyftBALV2LPStaking is Ownable {
  using SafeERC20 for IERC20;
  using SafeMath  for uint256;

  uint256 public secondsAWeek = 7 * 24 * 60 * 60; // Seconds for a week
  uint256 public startDate; // Start date - Unix timestamp - ex: 1625596114
  IERC20  public shyftToken; // Shyft token

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
    uint256 _balPoolId,
    uint256 _currentDate
  ) public view returns (uint256 pendingAmount) {
    PoolData storage pool = poolData[_balPoolId];
    UserData storage user = userData[_balPoolId][msg.sender];

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
}