/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ShyftBALV2LPStaking,
  ShyftBALV2LPStakingInterface,
} from "../ShyftBALV2LPStaking";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_shyftToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_startDate",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Deposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Withdrew",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_balLPToken",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_rewardToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_numShyftPerWeek",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_currentDate",
        type: "uint256",
      },
    ],
    name: "addPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_balPoolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numShyftPerWeek",
        type: "uint256",
      },
    ],
    name: "changeNumShyftPerWeek",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_balPoolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_currentDate",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_balPoolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_currentDate",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "poolsLength",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_balPoolId",
        type: "uint256",
      },
    ],
    name: "getTotalPoolLP",
    outputs: [
      {
        internalType: "uint256",
        name: "totalPoolLP",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_balPoolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_currentDate",
        type: "uint256",
      },
    ],
    name: "pendingReward",
    outputs: [
      {
        internalType: "uint256",
        name: "pendingAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "poolData",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "lpToken",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "rewardToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "numShyftPerWeek",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastClaimDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "shyftPerStock",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_rewardToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "preFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_balPoolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_currentDate",
        type: "uint256",
      },
    ],
    name: "readyPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "secondsAWeek",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "shyftToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userData",
    outputs: [
      {
        internalType: "uint256",
        name: "lpAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "preReward",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_balPoolId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_currentDate",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405262093a806001553480156200001857600080fd5b5060405162002b8538038062002b8583398181016040528101906200003e919062000174565b6000620000506200013e60201b60201c565b9050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060028190555050506200023b565b600033905090565b600081519050620001578162000207565b92915050565b6000815190506200016e8162000221565b92915050565b600080604083850312156200018857600080fd5b6000620001988582860162000146565b9250506020620001ab858286016200015d565b9150509250929050565b6000620001c282620001dd565b9050919050565b6000620001d682620001b5565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6200021281620001c9565b81146200021e57600080fd5b50565b6200022c81620001fd565b81146200023857600080fd5b50565b61293a806200024b6000396000f3fe608060405234801561001057600080fd5b50600436106101155760003560e01c8063a41fe49f116100a2578063ce883cdb11610071578063ce883cdb146102cb578063e5df5614146102e9578063ec00208114610307578063f2fde38b1461033b578063fa7afc731461035757610115565b8063a41fe49f14610247578063ad1fdc9314610263578063c20632ba1461027f578063c34902631461029b57610115565b806361eee247116100e957806361eee247146101a057806371037894146101d0578063715018a6146102015780637f1262851461020b5780638da5cb5b1461022957610115565b8062aeef8a1461011a5780630b97bc86146101365780633185c0bd1461015457806334a067cb14610184575b600080fd5b610134600480360381019061012f9190611ffd565b610373565b005b61013e610589565b60405161014b91906125fd565b60405180910390f35b61016e60048036038101906101699190611fc1565b61058f565b60405161017b91906125fd565b60405180910390f35b61019e60048036038101906101999190611fc1565b6107ea565b005b6101ba60048036038101906101b59190611f33565b6108c0565b6040516101c791906125fd565b60405180910390f35b6101ea60048036038101906101e59190611f85565b6109c2565b6040516101f8929190612618565b60405180910390f35b6102096109f3565b005b610213610b2d565b60405161022091906125fd565b60405180910390f35b610231610b33565b60405161023e91906123d2565b60405180910390f35b610261600480360381019061025c9190611ffd565b610b5c565b005b61027d60048036038101906102789190611fc1565b610dab565b005b61029960048036038101906102949190611e94565b610f71565b005b6102b560048036038101906102b09190611fc1565b611138565b6040516102c291906125fd565b60405180910390f35b6102d3611262565b6040516102e091906125fd565b60405180910390f35b6102f161126f565b6040516102fe919061244d565b60405180910390f35b610321600480360381019061031c9190611f33565b611295565b604051610332959493929190612468565b60405180910390f35b61035560048036038101906103509190611e42565b61131b565b005b610371600480360381019061036c9190611ef7565b6114c4565b005b6000600484815481106103af577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000209060050201905060006005600086815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905061041d8584610dab565b6000816000015411156104865760006104778260010154610469670de0b6b3a764000061045b8760040154876000015461177b90919063ffffffff16565b61179190919063ffffffff16565b6117a790919063ffffffff16565b90506104843387836117bd565b505b61049d848260000154611aa890919063ffffffff16565b81600001819055506104da670de0b6b3a76400006104cc8460040154846000015461177b90919063ffffffff16565b61179190919063ffffffff16565b81600101819055506105333330868560000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16611abe909392919063ffffffff16565b843373ffffffffffffffffffffffffffffffffffffffff167f73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca8660405161057a91906125fd565b60405180910390a35050505050565b60025481565b600080600484815481106105cc577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000209060050201905060006005600086815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008260040154905060008360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161069891906123d2565b60206040518083038186803b1580156106b057600080fd5b505afa1580156106c4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e89190611f5c565b9050600083600001541180156106fe5750600081115b801561070d5750836003015486115b15610797576000610722878660030154611b47565b9050600061076b866002015461075d60015461074f670de0b6b3a76400008761177b90919063ffffffff16565b61179190919063ffffffff16565b61177b90919063ffffffff16565b9050610792610783848361179190919063ffffffff16565b85611aa890919063ffffffff16565b935050505b6107de83600101546107d0670de0b6b3a76400006107c286886000015461177b90919063ffffffff16565b61179190919063ffffffff16565b6117a790919063ffffffff16565b94505050505092915050565b6107f2611b64565b73ffffffffffffffffffffffffffffffffffffffff16610810610b33565b73ffffffffffffffffffffffffffffffffffffffff1614610866576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085d9061253d565b60405180910390fd5b6000600483815481106108a2577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090600502019050818160020181905550505050565b600080600483815481106108fd577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020906005020190508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161096a91906123d2565b60206040518083038186803b15801561098257600080fd5b505afa158015610996573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ba9190611f5c565b915050919050565b6005602052816000526040600020602052806000526040600020600091509150508060000154908060010154905082565b6109fb611b64565b73ffffffffffffffffffffffffffffffffffffffff16610a19610b33565b73ffffffffffffffffffffffffffffffffffffffff1614610a6f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a669061253d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60015481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600060048481548110610b98577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000209060050201905060006005600086815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508381600001541015610c43576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3a9061255d565b60405180910390fd5b610c4d8584610dab565b6000610c9a8260010154610c8c670de0b6b3a7640000610c7e8760040154876000015461177b90919063ffffffff16565b61179190919063ffffffff16565b6117a790919063ffffffff16565b9050610ca73387836117bd565b610cbe8583600001546117a790919063ffffffff16565b8260000181905550610cfb670de0b6b3a7640000610ced8560040154856000015461177b90919063ffffffff16565b61179190919063ffffffff16565b8260010181905550610d543033878660000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16611abe909392919063ffffffff16565b853373ffffffffffffffffffffffffffffffffffffffff167fadec52fcd1408589179b85e44b434374db078b4eaf793e7d1a1bb0ae4ecfeee587604051610d9b91906125fd565b60405180910390a3505050505050565b600060048381548110610de7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906000526020600020906005020190508060030154821015610e095750610f6d565b60008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610e6891906123d2565b60206040518083038186803b158015610e8057600080fd5b505afa158015610e94573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eb89190611f5c565b90506000811415610ed3578282600301819055505050610f6d565b6000610ee3848460030154611b47565b90506000610f2c8460020154610f1e600154610f10670de0b6b3a76400008761177b90919063ffffffff16565b61179190919063ffffffff16565b61177b90919063ffffffff16565b9050610f57610f44848361179190919063ffffffff16565b8560040154611aa890919063ffffffff16565b8460040181905550848460030181905550505050505b5050565b610f79611b64565b73ffffffffffffffffffffffffffffffffffffffff16610f97610b33565b73ffffffffffffffffffffffffffffffffffffffff1614610fed576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fe49061253d565b60405180910390fd5b6000600254821161100057600254611002565b815b905060046040518060a001604052808773ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018381526020016000815250908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015550505050505050565b60008060048481548110611175577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000209060050201905060006005600086815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506111e38585610dab565b60008160000154111561125557600061123d826001015461122f670de0b6b3a76400006112218760040154876000015461177b90919063ffffffff16565b61179190919063ffffffff16565b6117a790919063ffffffff16565b905061124a3387836117bd565b80935050505061125c565b6000925050505b92915050565b6000600480549050905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600481815481106112a557600080fd5b90600052602060002090600502016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030154908060040154905085565b611323611b64565b73ffffffffffffffffffffffffffffffffffffffff16611341610b33565b73ffffffffffffffffffffffffffffffffffffffff1614611397576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161138e9061253d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611407576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113fe906124fd565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611534576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161152b906125bd565b60405180910390fd5b60008111611577576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161156e906124dd565b60405180910390fd5b808273ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016115b191906123d2565b60206040518083038186803b1580156115c957600080fd5b505afa1580156115dd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116019190611f5c565b1015611642576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611639906125dd565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff1663095ea7b33061167764174876e80085611aa890919063ffffffff16565b6040518363ffffffff1660e01b8152600401611694929190612424565b602060405180830381600087803b1580156116ae57600080fd5b505af11580156116c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116e69190611e6b565b508173ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401611724939291906123ed565b602060405180830381600087803b15801561173e57600080fd5b505af1158015611752573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117769190611e6b565b505050565b6000818361178991906126fa565b905092915050565b6000818361179f91906126c9565b905092915050565b600081836117b59190612754565b905092915050565b6000600483815481106117f9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002090600502016040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201548152505090506000816020015173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161191d91906123d2565b60206040518083038186803b15801561193557600080fd5b505afa158015611949573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061196d9190611f5c565b905080831115611a0e57816020015173ffffffffffffffffffffffffffffffffffffffff1663a9059cbb86836040518363ffffffff1660e01b81526004016119b6929190612424565b602060405180830381600087803b1580156119d057600080fd5b505af11580156119e4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a089190611e6b565b50611aa1565b816020015173ffffffffffffffffffffffffffffffffffffffff1663a9059cbb86856040518363ffffffff1660e01b8152600401611a4d929190612424565b602060405180830381600087803b158015611a6757600080fd5b505af1158015611a7b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a9f9190611e6b565b505b5050505050565b60008183611ab69190612673565b905092915050565b611b41846323b872dd60e01b858585604051602401611adf939291906123ed565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611b6c565b50505050565b6000611b5c82846117a790919063ffffffff16565b905092915050565b600033905090565b6000611bce826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16611c339092919063ffffffff16565b9050600081511115611c2e5780806020019051810190611bee9190611e6b565b611c2d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c249061259d565b60405180910390fd5b5b505050565b6060611c428484600085611c4b565b90509392505050565b606082471015611c90576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c879061251d565b60405180910390fd5b611c9985611d5f565b611cd8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ccf9061257d565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611d0191906123bb565b60006040518083038185875af1925050503d8060008114611d3e576040519150601f19603f3d011682016040523d82523d6000602084013e611d43565b606091505b5091509150611d53828286611d72565b92505050949350505050565b600080823b905060008111915050919050565b60608315611d8257829050611dd2565b600083511115611d955782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dc991906124bb565b60405180910390fd5b9392505050565b600081359050611de8816128a8565b92915050565b600081519050611dfd816128bf565b92915050565b600081359050611e12816128d6565b92915050565b600081359050611e27816128ed565b92915050565b600081519050611e3c816128ed565b92915050565b600060208284031215611e5457600080fd5b6000611e6284828501611dd9565b91505092915050565b600060208284031215611e7d57600080fd5b6000611e8b84828501611dee565b91505092915050565b60008060008060808587031215611eaa57600080fd5b6000611eb887828801611e03565b9450506020611ec987828801611e03565b9350506040611eda87828801611e18565b9250506060611eeb87828801611e18565b91505092959194509250565b60008060408385031215611f0a57600080fd5b6000611f1885828601611e03565b9250506020611f2985828601611e18565b9150509250929050565b600060208284031215611f4557600080fd5b6000611f5384828501611e18565b91505092915050565b600060208284031215611f6e57600080fd5b6000611f7c84828501611e2d565b91505092915050565b60008060408385031215611f9857600080fd5b6000611fa685828601611e18565b9250506020611fb785828601611dd9565b9150509250929050565b60008060408385031215611fd457600080fd5b6000611fe285828601611e18565b9250506020611ff385828601611e18565b9150509250929050565b60008060006060848603121561201257600080fd5b600061202086828701611e18565b935050602061203186828701611e18565b925050604061204286828701611e18565b9150509250925092565b61205581612788565b82525050565b600061206682612641565b6120708185612657565b9350612080818560208601612806565b80840191505092915050565b612095816127e2565b82525050565b60006120a68261264c565b6120b08185612662565b93506120c0818560208601612806565b6120c981612897565b840191505092915050565b60006120e1601683612662565b91507f5265717569726520706f7369746976652076616c7565000000000000000000006000830152602082019050919050565b6000612121602683612662565b91507f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008301527f64647265737300000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612187602683612662565b91507f416464726573733a20696e73756666696369656e742062616c616e636520666f60008301527f722063616c6c00000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006121ed602083612662565b91507f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726000830152602082019050919050565b600061222d601383612662565b91507f496e73756666696369656e7420616d6f756e74000000000000000000000000006000830152602082019050919050565b600061226d601d83612662565b91507f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006000830152602082019050919050565b60006122ad602a83612662565b91507f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008301527f6f742073756363656564000000000000000000000000000000000000000000006020830152604082019050919050565b6000612313601583612662565b91507f526571756972652076616c6964206164647265737300000000000000000000006000830152602082019050919050565b6000612353602583612662565b91507f5265717569726520656e6f75676820616d6f756e74206f66207265776172642060008301527f746f6b656e0000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6123b5816127d8565b82525050565b60006123c7828461205b565b915081905092915050565b60006020820190506123e7600083018461204c565b92915050565b6000606082019050612402600083018661204c565b61240f602083018561204c565b61241c60408301846123ac565b949350505050565b6000604082019050612439600083018561204c565b61244660208301846123ac565b9392505050565b6000602082019050612462600083018461208c565b92915050565b600060a08201905061247d600083018861208c565b61248a602083018761208c565b61249760408301866123ac565b6124a460608301856123ac565b6124b160808301846123ac565b9695505050505050565b600060208201905081810360008301526124d5818461209b565b905092915050565b600060208201905081810360008301526124f6816120d4565b9050919050565b6000602082019050818103600083015261251681612114565b9050919050565b600060208201905081810360008301526125368161217a565b9050919050565b60006020820190508181036000830152612556816121e0565b9050919050565b6000602082019050818103600083015261257681612220565b9050919050565b6000602082019050818103600083015261259681612260565b9050919050565b600060208201905081810360008301526125b6816122a0565b9050919050565b600060208201905081810360008301526125d681612306565b9050919050565b600060208201905081810360008301526125f681612346565b9050919050565b600060208201905061261260008301846123ac565b92915050565b600060408201905061262d60008301856123ac565b61263a60208301846123ac565b9392505050565b600081519050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600061267e826127d8565b9150612689836127d8565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156126be576126bd612839565b5b828201905092915050565b60006126d4826127d8565b91506126df836127d8565b9250826126ef576126ee612868565b5b828204905092915050565b6000612705826127d8565b9150612710836127d8565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561274957612748612839565b5b828202905092915050565b600061275f826127d8565b915061276a836127d8565b92508282101561277d5761277c612839565b5b828203905092915050565b6000612793826127b8565b9050919050565b60008115159050919050565b60006127b182612788565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006127ed826127f4565b9050919050565b60006127ff826127b8565b9050919050565b60005b83811015612824578082015181840152602081019050612809565b83811115612833576000848401525b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000601f19601f8301169050919050565b6128b181612788565b81146128bc57600080fd5b50565b6128c88161279a565b81146128d357600080fd5b50565b6128df816127a6565b81146128ea57600080fd5b50565b6128f6816127d8565b811461290157600080fd5b5056fea26469706673582212206c1372fb3c8c3dadd98cca06cba786eb809a4b33ed52fe1fd60b0fae70aeba8a64736f6c63430008000033";

export class ShyftBALV2LPStaking__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _shyftToken: string,
    _startDate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ShyftBALV2LPStaking> {
    return super.deploy(
      _shyftToken,
      _startDate,
      overrides || {}
    ) as Promise<ShyftBALV2LPStaking>;
  }
  getDeployTransaction(
    _shyftToken: string,
    _startDate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_shyftToken, _startDate, overrides || {});
  }
  attach(address: string): ShyftBALV2LPStaking {
    return super.attach(address) as ShyftBALV2LPStaking;
  }
  connect(signer: Signer): ShyftBALV2LPStaking__factory {
    return super.connect(signer) as ShyftBALV2LPStaking__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ShyftBALV2LPStakingInterface {
    return new utils.Interface(_abi) as ShyftBALV2LPStakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ShyftBALV2LPStaking {
    return new Contract(address, _abi, signerOrProvider) as ShyftBALV2LPStaking;
  }
}
