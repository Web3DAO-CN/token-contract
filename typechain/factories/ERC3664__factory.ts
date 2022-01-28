/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { ERC3664 } from "../ERC3664";

export class ERC3664__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<ERC3664> {
    return super.deploy(overrides || {}) as Promise<ERC3664>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC3664 {
    return super.attach(address) as ERC3664;
  }
  connect(signer: Signer): ERC3664__factory {
    return super.connect(signer) as ERC3664__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC3664 {
    return new Contract(address, _abi, signerOrProvider) as ERC3664;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AttributeApproval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "_decimal",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "AttributeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "attrIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "_transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
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
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
    ],
    name: "attrURI",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "attrIds",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
    ],
    name: "decimal",
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
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
    ],
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
    ],
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
    inputs: [
      {
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
    ],
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
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "attrId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061114c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100ce5760003560e01c80637cba85981161008c578063bd85b03911610066578063bd85b039146101b3578063e15fe34f146101e1578063ea699633146101f4578063f371efa41461021e57600080fd5b80637cba85981461017a5780638856f7791461018d5780639bc5ae54146101a057600080fd5b8062ad800c146100d357806301ffc9a7146100fc5780632f94e4aa1461011f5780634e41a1fb146101345780635d126110146101475780636c06296c14610167575b600080fd5b6100e66100e1366004610da0565b610243565b6040516100f39190610fe4565b60405180910390f35b61010f61010a366004610d78565b610360565b60405190151581526020016100f3565b61013261012d366004610d2a565b6103b2565b005b6100e6610142366004610da0565b610558565b61015a610155366004610db8565b6105f1565b6040516100f39190610fa0565b610132610175366004610e7e565b6106de565b610132610188366004610e7e565b6106f0565b61013261019b366004610e7e565b610705565b6100e66101ae366004610da0565b610834565b6101d36101c1366004610da0565b60009081526004602052604090205490565b6040519081526020016100f3565b6101d36101ef366004610e53565b6109d8565b6101d3610202366004610e32565b6000908152600260209081526040808320938352929052205490565b61023161022c366004610da0565b610a39565b60405160ff90911681526020016100f3565b60008181526001602052604090206004015460609060ff166102c25760405162461bcd60e51b815260206004820152602d60248201527f455243333636343a206e616d6520717565727920666f72206e6f6e657869737460448201526c656e742061747472696275746560981b60648201526084015b60405180910390fd5b600082815260016020526040902080546102db90611086565b80601f016020809104026020016040519081016040528092919081815260200182805461030790611086565b80156103545780601f1061032957610100808354040283529160200191610354565b820191906000526020600020905b81548152906001019060200180831161033757829003601f168201915b50505050509050919050565b60006001600160e01b03198216630e697ffb60e31b148061039157506001600160e01b03198216632658600760e01b145b806103ac57506301ffc9a760e01b6001600160e01b03198316145b92915050565b836103ff5760405162461bcd60e51b815260206004820181905260248201527f455243333636343a207472616e736665722066726f6d20746865207a65726f2060448201526064016102b9565b8261044c5760405162461bcd60e51b815260206004820152601e60248201527f455243333636343a207472616e7366657220746f20746865207a65726f20000060448201526064016102b9565b60408051602080820183526000918290528482526002815282822087835290522054818110156104cf5760405162461bcd60e51b815260206004820152602860248201527f455243333636343a207472616e7366657220616d6f756e7420657863656564736044820152672062616c616e636560c01b60648201526084016102b9565b6000838152600260209081526040808320888452909152808220848403905585825281208054849290610503908490611017565b90915550506040805184815260208101849052859187916001600160a01b038a16917f73b5fbfbf0177b0de2ffe9fd0ae9887dd73d0d865db7ab5ff3c4a6b9bb8db1e3910160405180910390a4505050505050565b60008181526001602052604090206004015460609060ff166105d45760405162461bcd60e51b815260206004820152602f60248201527f455243333636343a2073796d626f6c20717565727920666f72206e6f6e65786960448201526e7374656e742061747472696275746560881b60648201526084016102b9565b60008281526001602081905260409091200180546102db90611086565b606060008267ffffffffffffffff81111561061c57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015610645578160200160208202803683370190505b50905060005b838110156106d55761069a8686868481811061067757634e487b7160e01b600052603260045260246000fd5b905060200201356000908152600260209081526040808320938352929052205490565b8282815181106106ba57634e487b7160e01b600052603260045260246000fd5b60209081029190910101526106ce816110bb565b905061064b565b50949350505050565b6106ea84848484610acc565b50505050565b336106fe81868686866103b2565b5050505050565b3361071381868686866103b2565b6000600360008588604051602001610735929190918252602082015260400190565b6040516020818303038152906040528051906020012081526020019081526020016000206000868152602001908152602001600020549050828110156107d05760405162461bcd60e51b815260206004820152602a60248201527f455243333636343a207472616e7366657220616d6f756e74206578636565647360448201526920616c6c6f77616e636560b01b60648201526084016102b9565b8281036003600086896040516020016107f3929190918252602082015260400190565b604051602081830303815290604052805190602001208152602001908152602001600020600087815260200190815260200160002081905550505050505050565b60008181526001602052604090206004015460609060ff166108ad5760405162461bcd60e51b815260206004820152602c60248201527f455243333636343a2055524920717565727920666f72206e6f6e65786973746560448201526b6e742061747472696275746560a01b60648201526084016102b9565b600082815260016020526040812060030180546108c990611086565b80601f01602080910402602001604051908101604052809291908181526020018280546108f590611086565b80156109425780601f1061091757610100808354040283529160200191610942565b820191906000526020600020905b81548152906001019060200180831161092557829003601f168201915b50505050509050600081511115610985578061095d84610c08565b60405160200161096e929190610ecb565b604051602081830303815290604052915050919050565b600080805461099390611086565b9050116109af57604051806020016040528060008152506109cb565b60006109ba84610c08565b60405160200161096e929190610efa565b9392505050565b50919050565b60006003600083866040516020016109fa929190918252602082015260400190565b60405160208183030381529060405280519060200120815260200190815260200160002060008481526020019081526020016000205490509392505050565b60008181526001602052604081206004015460ff16610ab35760405162461bcd60e51b815260206004820152603060248201527f455243333636343a20646563696d616c20717565727920666f72206e6f6e657860448201526f697374656e742061747472696275746560801b60648201526084016102b9565b5060009081526001602052604090206002015460ff1690565b83610b195760405162461bcd60e51b815260206004820152601f60248201527f455243333636343a20617070726f76652066726f6d20746865207a65726f200060448201526064016102b9565b82610b665760405162461bcd60e51b815260206004820152601d60248201527f455243333636343a20617070726f766520746f20746865207a65726f2000000060448201526064016102b9565b80600360008487604051602001610b87929190918252602082015260400190565b60408051601f19818403018152918152815160209283012083528282019390935290820160009081208782528252829020929092558051868152918201859052818101849052606082018390525133917f4f3267cf1b4f4eda70a80ac65e00830cf370b07c616b8e687c172b69bb15a190919081900360800190a250505050565b606081610c2c5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610c565780610c40816110bb565b9150610c4f9050600a8361102f565b9150610c30565b60008167ffffffffffffffff811115610c7f57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610ca9576020820181803683370190505b5090505b8415610d2257610cbe600183611043565b9150610ccb600a866110d6565b610cd6906030611017565b60f81b818381518110610cf957634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350610d1b600a8661102f565b9450610cad565b949350505050565b600080600080600060a08688031215610d41578081fd5b85356001600160a01b0381168114610d57578182fd5b97602087013597506040870135966060810135965060800135945092505050565b600060208284031215610d89578081fd5b81356001600160e01b0319811681146109cb578182fd5b600060208284031215610db1578081fd5b5035919050565b600080600060408486031215610dcc578283fd5b83359250602084013567ffffffffffffffff80821115610dea578384fd5b818601915086601f830112610dfd578384fd5b813581811115610e0b578485fd5b8760208260051b8501011115610e1f578485fd5b6020830194508093505050509250925092565b60008060408385031215610e44578182fd5b50508035926020909101359150565b600080600060608486031215610e67578283fd5b505081359360208301359350604090920135919050565b60008060008060808587031215610e93578384fd5b5050823594602084013594506040840135936060013592509050565b60008151610ec181856020860161105a565b9290920192915050565b60008351610edd81846020880161105a565b835190830190610ef181836020880161105a565b01949350505050565b600080845482600182811c915080831680610f1657607f831692505b6020808410821415610f3657634e487b7160e01b87526022600452602487fd5b818015610f4a5760018114610f5b57610f87565b60ff19861689528489019650610f87565b60008b815260209020885b86811015610f7f5781548b820152908501908301610f66565b505084890196505b505050505050610f978185610eaf565b95945050505050565b6020808252825182820181905260009190848201906040850190845b81811015610fd857835183529284019291840191600101610fbc565b50909695505050505050565b602081526000825180602084015261100381604085016020870161105a565b601f01601f19169190910160400192915050565b6000821982111561102a5761102a6110ea565b500190565b60008261103e5761103e611100565b500490565b600082821015611055576110556110ea565b500390565b60005b8381101561107557818101518382015260200161105d565b838111156106ea5750506000910152565b600181811c9082168061109a57607f821691505b602082108114156109d257634e487b7160e01b600052602260045260246000fd5b60006000198214156110cf576110cf6110ea565b5060010190565b6000826110e5576110e5611100565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fdfea2646970667358221220c3271527e030059f3b3c68332d5646a520f4b2f51e04a8fd388b299346fcc2a964736f6c63430008040033";