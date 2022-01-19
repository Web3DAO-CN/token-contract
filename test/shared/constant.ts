import { ethers, waffle } from "hardhat";
import {
  BigNumber,
  BytesLike,
  utils
} from "ethers";
import { keccak256 } from "@ethersproject/keccak256";

function expandTo18Decimals(n: number): BigNumber {
  return utils.parseEther((n).toString());
}

function BN(n: number): BigNumber {
  return BigNumber.from(n);
}
const MINTER_ROLE: BytesLike =
  "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";

export { MINTER_ROLE, expandTo18Decimals, BN };
