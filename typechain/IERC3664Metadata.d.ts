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
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IERC3664MetadataInterface extends ethers.utils.Interface {
  functions: {
    "allowance(uint256,uint256,uint256)": FunctionFragment;
    "approve(uint256,uint256,uint256,uint256)": FunctionFragment;
    "attrURI(uint256)": FunctionFragment;
    "balanceOf(uint256,uint256)": FunctionFragment;
    "balanceOfBatch(uint256,uint256[])": FunctionFragment;
    "decimal(uint256)": FunctionFragment;
    "name(uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol(uint256)": FunctionFragment;
    "totalSupply(uint256)": FunctionFragment;
    "transfer(uint256,uint256,uint256,uint256)": FunctionFragment;
    "transferFrom(uint256,uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "allowance",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "attrURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfBatch",
    values: [BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "decimal",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "symbol",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "attrURI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;

  events: {
    "AttributeApproval(address,uint256,uint256,uint256,uint256)": EventFragment;
    "AttributeCreated(uint256,string,string,uint8,string)": EventFragment;
    "TransferBatch(address,uint256,uint256,uint256[],uint256[])": EventFragment;
    "TransferSingle(address,uint256,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AttributeApproval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AttributeCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferBatch"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferSingle"): EventFragment;
}

export class IERC3664Metadata extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IERC3664MetadataInterface;

  functions: {
    allowance(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "allowance(uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    approve(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "approve(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    attrURI(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "attrURI(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    balanceOf(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "balanceOf(uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    balanceOfBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber[];
    }>;

    "balanceOfBatch(uint256,uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber[];
    }>;

    decimal(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    "decimal(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: number;
    }>;

    name(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "name(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    symbol(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "symbol(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    totalSupply(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    "totalSupply(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: BigNumber;
    }>;

    transfer(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transfer(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    transferFrom(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferFrom(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  allowance(
    from: BigNumberish,
    to: BigNumberish,
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "allowance(uint256,uint256,uint256)"(
    from: BigNumberish,
    to: BigNumberish,
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    from: BigNumberish,
    to: BigNumberish,
    attrId: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "approve(uint256,uint256,uint256,uint256)"(
    from: BigNumberish,
    to: BigNumberish,
    attrId: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  attrURI(attrId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "attrURI(uint256)"(
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  balanceOf(
    tokenId: BigNumberish,
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "balanceOf(uint256,uint256)"(
    tokenId: BigNumberish,
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  balanceOfBatch(
    tokenId: BigNumberish,
    attrIds: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "balanceOfBatch(uint256,uint256[])"(
    tokenId: BigNumberish,
    attrIds: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  decimal(attrId: BigNumberish, overrides?: CallOverrides): Promise<number>;

  "decimal(uint256)"(
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<number>;

  name(attrId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "name(uint256)"(
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "supportsInterface(bytes4)"(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(attrId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "symbol(uint256)"(
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  totalSupply(
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "totalSupply(uint256)"(
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  transfer(
    from: BigNumberish,
    to: BigNumberish,
    attrId: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transfer(uint256,uint256,uint256,uint256)"(
    from: BigNumberish,
    to: BigNumberish,
    attrId: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  transferFrom(
    from: BigNumberish,
    to: BigNumberish,
    attrId: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferFrom(uint256,uint256,uint256,uint256)"(
    from: BigNumberish,
    to: BigNumberish,
    attrId: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    allowance(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "allowance(uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "approve(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    attrURI(attrId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "attrURI(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    balanceOf(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "balanceOf(uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "balanceOfBatch(uint256,uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    decimal(attrId: BigNumberish, overrides?: CallOverrides): Promise<number>;

    "decimal(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<number>;

    name(attrId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "name(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(attrId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "symbol(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    totalSupply(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "totalSupply(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transfer(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "transfer(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferFrom(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferFrom(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    AttributeApproval(
      operator: string | null,
      from: null,
      to: null,
      attrId: null,
      amount: null
    ): EventFilter;

    AttributeCreated(
      attrId: BigNumberish | null,
      name: null,
      symbol: null,
      _decimal: null,
      uri: null
    ): EventFilter;

    TransferBatch(
      operator: string | null,
      from: BigNumberish | null,
      to: BigNumberish | null,
      attrIds: null,
      values: null
    ): EventFilter;

    TransferSingle(
      operator: string | null,
      from: BigNumberish | null,
      to: BigNumberish | null,
      attrId: null,
      value: null
    ): EventFilter;
  };

  estimateGas: {
    allowance(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "allowance(uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "approve(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    attrURI(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "attrURI(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOf(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "balanceOf(uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "balanceOfBatch(uint256,uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimal(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "decimal(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(attrId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "name(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(attrId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "symbol(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalSupply(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "totalSupply(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transfer(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transfer(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    transferFrom(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferFrom(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allowance(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "allowance(uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "approve(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    attrURI(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "attrURI(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOf(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "balanceOf(uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOfBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "balanceOfBatch(uint256,uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decimal(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "decimal(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "name(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "supportsInterface(bytes4)"(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "symbol(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalSupply(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "totalSupply(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transfer(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transfer(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferFrom(uint256,uint256,uint256,uint256)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}