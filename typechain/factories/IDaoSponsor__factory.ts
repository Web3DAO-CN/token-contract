/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IDaoSponsor } from "../IDaoSponsor";

export class IDaoSponsor__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDaoSponsor {
    return new Contract(address, _abi, signerOrProvider) as IDaoSponsor;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gasAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stakeAmount",
        type: "uint256",
      },
    ],
    name: "BorrowGas",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sponsorAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quitAmount",
        type: "uint256",
      },
    ],
    name: "Quit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gasAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unStakeAmount",
        type: "uint256",
      },
    ],
    name: "ReturnGas",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_DaoTreasury",
        type: "address",
      },
    ],
    name: "SetDaoTreasury",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_DaoVault",
        type: "address",
      },
    ],
    name: "SetDaoVault",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_maxBorrow",
        type: "uint256",
      },
    ],
    name: "SetMaxBorrow",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sponsorAmount",
        type: "uint256",
      },
    ],
    name: "Sponsor",
    type: "event",
  },
  {
    inputs: [],
    name: "DaoTreasury",
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
    name: "DaoVault",
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
    name: "SPONSOR_ATTR_ID",
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
    name: "WEB3DAONFT",
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gasAmount",
        type: "uint256",
      },
    ],
    name: "borrowGas",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "lockVault",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "sponsorAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "stakeAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "borrowGasAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        internalType: "struct IDaoSponsor.LockVault",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "max",
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
    name: "maxBorrow",
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
        internalType: "uint256",
        name: "sponsorAmount",
        type: "uint256",
      },
    ],
    name: "quit",
    outputs: [
      {
        internalType: "uint256",
        name: "quitAmount",
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
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gasAmount",
        type: "uint256",
      },
    ],
    name: "returnGas",
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
        name: "_DaoTreasury",
        type: "address",
      },
    ],
    name: "setDaoTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_DaoVault",
        type: "address",
      },
    ],
    name: "setDaoVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxBorrow",
        type: "uint256",
      },
    ],
    name: "setMaxBorrow",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "ethAmount",
        type: "uint256",
      },
    ],
    name: "sponsor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];