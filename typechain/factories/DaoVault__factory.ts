/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { DaoVault } from "../DaoVault";

export class DaoVault__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(_WETH: string, overrides?: Overrides): Promise<DaoVault> {
    return super.deploy(_WETH, overrides || {}) as Promise<DaoVault>;
  }
  getDeployTransaction(
    _WETH: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_WETH, overrides || {});
  }
  attach(address: string): DaoVault {
    return super.attach(address) as DaoVault;
  }
  connect(signer: Signer): DaoVault__factory {
    return super.connect(signer) as DaoVault__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DaoVault {
    return new Contract(address, _abi, signerOrProvider) as DaoVault;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_WETH",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reserve",
        type: "uint256",
      },
    ],
    name: "Deposit",
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
        indexed: false,
        internalType: "uint256",
        name: "reserve",
        type: "uint256",
      },
    ],
    name: "UpdateReserve",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reserve",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "WETH",
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
        name: "amount",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserve",
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
    inputs: [],
    name: "updateReserve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051610b11380380610b1183398101604081905261002f9161009d565b6100383361004d565b60601b6001600160601b0319166080526100cb565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100ae578081fd5b81516001600160a01b03811681146100c4578182fd5b9392505050565b60805160601c610a0d6101046000396000818160d801528181610189015281816102a70152818161037f01526104e50152610a0d6000f3fe608060405234801561001057600080fd5b50600436106100875760003560e01c8063b6b55f251161005b578063b6b55f25146100fa578063bac051ad1461010d578063cd3293de14610115578063f2fde38b1461012c57600080fd5b8062f714ce1461008c578063715018a6146100a15780638da5cb5b146100a9578063ad5c4648146100d3575b600080fd5b61009f61009a3660046108b3565b61013f565b005b61009f610326565b6000546001600160a01b03165b6040516001600160a01b0390911681526020015b60405180910390f35b6100b67f000000000000000000000000000000000000000000000000000000000000000081565b61009f610108366004610883565b61035c565b61009f6104a6565b61011e60015481565b6040519081526020016100ca565b61009f61013a366004610869565b6105a1565b6000546001600160a01b031633146101725760405162461bcd60e51b81526004016101699061092d565b60405180910390fd5b6040516370a0823160e01b815230600482015282907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b1580156101d357600080fd5b505afa1580156101e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061020b919061089b565b10156102595760405162461bcd60e51b815260206004820152601a60248201527f44616f5661756c743a6e6f20656e6f7567682062616c616e63650000000000006044820152606401610169565b604080516001600160a01b03838116602483015260448083018690528351808403909101815260649092019092526020810180516001600160e01b031663a9059cbb60e01b1790526102cd917f0000000000000000000000000000000000000000000000000000000000000000169061063c565b5081600160008282546102e0919061097a565b90915550506001546040805184815260208101929092527f56ca301a9219608c91e7bcee90e083c19671d2cdcc96752c7af291cee5f9c8c8910160405180910390a15050565b6000546001600160a01b031633146103505760405162461bcd60e51b81526004016101699061092d565b61035a6000610685565b565b8060015461036a9190610962565b6040516370a0823160e01b81523060048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b1580156103c957600080fd5b505afa1580156103dd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610401919061089b565b101561044f5760405162461bcd60e51b815260206004820152601960248201527f44616f5661756c743a6e6f20656e6f75676820616d6f756e74000000000000006044820152606401610169565b80600160008282546104619190610962565b90915550506001546040805183815260208101929092527fa3af609bf46297028ce551832669030f9effef2b02606d02cbbcc40fe6b47c55910160405180910390a150565b6000546001600160a01b031633146104d05760405162461bcd60e51b81526004016101699061092d565b6040516370a0823160e01b81523060048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b15801561052f57600080fd5b505afa158015610543573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610567919061089b565b60018190556040519081527fb2209630cc27a5f36fad66f0e873c886ed480b2fb7613885f5914d723acd74729060200160405180910390a1565b6000546001600160a01b031633146105cb5760405162461bcd60e51b81526004016101699061092d565b6001600160a01b0381166106305760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610169565b61063981610685565b50565b606061067e83836040518060400160405280601e81526020017f416464726573733a206c6f772d6c6576656c2063616c6c206661696c656400008152506106d5565b9392505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60606106e484846000856106ec565b949350505050565b60608247101561074d5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610169565b843b61079b5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610169565b600080866001600160a01b031685876040516107b791906108de565b60006040518083038185875af1925050503d80600081146107f4576040519150601f19603f3d011682016040523d82523d6000602084013e6107f9565b606091505b5091509150610809828286610814565b979650505050505050565b6060831561082357508161067e565b8251156108335782518084602001fd5b8160405162461bcd60e51b815260040161016991906108fa565b80356001600160a01b038116811461086457600080fd5b919050565b60006020828403121561087a578081fd5b61067e8261084d565b600060208284031215610894578081fd5b5035919050565b6000602082840312156108ac578081fd5b5051919050565b600080604083850312156108c5578081fd5b823591506108d56020840161084d565b90509250929050565b600082516108f0818460208701610991565b9190910192915050565b6020815260008251806020840152610919816040850160208701610991565b601f01601f19169190910160400192915050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008219821115610975576109756109c1565b500190565b60008282101561098c5761098c6109c1565b500390565b60005b838110156109ac578181015183820152602001610994565b838111156109bb576000848401525b50505050565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220253e7b7613b142cce8a16a8054044dfaa5b24079b86595625715169102f4205164736f6c63430008040033";