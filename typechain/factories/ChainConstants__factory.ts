/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { ChainConstants } from "../ChainConstants";

export class ChainConstants__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<ChainConstants> {
    return super.deploy(overrides || {}) as Promise<ChainConstants>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ChainConstants {
    return super.attach(address) as ChainConstants;
  }
  connect(signer: Signer): ChainConstants__factory {
    return super.connect(signer) as ChainConstants__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChainConstants {
    return new Contract(address, _abi, signerOrProvider) as ChainConstants;
  }
}

const _abi = [
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506101a2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80630b54817c1461005c5780630dd7531a146100d95780630f7e5970146100e1578063626381a0146100e95780638acfcaf714610103575b600080fd5b61006461010b565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561009e578181015183820152602001610086565b50505050905090810190601f1680156100cb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610064610128565b610064610145565b6100f1610162565b60408051918252519081900360200190f35b6100f1610167565b604051806040016040528060018152602001608960f81b81525081565b604051806040016040528060018152602001600160f81b81525081565b604051806040016040528060018152602001603160f81b81525081565b608981565b60018156fea264697066735822122051d7ba3270116dd91188db2bcee7d897af1e0afa63951f0c3d6261ee0dc222a664736f6c63430006060033";
