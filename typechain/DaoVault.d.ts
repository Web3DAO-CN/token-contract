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

interface DaoVaultInterface extends ethers.utils.Interface {
  functions: {
    "WETH()": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "reserve()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateReserve()": FunctionFragment;
    "withdraw(uint256,address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "WETH", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "reserve", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateReserve",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(functionFragment: "WETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "reserve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateReserve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Deposit(uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "UpdateReserve(uint256)": EventFragment;
    "Withdraw(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateReserve"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export class DaoVault extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: DaoVaultInterface;

  functions: {
    WETH(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "WETH()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "deposit(uint256)"(
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "owner()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    reserve(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "reserve()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    updateReserve(overrides?: Overrides): Promise<ContractTransaction>;

    "updateReserve()"(overrides?: Overrides): Promise<ContractTransaction>;

    withdraw(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "withdraw(uint256,address)"(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  WETH(overrides?: CallOverrides): Promise<string>;

  "WETH()"(overrides?: CallOverrides): Promise<string>;

  deposit(
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "deposit(uint256)"(
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  reserve(overrides?: CallOverrides): Promise<BigNumber>;

  "reserve()"(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  updateReserve(overrides?: Overrides): Promise<ContractTransaction>;

  "updateReserve()"(overrides?: Overrides): Promise<ContractTransaction>;

  withdraw(
    amount: BigNumberish,
    to: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "withdraw(uint256,address)"(
    amount: BigNumberish,
    to: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    WETH(overrides?: CallOverrides): Promise<string>;

    "WETH()"(overrides?: CallOverrides): Promise<string>;

    deposit(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "deposit(uint256)"(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    reserve(overrides?: CallOverrides): Promise<BigNumber>;

    "reserve()"(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateReserve(overrides?: CallOverrides): Promise<void>;

    "updateReserve()"(overrides?: CallOverrides): Promise<void>;

    withdraw(
      amount: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "withdraw(uint256,address)"(
      amount: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    Deposit(amount: null, reserve: null): EventFilter;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;

    UpdateReserve(reserve: null): EventFilter;

    Withdraw(amount: null, reserve: null): EventFilter;
  };

  estimateGas: {
    WETH(overrides?: CallOverrides): Promise<BigNumber>;

    "WETH()"(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(amount: BigNumberish, overrides?: Overrides): Promise<BigNumber>;

    "deposit(uint256)"(
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    reserve(overrides?: CallOverrides): Promise<BigNumber>;

    "reserve()"(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    updateReserve(overrides?: Overrides): Promise<BigNumber>;

    "updateReserve()"(overrides?: Overrides): Promise<BigNumber>;

    withdraw(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "withdraw(uint256,address)"(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "WETH()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "deposit(uint256)"(
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    reserve(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "reserve()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    updateReserve(overrides?: Overrides): Promise<PopulatedTransaction>;

    "updateReserve()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    withdraw(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "withdraw(uint256,address)"(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}