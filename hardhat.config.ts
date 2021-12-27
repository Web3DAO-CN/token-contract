import "hardhat-typechain";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import { Web3DAOCN } from "./typechain";
import { RPCS } from "./scripts/network";
import { task } from "hardhat/config";
import {
  compileSetting,
  allowVerifyChain,
  deployContract,
  getContract,
} from "./scripts/deployTool";

import Colors = require("colors.ts");
Colors.enable();
const dotenv = require("dotenv");
dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners();

  for (let i = 0; i < 10; i++) {
    let address = await accounts[i].getAddress();
    console.log(
      "(" + i + ")",
      address,
      (await bre.ethers.provider.getBalance(address)).toString().white
    );
  }
});

task("deploy", "deploy contract").setAction(
  async (taskArgs, { ethers, run, network }) => {
    await run("compile");
    const signers = await ethers.getSigners();
    const token = await deployContract(
      ethers,
      "Web3DAOCN",
      network.name,
      signers[0],
      [""]
    );
    await run("verify:verify", getContract(network.name, "Web3DAOCN"));
  }
);
task("veri", "verify contract").setAction(
  async (taskArgs, { ethers, run, network }) => {
    await run("verify:verify", getContract(network.name, "Web3DAOCN"));
  }
);
export default {
  networks: RPCS,
  etherscan: {
    apiKey: process.env.ETHERSCAN_APIKEY,
  },
  solidity: {
    compilers: [compileSetting("0.8.4", 200)],
  },
  mocha: {
    timeout: 200000,
  },
};
