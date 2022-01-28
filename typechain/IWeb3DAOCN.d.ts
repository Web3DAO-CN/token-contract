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

interface IWeb3DAOCNInterface extends ethers.utils.Interface {
  functions: {
    "attrTransferAllow(uint256)": FunctionFragment;
    "burn(uint256,uint256,uint256)": FunctionFragment;
    "burnBatch(uint256,uint256[],uint256[])": FunctionFragment;
    "create(uint256,string,string,uint8,string)": FunctionFragment;
    "createBatch(uint256[],string[],string[],uint8[],string[])": FunctionFragment;
    "mint(uint256,uint256,uint256)": FunctionFragment;
    "mintBatch(uint256,uint256[],uint256[])": FunctionFragment;
    "permit(uint256,uint256,uint256,uint256,bytes)": FunctionFragment;
    "setAttrTransferAllow(uint256,bool)": FunctionFragment;
    "setBaseURI(string)": FunctionFragment;
    "setURI(string)": FunctionFragment;
    "totalSupply()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "attrTransferAllow",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "burn",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "burnBatch",
    values: [BigNumberish, BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "create",
    values: [BigNumberish, string, string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "createBatch",
    values: [BigNumberish[], string[], string[], BigNumberish[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mintBatch",
    values: [BigNumberish, BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setAttrTransferAllow",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(functionFragment: "setBaseURI", values: [string]): string;
  encodeFunctionData(functionFragment: "setURI", values: [string]): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "attrTransferAllow",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burnBatch", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintBatch", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAttrTransferAllow",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setBaseURI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;

  events: {
    "AttrTransferAllow(uint256,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AttrTransferAllow"): EventFragment;
}

export class IWeb3DAOCN extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IWeb3DAOCNInterface;

  functions: {
    attrTransferAllow(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "attrTransferAllow(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    burn(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "burn(uint256,uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    burnBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "burnBatch(uint256,uint256[],uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    create(
      _attrId: BigNumberish,
      _name: string,
      _symbol: string,
      _decimal: BigNumberish,
      _uri: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "create(uint256,string,string,uint8,string)"(
      _attrId: BigNumberish,
      _name: string,
      _symbol: string,
      _decimal: BigNumberish,
      _uri: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    createBatch(
      attrIds: BigNumberish[],
      names: string[],
      symbols: string[],
      decimals: BigNumberish[],
      uris: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "createBatch(uint256[],string[],string[],uint8[],string[])"(
      attrIds: BigNumberish[],
      names: string[],
      symbols: string[],
      decimals: BigNumberish[],
      uris: string[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "mint(uint256,uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "mint(address)"(
      to: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    mintBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "mintBatch(uint256,uint256[],uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    permit(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "permit(uint256,uint256,uint256,uint256,bytes)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setAttrTransferAllow(
      attrId: BigNumberish,
      allow: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setAttrTransferAllow(uint256,bool)"(
      attrId: BigNumberish,
      allow: boolean,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setBaseURI(
      newuri: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setBaseURI(string)"(
      newuri: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setURI(newuri: string, overrides?: Overrides): Promise<ContractTransaction>;

    "setURI(string)"(
      newuri: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "totalSupply()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;
  };

  attrTransferAllow(
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "attrTransferAllow(uint256)"(
    attrId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  burn(
    tokenId: BigNumberish,
    attrId: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "burn(uint256,uint256,uint256)"(
    tokenId: BigNumberish,
    attrId: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  burnBatch(
    tokenId: BigNumberish,
    attrIds: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "burnBatch(uint256,uint256[],uint256[])"(
    tokenId: BigNumberish,
    attrIds: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  create(
    _attrId: BigNumberish,
    _name: string,
    _symbol: string,
    _decimal: BigNumberish,
    _uri: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "create(uint256,string,string,uint8,string)"(
    _attrId: BigNumberish,
    _name: string,
    _symbol: string,
    _decimal: BigNumberish,
    _uri: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  createBatch(
    attrIds: BigNumberish[],
    names: string[],
    symbols: string[],
    decimals: BigNumberish[],
    uris: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "createBatch(uint256[],string[],string[],uint8[],string[])"(
    attrIds: BigNumberish[],
    names: string[],
    symbols: string[],
    decimals: BigNumberish[],
    uris: string[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "mint(uint256,uint256,uint256)"(
    tokenId: BigNumberish,
    attrId: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "mint(address)"(
    to: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  mintBatch(
    tokenId: BigNumberish,
    attrIds: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "mintBatch(uint256,uint256[],uint256[])"(
    tokenId: BigNumberish,
    attrIds: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  permit(
    from: BigNumberish,
    to: BigNumberish,
    attrId: BigNumberish,
    amount: BigNumberish,
    signature: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "permit(uint256,uint256,uint256,uint256,bytes)"(
    from: BigNumberish,
    to: BigNumberish,
    attrId: BigNumberish,
    amount: BigNumberish,
    signature: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setAttrTransferAllow(
    attrId: BigNumberish,
    allow: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setAttrTransferAllow(uint256,bool)"(
    attrId: BigNumberish,
    allow: boolean,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setBaseURI(
    newuri: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setBaseURI(string)"(
    newuri: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setURI(newuri: string, overrides?: Overrides): Promise<ContractTransaction>;

  "setURI(string)"(
    newuri: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    attrTransferAllow(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "attrTransferAllow(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    burn(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "burn(uint256,uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    burnBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "burnBatch(uint256,uint256[],uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    create(
      _attrId: BigNumberish,
      _name: string,
      _symbol: string,
      _decimal: BigNumberish,
      _uri: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "create(uint256,string,string,uint8,string)"(
      _attrId: BigNumberish,
      _name: string,
      _symbol: string,
      _decimal: BigNumberish,
      _uri: string,
      overrides?: CallOverrides
    ): Promise<void>;

    createBatch(
      attrIds: BigNumberish[],
      names: string[],
      symbols: string[],
      decimals: BigNumberish[],
      uris: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    "createBatch(uint256[],string[],string[],uint8[],string[])"(
      attrIds: BigNumberish[],
      names: string[],
      symbols: string[],
      decimals: BigNumberish[],
      uris: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    "mint(uint256,uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "mint(address)"(to: string, overrides?: CallOverrides): Promise<void>;

    mintBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "mintBatch(uint256,uint256[],uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    permit(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "permit(uint256,uint256,uint256,uint256,bytes)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setAttrTransferAllow(
      attrId: BigNumberish,
      allow: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "setAttrTransferAllow(uint256,bool)"(
      attrId: BigNumberish,
      allow: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setBaseURI(newuri: string, overrides?: CallOverrides): Promise<void>;

    "setBaseURI(string)"(
      newuri: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setURI(newuri: string, overrides?: CallOverrides): Promise<void>;

    "setURI(string)"(newuri: string, overrides?: CallOverrides): Promise<void>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    AttrTransferAllow(attrId: null, allow: null): EventFilter;
  };

  estimateGas: {
    attrTransferAllow(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "attrTransferAllow(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    burn(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "burn(uint256,uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    burnBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "burnBatch(uint256,uint256[],uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    create(
      _attrId: BigNumberish,
      _name: string,
      _symbol: string,
      _decimal: BigNumberish,
      _uri: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "create(uint256,string,string,uint8,string)"(
      _attrId: BigNumberish,
      _name: string,
      _symbol: string,
      _decimal: BigNumberish,
      _uri: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    createBatch(
      attrIds: BigNumberish[],
      names: string[],
      symbols: string[],
      decimals: BigNumberish[],
      uris: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "createBatch(uint256[],string[],string[],uint8[],string[])"(
      attrIds: BigNumberish[],
      names: string[],
      symbols: string[],
      decimals: BigNumberish[],
      uris: string[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "mint(uint256,uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "mint(address)"(to: string, overrides?: Overrides): Promise<BigNumber>;

    mintBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "mintBatch(uint256,uint256[],uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    permit(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "permit(uint256,uint256,uint256,uint256,bytes)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setAttrTransferAllow(
      attrId: BigNumberish,
      allow: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setAttrTransferAllow(uint256,bool)"(
      attrId: BigNumberish,
      allow: boolean,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setBaseURI(newuri: string, overrides?: Overrides): Promise<BigNumber>;

    "setBaseURI(string)"(
      newuri: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setURI(newuri: string, overrides?: Overrides): Promise<BigNumber>;

    "setURI(string)"(newuri: string, overrides?: Overrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    "totalSupply()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    attrTransferAllow(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "attrTransferAllow(uint256)"(
      attrId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burn(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "burn(uint256,uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    burnBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "burnBatch(uint256,uint256[],uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    create(
      _attrId: BigNumberish,
      _name: string,
      _symbol: string,
      _decimal: BigNumberish,
      _uri: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "create(uint256,string,string,uint8,string)"(
      _attrId: BigNumberish,
      _name: string,
      _symbol: string,
      _decimal: BigNumberish,
      _uri: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    createBatch(
      attrIds: BigNumberish[],
      names: string[],
      symbols: string[],
      decimals: BigNumberish[],
      uris: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "createBatch(uint256[],string[],string[],uint8[],string[])"(
      attrIds: BigNumberish[],
      names: string[],
      symbols: string[],
      decimals: BigNumberish[],
      uris: string[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "mint(uint256,uint256,uint256)"(
      tokenId: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "mint(address)"(
      to: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    mintBatch(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "mintBatch(uint256,uint256[],uint256[])"(
      tokenId: BigNumberish,
      attrIds: BigNumberish[],
      amounts: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    permit(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "permit(uint256,uint256,uint256,uint256,bytes)"(
      from: BigNumberish,
      to: BigNumberish,
      attrId: BigNumberish,
      amount: BigNumberish,
      signature: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setAttrTransferAllow(
      attrId: BigNumberish,
      allow: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setAttrTransferAllow(uint256,bool)"(
      attrId: BigNumberish,
      allow: boolean,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setBaseURI(
      newuri: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setBaseURI(string)"(
      newuri: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setURI(
      newuri: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setURI(string)"(
      newuri: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "totalSupply()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}