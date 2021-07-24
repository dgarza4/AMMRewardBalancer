/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface ShyftBALV2LPStakingInterface extends ethers.utils.Interface {
  functions: {
    "addPool(address,address,uint256,uint256)": FunctionFragment;
    "changeNumShyftPerWeek(uint256,uint256)": FunctionFragment;
    "changeRewardToken(uint256,address)": FunctionFragment;
    "claim(uint256,uint256)": FunctionFragment;
    "createPairObservation(address,address)": FunctionFragment;
    "daiToken()": FunctionFragment;
    "deposit(uint256,uint256,uint256)": FunctionFragment;
    "factory()": FunctionFragment;
    "getCurrentCumulativePrices(address,address)": FunctionFragment;
    "getPair(address,address)": FunctionFragment;
    "getPoolsLength()": FunctionFragment;
    "getPrice(address,address)": FunctionFragment;
    "getShyftPrice()": FunctionFragment;
    "getTimeElapsed(address,address)": FunctionFragment;
    "getTokenUSDPrice(address)": FunctionFragment;
    "getTotalPoolLP(uint256)": FunctionFragment;
    "getTwoTokensReward(uint256,address,address)": FunctionFragment;
    "granularity()": FunctionFragment;
    "observationIndexOf(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "pairObservations(address,uint256)": FunctionFragment;
    "pendingReward(uint256)": FunctionFragment;
    "periodSize()": FunctionFragment;
    "poolData(uint256)": FunctionFragment;
    "preFund(address,uint256)": FunctionFragment;
    "readyPool(uint256,uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "secondsAWeek()": FunctionFragment;
    "shyftToken()": FunctionFragment;
    "startDate()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updatePairObservations(address,address)": FunctionFragment;
    "userData(uint256,address)": FunctionFragment;
    "wEth9Token()": FunctionFragment;
    "wEthToken()": FunctionFragment;
    "windowSize()": FunctionFragment;
    "withdraw(uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addPool",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeNumShyftPerWeek",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeRewardToken",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createPairObservation",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "daiToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getCurrentCumulativePrices",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getPair",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPrice",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getShyftPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTimeElapsed",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenUSDPrice",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalPoolLP",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTwoTokensReward",
    values: [BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "granularity",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "observationIndexOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pairObservations",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingReward",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "periodSize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "poolData",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "preFund",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "readyPool",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "secondsAWeek",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "shyftToken",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "startDate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updatePairObservations",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "userData",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "wEth9Token",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "wEthToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "windowSize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeNumShyftPerWeek",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeRewardToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createPairObservation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "daiToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentCumulativePrices",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPair", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPoolsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getShyftPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTimeElapsed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenUSDPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalPoolLP",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTwoTokensReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "granularity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "observationIndexOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pairObservations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "periodSize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolData", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "preFund", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "readyPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "secondsAWeek",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "shyftToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "startDate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updatePairObservations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "userData", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wEth9Token", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wEthToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "windowSize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Deposited(address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Withdrew(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdrew"): EventFragment;
}

export class ShyftBALV2LPStaking extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ShyftBALV2LPStakingInterface;

  functions: {
    addPool(
      _balLPToken: string,
      _rewardToken: string,
      _numShyftPerWeek: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeNumShyftPerWeek(
      _balPoolId: BigNumberish,
      _numShyftPerWeek: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeRewardToken(
      _balPoolId: BigNumberish,
      _rewardToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claim(
      _balPoolId: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createPairObservation(
      _tokenA: string,
      _tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    daiToken(overrides?: CallOverrides): Promise<[string]>;

    deposit(
      _balPoolId: BigNumberish,
      _amount: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    factory(overrides?: CallOverrides): Promise<[string]>;

    getCurrentCumulativePrices(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        price0Cumulative: BigNumber;
        price1Cumulative: BigNumber;
      }
    >;

    getPair(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getPoolsLength(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { poolsLength: BigNumber }>;

    getPrice(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { priceA: BigNumber; priceB: BigNumber }
    >;

    getShyftPrice(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { shyftPrice: BigNumber }>;

    getTimeElapsed(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTokenUSDPrice(
      _priceFeed: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTotalPoolLP(
      _balPoolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { totalPoolLP: BigNumber }>;

    getTwoTokensReward(
      _balPoolId: BigNumberish,
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
    >;

    granularity(overrides?: CallOverrides): Promise<[number]>;

    observationIndexOf(
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[number] & { index: number }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pairObservations(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        timestamp: BigNumber;
        price0Cumulative: BigNumber;
        price1Cumulative: BigNumber;
      }
    >;

    pendingReward(
      _balPoolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { pendingAmount: BigNumber }>;

    periodSize(overrides?: CallOverrides): Promise<[BigNumber]>;

    poolData(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, BigNumber, BigNumber] & {
        lpToken: string;
        rewardToken: string;
        numShyftPerWeek: BigNumber;
        lastClaimDate: BigNumber;
        shyftPerStock: BigNumber;
      }
    >;

    preFund(
      _rewardToken: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    readyPool(
      _balPoolId: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    secondsAWeek(overrides?: CallOverrides): Promise<[BigNumber]>;

    shyftToken(overrides?: CallOverrides): Promise<[string]>;

    startDate(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updatePairObservations(
      _tokenA: string,
      _tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    userData(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { lpAmount: BigNumber; preReward: BigNumber }
    >;

    wEth9Token(overrides?: CallOverrides): Promise<[string]>;

    wEthToken(overrides?: CallOverrides): Promise<[string]>;

    windowSize(overrides?: CallOverrides): Promise<[BigNumber]>;

    withdraw(
      _balPoolId: BigNumberish,
      _amount: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addPool(
    _balLPToken: string,
    _rewardToken: string,
    _numShyftPerWeek: BigNumberish,
    _currentDate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeNumShyftPerWeek(
    _balPoolId: BigNumberish,
    _numShyftPerWeek: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeRewardToken(
    _balPoolId: BigNumberish,
    _rewardToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claim(
    _balPoolId: BigNumberish,
    _currentDate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createPairObservation(
    _tokenA: string,
    _tokenB: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  daiToken(overrides?: CallOverrides): Promise<string>;

  deposit(
    _balPoolId: BigNumberish,
    _amount: BigNumberish,
    _currentDate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  factory(overrides?: CallOverrides): Promise<string>;

  getCurrentCumulativePrices(
    _tokenA: string,
    _tokenB: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      price0Cumulative: BigNumber;
      price1Cumulative: BigNumber;
    }
  >;

  getPair(
    _tokenA: string,
    _tokenB: string,
    overrides?: CallOverrides
  ): Promise<string>;

  getPoolsLength(overrides?: CallOverrides): Promise<BigNumber>;

  getPrice(
    _tokenA: string,
    _tokenB: string,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber] & { priceA: BigNumber; priceB: BigNumber }>;

  getShyftPrice(overrides?: CallOverrides): Promise<BigNumber>;

  getTimeElapsed(
    _tokenA: string,
    _tokenB: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTokenUSDPrice(
    _priceFeed: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTotalPoolLP(
    _balPoolId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTwoTokensReward(
    _balPoolId: BigNumberish,
    _tokenA: string,
    _tokenB: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
  >;

  granularity(overrides?: CallOverrides): Promise<number>;

  observationIndexOf(
    timestamp: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  owner(overrides?: CallOverrides): Promise<string>;

  pairObservations(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      timestamp: BigNumber;
      price0Cumulative: BigNumber;
      price1Cumulative: BigNumber;
    }
  >;

  pendingReward(
    _balPoolId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  periodSize(overrides?: CallOverrides): Promise<BigNumber>;

  poolData(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, BigNumber, BigNumber, BigNumber] & {
      lpToken: string;
      rewardToken: string;
      numShyftPerWeek: BigNumber;
      lastClaimDate: BigNumber;
      shyftPerStock: BigNumber;
    }
  >;

  preFund(
    _rewardToken: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  readyPool(
    _balPoolId: BigNumberish,
    _currentDate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  secondsAWeek(overrides?: CallOverrides): Promise<BigNumber>;

  shyftToken(overrides?: CallOverrides): Promise<string>;

  startDate(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updatePairObservations(
    _tokenA: string,
    _tokenB: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  userData(
    arg0: BigNumberish,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { lpAmount: BigNumber; preReward: BigNumber }
  >;

  wEth9Token(overrides?: CallOverrides): Promise<string>;

  wEthToken(overrides?: CallOverrides): Promise<string>;

  windowSize(overrides?: CallOverrides): Promise<BigNumber>;

  withdraw(
    _balPoolId: BigNumberish,
    _amount: BigNumberish,
    _currentDate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addPool(
      _balLPToken: string,
      _rewardToken: string,
      _numShyftPerWeek: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    changeNumShyftPerWeek(
      _balPoolId: BigNumberish,
      _numShyftPerWeek: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    changeRewardToken(
      _balPoolId: BigNumberish,
      _rewardToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    claim(
      _balPoolId: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createPairObservation(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<void>;

    daiToken(overrides?: CallOverrides): Promise<string>;

    deposit(
      _balPoolId: BigNumberish,
      _amount: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    factory(overrides?: CallOverrides): Promise<string>;

    getCurrentCumulativePrices(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        price0Cumulative: BigNumber;
        price1Cumulative: BigNumber;
      }
    >;

    getPair(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getPoolsLength(overrides?: CallOverrides): Promise<BigNumber>;

    getPrice(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { priceA: BigNumber; priceB: BigNumber }
    >;

    getShyftPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getTimeElapsed(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenUSDPrice(
      _priceFeed: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalPoolLP(
      _balPoolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTwoTokensReward(
      _balPoolId: BigNumberish,
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountA: BigNumber; amountB: BigNumber }
    >;

    granularity(overrides?: CallOverrides): Promise<number>;

    observationIndexOf(
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    owner(overrides?: CallOverrides): Promise<string>;

    pairObservations(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        timestamp: BigNumber;
        price0Cumulative: BigNumber;
        price1Cumulative: BigNumber;
      }
    >;

    pendingReward(
      _balPoolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    periodSize(overrides?: CallOverrides): Promise<BigNumber>;

    poolData(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, BigNumber, BigNumber] & {
        lpToken: string;
        rewardToken: string;
        numShyftPerWeek: BigNumber;
        lastClaimDate: BigNumber;
        shyftPerStock: BigNumber;
      }
    >;

    preFund(
      _rewardToken: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    readyPool(
      _balPoolId: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    secondsAWeek(overrides?: CallOverrides): Promise<BigNumber>;

    shyftToken(overrides?: CallOverrides): Promise<string>;

    startDate(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updatePairObservations(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<void>;

    userData(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { lpAmount: BigNumber; preReward: BigNumber }
    >;

    wEth9Token(overrides?: CallOverrides): Promise<string>;

    wEthToken(overrides?: CallOverrides): Promise<string>;

    windowSize(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      _balPoolId: BigNumberish,
      _amount: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    Deposited(
      _from?: string | null,
      _id?: BigNumberish | null,
      _amount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { _from: string; _id: BigNumber; _amount: BigNumber }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    Withdrew(
      _to?: string | null,
      _id?: BigNumberish | null,
      _amount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { _to: string; _id: BigNumber; _amount: BigNumber }
    >;
  };

  estimateGas: {
    addPool(
      _balLPToken: string,
      _rewardToken: string,
      _numShyftPerWeek: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeNumShyftPerWeek(
      _balPoolId: BigNumberish,
      _numShyftPerWeek: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeRewardToken(
      _balPoolId: BigNumberish,
      _rewardToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claim(
      _balPoolId: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createPairObservation(
      _tokenA: string,
      _tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    daiToken(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      _balPoolId: BigNumberish,
      _amount: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentCumulativePrices(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPair(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolsLength(overrides?: CallOverrides): Promise<BigNumber>;

    getPrice(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getShyftPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getTimeElapsed(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenUSDPrice(
      _priceFeed: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalPoolLP(
      _balPoolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTwoTokensReward(
      _balPoolId: BigNumberish,
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    granularity(overrides?: CallOverrides): Promise<BigNumber>;

    observationIndexOf(
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pairObservations(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingReward(
      _balPoolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    periodSize(overrides?: CallOverrides): Promise<BigNumber>;

    poolData(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    preFund(
      _rewardToken: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    readyPool(
      _balPoolId: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    secondsAWeek(overrides?: CallOverrides): Promise<BigNumber>;

    shyftToken(overrides?: CallOverrides): Promise<BigNumber>;

    startDate(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updatePairObservations(
      _tokenA: string,
      _tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    userData(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    wEth9Token(overrides?: CallOverrides): Promise<BigNumber>;

    wEthToken(overrides?: CallOverrides): Promise<BigNumber>;

    windowSize(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      _balPoolId: BigNumberish,
      _amount: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addPool(
      _balLPToken: string,
      _rewardToken: string,
      _numShyftPerWeek: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeNumShyftPerWeek(
      _balPoolId: BigNumberish,
      _numShyftPerWeek: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeRewardToken(
      _balPoolId: BigNumberish,
      _rewardToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claim(
      _balPoolId: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createPairObservation(
      _tokenA: string,
      _tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    daiToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      _balPoolId: BigNumberish,
      _amount: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentCumulativePrices(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPair(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPrice(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getShyftPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTimeElapsed(
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenUSDPrice(
      _priceFeed: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalPoolLP(
      _balPoolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTwoTokensReward(
      _balPoolId: BigNumberish,
      _tokenA: string,
      _tokenB: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    granularity(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    observationIndexOf(
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pairObservations(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingReward(
      _balPoolId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    periodSize(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolData(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    preFund(
      _rewardToken: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    readyPool(
      _balPoolId: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    secondsAWeek(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    shyftToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    startDate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updatePairObservations(
      _tokenA: string,
      _tokenB: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    userData(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    wEth9Token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wEthToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    windowSize(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdraw(
      _balPoolId: BigNumberish,
      _amount: BigNumberish,
      _currentDate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
