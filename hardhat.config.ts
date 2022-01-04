import "hardhat-typechain";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import { Web3DAOCN, DaoTicket } from "./typechain";
import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { RPCS } from "./scripts/network";
import { task } from "hardhat/config";
import {
  compileSetting,
  deployContract,
  getContract,
  BN,
} from "./scripts/deployTool";
import { BigNumber, ContractTransaction, BytesLike } from "ethers";

import Colors = require("colors.ts");
import { tokenToString } from "typescript";
import { util } from "chai";
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

task("dao", "deploy contract").setAction(
  async (taskArgs, { ethers, run, network }) => {
    const signers = await ethers.getSigners();
    const daoTicketAddress = "0xc1fae1924303cc7a816919b7a3935cda8bf8ef3d";
    let txHash =
      "0x0bae7abfe5bd104a8764bb0cf10e5d07ed51077cb07c857050acc5de33f0a325";
    const dao = (await ethers.getContractAt(
      "DaoTicket",
      daoTicketAddress,
      signers[0]
    )) as DaoTicket;
    const tx = await ethers.provider.getTransaction(txHash);
    const input = tx.data;
    const decode = dao.interface.decodeFunctionData("abcei51243fdgjkh", input);
    const nickname = await dao.account_info_rotate_tine(
      ethers.utils.keccak256(decode[0])
    );
    console.log("nickname:", nickname);
    console.log("hash:", ethers.utils.keccak256(decode[0]));
  }
);

task("deploy", "deploy contract").setAction(
  async (taskArgs, { ethers, run, network }) => {
    await run("compile");
    const signers = await ethers.getSigners();
    const token = await deployContract(
      ethers,
      "Web3DAOCN",
      network.name,
      signers[1],
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

task("create", "create attr").setAction(
  async (taskArgs, { ethers, run, network }) => {
    let json = getContract(network.name, "Web3DAOCN");
    if (json.address) {
      const signers = await ethers.getSigners();
      let dao = (await ethers.getContractAt(
        "Web3DAOCN",
        json.address,
        signers[1]
      )) as Web3DAOCN;
      let attrIds = [BN(1), BN(2), BN(3), BN(4)];
      let names = ["Gas", "Block", "Nonce", "Tx"];
      let symbols = ["gas", "block", "nonce", "tx"];
      let decimals = [18, 18, 18, 18];
      let uris = ["", "", "", ""];
      await dao.createBatch(attrIds, names, symbols, decimals, uris);
    }
  }
);

task("mint", "mint nft").setAction(
  async (taskArgs, { ethers, run, network }) => {
    const signers = await ethers.getSigners();
    let dao = (await ethers.getContractAt(
      "Web3DAOCN",
      "0xCAE0947f783081F1d7c0850F69EcD75b574B3D91",
      signers[1]
    )) as Web3DAOCN;

    const path = `./deployments/${network.name}/`;
    const file = `accounts.json`;
    let accounts = JSON.parse(readFileSync(path + file).toString());
    let receipt: ContractTransaction;
    for (let i = 0; i < accounts.length; i++) {
      receipt = await dao["mint(address)"](accounts[i].account);
      let resoult = await receipt.wait();
      console.log(resoult.transactionHash);
    }
  }
);

task("get", "get address").setAction(
  async (taskArgs, { ethers, run, network }) => {
    let address = "0xc1fae1924303CC7a816919B7A3935Cda8Bf8eF3d";
    const signers = await ethers.getSigners();
    let daoTicket = (await ethers.getContractAt(
      "DaoTicket",
      address,
      signers[0]
    )) as DaoTicket;
    // let max = (await daoTicket.test266151307()).toNumber();
    let max = 20;
    let json: {
      id: number;
      account: string;
    }[] = [];
    let account: string;
    for (let i = 0; i < max; i++) {
      account = await daoTicket.mintToSell9630191(i);
      json[i] = {
        id: i + 1,
        account: account,
      };
    }
    const path = `./deployments/${network.name}/`;
    const file = `accounts.json`;
    mkdirSync(path, { recursive: true });
    writeFileSync(path + file, JSON.stringify(json));
    console.log(json);
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
