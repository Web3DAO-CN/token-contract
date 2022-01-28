/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { ChildERC20 } from "../ChildERC20";

export class ChildERC20__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    childChainManager: string,
    overrides?: Overrides
  ): Promise<ChildERC20> {
    return super.deploy(
      name_,
      symbol_,
      decimals_,
      childChainManager,
      overrides || {}
    ) as Promise<ChildERC20>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    childChainManager: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      decimals_,
      childChainManager,
      overrides || {}
    );
  }
  attach(address: string): ChildERC20 {
    return super.attach(address) as ChildERC20;
  }
  connect(signer: Signer): ChildERC20__factory {
    return super.connect(signer) as ChildERC20__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChildERC20 {
    return new Contract(address, _abi, signerOrProvider) as ChildERC20;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "childChainManager",
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
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "relayerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "functionSignature",
        type: "bytes",
      },
    ],
    name: "MetaTransactionExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "CHILD_CHAIN_ID",
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
    name: "CHILD_CHAIN_ID_BYTES",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEPOSITOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ERC712_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ROOT_CHAIN_ID",
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
    name: "ROOT_CHAIN_ID_BYTES",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "depositData",
        type: "bytes",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "functionSignature",
        type: "bytes",
      },
      {
        internalType: "bytes32",
        name: "sigR",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "sigS",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "sigV",
        type: "uint8",
      },
    ],
    name: "executeMetaTransaction",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getDomainSeperator",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526008805460ff191690553480156200001b57600080fd5b506040516200262138038062002621833981810160405260808110156200004157600080fd5b81019080805160405193929190846401000000008211156200006257600080fd5b9083019060208201858111156200007857600080fd5b82516401000000008111828201881017156200009357600080fd5b82525081516020918201929091019080838360005b83811015620000c2578181015183820152602001620000a8565b50505050905090810190601f168015620000f05780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200011457600080fd5b9083019060208201858111156200012a57600080fd5b82516401000000008111828201881017156200014557600080fd5b82525081516020918201929091019080838360005b83811015620001745781810151838201526020016200015a565b50505050905090810190601f168015620001a25780820380516001836020036101000a031916815260200191505b50604090815260208281015192909101518651929450925085918591620001cf9160039185019062000645565b508051620001e590600490602084019062000645565b50506005805460ff191660121790555060408051808201909152600a81526904368696c6445524332360b41b60208201526200022a906001600160e01b03620002d316565b6200023e826001600160e01b036200037916565b620002666000620002576001600160e01b036200038f16565b6001600160e01b03620003ac16565b604080516d4445504f5349544f525f524f4c4560901b8152905190819003600e0190206200029e90826001600160e01b03620003ac16565b620002c984604051806040016040528060018152602001603160f81b815250620003c160201b60201c565b50505050620006e7565b806040516020018082805190602001908083835b60208310620003085780518252601f199092019160209182019101620002e7565b51815160209384036101000a60001901801990921691161790527f3a20494e53554646494349454e545f5045524d495353494f4e530000000000009190930190815260408051808303600519018152601a9092019052805162000375955060079450920191905062000645565b5050565b6005805460ff191660ff92909216919091179055565b6000620003a66200043160201b620018c71760201c565b90505b90565b6200037582826001600160e01b036200049016565b60085460ff16156200040b576040805162461bcd60e51b815260206004820152600e60248201526d185b1c9958591e481a5b9a5d195960921b604482015290519081900360640190fd5b6200042082826001600160e01b036200051416565b50506008805460ff19166001179055565b6000333014156200048b5760606000368080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050503601516001600160a01b03169150620003a99050565b503390565b6000828152600660209081526040909120620004b791839062001a44620005a8821b17901c565b156200037557620004d06001600160e01b036200038f16565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6040518060800160405280604f8152602001620025d2604f913980519060200120828051906020012082805190602001203062000556620005d160201b60201c565b604080516020808201979097528082019590955260608501939093526001600160a01b03909116608084015260a0808401919091528151808403909101815260c0909201905280519101206009555050565b6000620005c8836001600160a01b0384166001600160e01b03620005d516565b90505b92915050565b4690565b6000620005ec83836001600160e01b036200062d16565b6200062457508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620005cb565b506000620005cb565b60009081526001919091016020526040902054151590565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200068857805160ff1916838001178555620006b8565b82800160010185558215620006b8579182015b82811115620006b85782518255916020019190600101906200069b565b50620006c6929150620006ca565b5090565b620003a991905b80821115620006c65760008155600101620006d1565b611edb80620006f76000396000f3fe6080604052600436106101d85760003560e01c806336568abe11610102578063a217fddf11610095578063ca15c87311610064578063ca15c8731461073d578063cf2c52cb14610767578063d547741f146107f4578063dd62ed3e1461082d576101d8565b8063a217fddf146106a1578063a3b0b5a3146106b6578063a457c2d7146106cb578063a9059cbb14610704576101d8565b80638acfcaf7116100d15780638acfcaf7146105f25780639010d07c1461060757806391d148541461065357806395d89b411461068c576101d8565b806336568abe146105385780633950935114610571578063626381a0146105aa57806370a08231146105bf576101d8565b806320379ee51161017a5780632e1a7d4d116101495780632e1a7d4d146104935780632f2ff15d146104bf578063313ce567146104f85780633408e47014610523576101d8565b806320379ee5146103de57806323b872dd146103f3578063248a9ca3146104365780632d0335ab14610460576101d8565b80630c53c51c116101b65780630c53c51c146102c95780630dd7531a1461038d5780630f7e5970146103a257806318160ddd146103b7576101d8565b806306fdde03146101dd578063095ea7b3146102675780630b54817c146102b4575b600080fd5b3480156101e957600080fd5b506101f2610868565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561022c578181015183820152602001610214565b50505050905090810190601f1680156102595780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561027357600080fd5b506102a06004803603604081101561028a57600080fd5b506001600160a01b0381351690602001356108fe565b604080519115158252519081900360200190f35b3480156102c057600080fd5b506101f261091c565b6101f2600480360360a08110156102df57600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561030a57600080fd5b82018360208201111561031c57600080fd5b8035906020019184600183028401116401000000008311171561033e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550508235935050506020810135906040013560ff16610939565b34801561039957600080fd5b506101f2610c3c565b3480156103ae57600080fd5b506101f2610c59565b3480156103c357600080fd5b506103cc610c76565b60408051918252519081900360200190f35b3480156103ea57600080fd5b506103cc610c7c565b3480156103ff57600080fd5b506102a06004803603606081101561041657600080fd5b506001600160a01b03813581169160208101359091169060400135610c82565b34801561044257600080fd5b506103cc6004803603602081101561045957600080fd5b5035610d0f565b34801561046c57600080fd5b506103cc6004803603602081101561048357600080fd5b50356001600160a01b0316610d24565b34801561049f57600080fd5b506104bd600480360360208110156104b657600080fd5b5035610d3f565b005b3480156104cb57600080fd5b506104bd600480360360408110156104e257600080fd5b50803590602001356001600160a01b0316610d53565b34801561050457600080fd5b5061050d610dbf565b6040805160ff9092168252519081900360200190f35b34801561052f57600080fd5b506103cc610dc8565b34801561054457600080fd5b506104bd6004803603604081101561055b57600080fd5b50803590602001356001600160a01b0316610dcc565b34801561057d57600080fd5b506102a06004803603604081101561059457600080fd5b506001600160a01b038135169060200135610e2d565b3480156105b657600080fd5b506103cc610e81565b3480156105cb57600080fd5b506103cc600480360360208110156105e257600080fd5b50356001600160a01b0316610e86565b3480156105fe57600080fd5b506103cc610ea1565b34801561061357600080fd5b506106376004803603604081101561062a57600080fd5b5080359060200135610ea6565b604080516001600160a01b039092168252519081900360200190f35b34801561065f57600080fd5b506102a06004803603604081101561067657600080fd5b50803590602001356001600160a01b0316610ecb565b34801561069857600080fd5b506101f2610ee9565b3480156106ad57600080fd5b506103cc610f4a565b3480156106c257600080fd5b506103cc610f4f565b3480156106d757600080fd5b506102a0600480360360408110156106ee57600080fd5b506001600160a01b038135169060200135610f75565b34801561071057600080fd5b506102a06004803603604081101561072757600080fd5b506001600160a01b038135169060200135610fe3565b34801561074957600080fd5b506103cc6004803603602081101561076057600080fd5b5035610ff7565b34801561077357600080fd5b506104bd6004803603604081101561078a57600080fd5b6001600160a01b0382351691908101906040810160208201356401000000008111156107b557600080fd5b8201836020820111156107c757600080fd5b803590602001918460018302840111640100000000831117156107e957600080fd5b50909250905061100e565b34801561080057600080fd5b506104bd6004803603604081101561081757600080fd5b50803590602001356001600160a01b0316611105565b34801561083957600080fd5b506103cc6004803603604081101561085057600080fd5b506001600160a01b038135811691602001351661115e565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156108f45780601f106108c9576101008083540402835291602001916108f4565b820191906000526020600020905b8154815290600101906020018083116108d757829003601f168201915b5050505050905090565b600061091261090b611189565b8484611198565b5060015b92915050565b604051806040016040528060018152602001608960f81b81525081565b6060610943611bfe565b50604080516060810182526001600160a01b0388166000818152600a6020908152908490205483528201529081018690526109818782878787611284565b6109bc5760405162461bcd60e51b8152600401808060200182810382526021815260200180611dc76021913960400191505060405180910390fd5b6001600160a01b0387166000908152600a60205260409020546109e690600163ffffffff61136116565b6001600160a01b0388166000818152600a602090815260408083209490945583519283523383820181905260609484018581528b51958501959095528a517f5845892132946850460bff5a0083f71031bc5bf9aadcd40f1de79423eac9b10b958d9592948d94919260808501928601918190849084905b83811015610a75578181015183820152602001610a5d565b50505050905090810190601f168015610aa25780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a160006060306001600160a01b0316888a6040516020018083805190602001908083835b60208310610af35780518252601f199092019160209182019101610ad4565b6001836020036101000a038019825116818451168082178552505050505050905001826001600160a01b03166001600160a01b031660601b8152601401925050506040516020818303038152906040526040518082805190602001908083835b60208310610b725780518252601f199092019160209182019101610b53565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610bd4576040519150601f19603f3d011682016040523d82523d6000602084013e610bd9565b606091505b509150915081610c30576040805162461bcd60e51b815260206004820152601c60248201527f46756e6374696f6e2063616c6c206e6f74207375636365737366756c00000000604482015290519081900360640190fd5b98975050505050505050565b604051806040016040528060018152602001600160f81b81525081565b604051806040016040528060018152602001603160f81b81525081565b60025490565b60095490565b6000610c8f8484846113bb565b610d0584610c9b611189565b610d0085604051806060016040528060288152602001611d9f602891396001600160a01b038a16600090815260016020526040812090610cd9611189565b6001600160a01b03168152602081019190915260400160002054919063ffffffff61152216565b611198565b5060019392505050565b60009081526006602052604090206002015490565b6001600160a01b03166000908152600a602052604090205490565b610d50610d4a611189565b826115b9565b50565b600082815260066020526040902060020154610d7690610d71611189565b610ecb565b610db15760405162461bcd60e51b815260040180806020018281038252602f815260200180611c6e602f913960400191505060405180910390fd5b610dbb82826116c1565b5050565b60055460ff1690565b4690565b610dd4611189565b6001600160a01b0316816001600160a01b031614610e235760405162461bcd60e51b815260040180806020018281038252602f815260200180611e77602f913960400191505060405180910390fd5b610dbb8282611730565b6000610912610e3a611189565b84610d008560016000610e4b611189565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff61136116565b608981565b6001600160a01b031660009081526020819052604090205490565b600181565b6000828152600660205260408120610ec4908363ffffffff61179f16565b9392505050565b6000828152600660205260408120610ec4908363ffffffff6117ab16565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156108f45780601f106108c9576101008083540402835291602001916108f4565b600081565b604080516d4445504f5349544f525f524f4c4560901b8152905190819003600e01902081565b6000610912610f82611189565b84610d0085604051806060016040528060258152602001611e526025913960016000610fac611189565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff61152216565b6000610912610ff0611189565b84846113bb565b6000818152600660205260408120610916906117c0565b604080516d4445504f5349544f525f524f4c4560901b8152905190819003600e01902061103d81610d71611189565b6007906110dd5760405162461bcd60e51b81526020600482019081528254600260001961010060018416150201909116046024830181905290918291604490910190849080156110ce5780601f106110a3576101008083540402835291602001916110ce565b820191906000526020600020905b8154815290600101906020018083116110b157829003601f168201915b50509250505060405180910390fd5b506000838360208110156110f057600080fd5b503590506110fe85826117cb565b5050505050565b60008281526006602052604090206002015461112390610d71611189565b610e235760405162461bcd60e51b8152600401808060200182810382526030815260200180611d4a6030913960400191505060405180910390fd5b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60006111936118c7565b905090565b6001600160a01b0383166111dd5760405162461bcd60e51b8152600401808060200182810382526024815260200180611e2e6024913960400191505060405180910390fd5b6001600160a01b0382166112225760405162461bcd60e51b8152600401808060200182810382526022815260200180611d026022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b60006001600160a01b0386166112cb5760405162461bcd60e51b8152600401808060200182810382526025815260200180611d7a6025913960400191505060405180910390fd5b60016112de6112d987611925565b6119b1565b83868660405160008152602001604052604051808581526020018460ff1660ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015611338573d6000803e3d6000fd5b505050602060405103516001600160a01b0316866001600160a01b031614905095945050505050565b600082820183811015610ec4576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6001600160a01b0383166114005760405162461bcd60e51b8152600401808060200182810382526025815260200180611e096025913960400191505060405180910390fd5b6001600160a01b0382166114455760405162461bcd60e51b8152600401808060200182810382526023815260200180611c4b6023913960400191505060405180910390fd5b6114508383836119fd565b61149381604051806060016040528060268152602001611d24602691396001600160a01b038616600090815260208190526040902054919063ffffffff61152216565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546114c8908263ffffffff61136116565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156115b15760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561157657818101518382015260200161155e565b50505050905090810190601f1680156115a35780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6001600160a01b0382166115fe5760405162461bcd60e51b8152600401808060200182810382526021815260200180611de86021913960400191505060405180910390fd5b61160a826000836119fd565b61164d81604051806060016040528060228152602001611c9d602291396001600160a01b038516600090815260208190526040902054919063ffffffff61152216565b6001600160a01b038316600090815260208190526040902055600254611679908263ffffffff611a0216565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b60008281526006602052604090206116df908263ffffffff611a4416565b15610dbb576116ec611189565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260066020526040902061174e908263ffffffff611a5916565b15610dbb5761175b611189565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6000610ec48383611a6e565b6000610ec4836001600160a01b038416611ad2565b600061091682611aea565b6001600160a01b038216611826576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b611832600083836119fd565b600254611845908263ffffffff61136116565b6002556001600160a01b038216600090815260208190526040902054611871908263ffffffff61136116565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b60003330141561191f5760606000368080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050503601516001600160a01b031691506119229050565b50335b90565b6000604051806080016040528060438152602001611cbf60439139805190602001208260000151836020015184604001518051906020012060405160200180858152602001848152602001836001600160a01b03166001600160a01b03168152602001828152602001945050505050604051602081830303815290604052805190602001209050919050565b60006119bb610c7c565b82604051602001808061190160f01b81525060020183815260200182815260200192505050604051602081830303815290604052805190602001209050919050565b505050565b6000610ec483836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611522565b6000610ec4836001600160a01b038416611aee565b6000610ec4836001600160a01b038416611b38565b81546000908210611ab05760405162461bcd60e51b8152600401808060200182810382526022815260200180611c296022913960400191505060405180910390fd5b826000018281548110611abf57fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b6000611afa8383611ad2565b611b3057508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610916565b506000610916565b60008181526001830160205260408120548015611bf45783546000198083019190810190600090879083908110611b6b57fe5b9060005260206000200154905080876000018481548110611b8857fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080611bb857fe5b60019003818190600052602060002001600090559055866001016000878152602001908152602001600020600090556001945050505050610916565b6000915050610916565b60405180606001604052806000815260200160006001600160a01b0316815260200160608152509056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e647345524332303a207472616e7366657220746f20746865207a65726f2061646472657373416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e7445524332303a206275726e20616d6f756e7420657863656564732062616c616e63654d6574615472616e73616374696f6e2875696e74323536206e6f6e63652c616464726573732066726f6d2c62797465732066756e6374696f6e5369676e61747572652945524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b654e61746976654d6574615472616e73616374696f6e3a20494e56414c49445f5349474e455245524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63655369676e657220616e64207369676e617475726520646f206e6f74206d6174636845524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c66a26469706673582212205127d1fda86d58fd89a450307a69a8284c112d5615b226839879d6644bcd379264736f6c63430006060033454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c6164647265737320766572696679696e67436f6e74726163742c627974657333322073616c7429";