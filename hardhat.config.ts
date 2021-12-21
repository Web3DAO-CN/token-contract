import "hardhat-typechain";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import { RPCS } from "./scripts/network";
import { task } from "hardhat/config";
import { compileSetting, allowVerifyChain } from "./scripts/deployTool";

import Colors = require("colors.ts");
Colors.enable();
const dotenv = require("dotenv");
dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();

  for (const account of accounts) {
    let address = await account.getAddress();
    console.log(
      address,
      (await bre.ethers.provider.getBalance(address)).toString().white
    );
  }
});
export default {
  networks: RPCS,
  etherscan: {
    apiKey: process.env.ETHERSCAN_APIKEY,
  },
  solidity: {
    compilers: [compileSetting("0.8.4", 200)],
    // overrides: {
    //   "contracts/samples/Loot.sol": compileSetting("0.6.6", 200),
    // },
  },
  mocha: {
    timeout: 200000,
  },
};
