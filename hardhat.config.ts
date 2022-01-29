import "hardhat-typechain";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import {
  Web3DAOCN,
  DaoTicket,
  DaoVault,
  DaoTreasury,
  DaoSponsor,
  BuyNFT,
} from "./typechain";
import { RPCS } from "./scripts/network";
import { task } from "hardhat/config";
import {
  compileSetting,
  deployContract,
  getContract,
  getContractJson,
  BN,
} from "./scripts/deployTool";
import { BytesLike, constants, BigNumber } from "ethers";

import Colors = require("colors.ts");
Colors.enable();
const dotenv = require("dotenv");
dotenv.config();

const WETH_MATIC = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
const WETH_MATIC_TEST = "0x6817c8475Ad33Aa86422160C3d1C673c453A76dE";
const MINTER_ROLE: BytesLike =
  "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";

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
      "0xc04dfd53fb388f107e59556295a73eccc26afc17ac9db0fa16cc2a1b7c844c4d";
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
    const singer = signers[6];

    let weth =
      network.name == "maticmain"
        ? WETH_MATIC
        : network.name == "matictest"
        ? WETH_MATIC_TEST
        : constants.AddressZero;

    const token = (await deployContract(
      ethers,
      "Web3DAOCN",
      network.name,
      singer
    )) as Web3DAOCN;

    const vault = (await deployContract(
      ethers,
      "DaoVault",
      network.name,
      singer,
      [weth]
    )) as DaoVault;

    const buy = (await deployContract(ethers, "BuyNFT", network.name, singer, [
      token.address,
      vault.address,
      weth,
    ])) as BuyNFT;

    const treasury = (await deployContract(
      ethers,
      "DaoTreasury",
      network.name,
      singer,
      [token.address, weth, vault.address, BN(1)]
    )) as DaoTreasury;

    const sponsor = (await deployContract(
      ethers,
      "DaoSponsor",
      network.name,
      singer,
      [token.address, vault.address, treasury.address, BN(5)]
    )) as DaoSponsor;
  }
);

task("admin", "admin operate").setAction(
  async (taskArgs, { ethers, run, network }) => {
    await run("compile");
    const signers = await ethers.getSigners();
    const singer = signers[6];
    let functionData: BytesLike;

    const token = (await ethers.getContractAt(
      "Web3DAOCN",
      getContract(network.name, "Web3DAOCN"),
      singer
    )) as Web3DAOCN;

    const vault = (await ethers.getContractAt(
      "DaoVault",
      getContract(network.name, "DaoVault"),
      singer
    )) as DaoVault;

    const buy = (await ethers.getContractAt(
      "BuyNFT",
      getContract(network.name, "BuyNFT"),
      singer
    )) as BuyNFT;

    const treasury = (await ethers.getContractAt(
      "DaoTreasury",
      getContract(network.name, "DaoTreasury"),
      singer
    )) as DaoTreasury;

    const sponsor = (await ethers.getContractAt(
      "DaoSponsor",
      getContract(network.name, "DaoSponsor"),
      singer
    )) as DaoSponsor;

    let attrIds = [BN(1), BN(2), BN(3), BN(4), BN(5)];
    let names = ["Gas", "Block", "Nonce", "Tx", "Sponsor"];
    let symbols = ["gas", "block", "nonce", "tx", "sp"];
    let decimals = [18, 18, 18, 18, 18];
    let uris = ["", "", "", "", ""];
    await token.createBatch(attrIds, names, symbols, decimals, uris);

    await token.grantRole(MINTER_ROLE, sponsor.address);
    await token.grantRole(MINTER_ROLE, buy.address);
    await token.grantRole(MINTER_ROLE, treasury.address);
    await token["mint(address)"](treasury.address);
    await sponsor.transferOwnership(treasury.address);
    await vault.transferOwnership(treasury.address);
    await buy.setMaxTotalSupply(BN(50));
    await buy.transferOwnership(treasury.address);

    functionData = treasury.interface.encodeFunctionData("setDaoSponsor", [
      sponsor.address,
    ]);
    await treasury.submitTransaction(treasury.address, functionData);
    console.log("DaoSponsor:", await treasury.DaoSponsor());
    functionData = treasury.interface.encodeFunctionData("setHoldNFTId", [
      BN(1),
    ]);
    await treasury.submitTransaction(treasury.address, functionData);
    console.log("holdNFTId:", await treasury.holdNFTId());
  }
);

task("gas", "admin mintGas")
  .addParam("gas", "the gas amount")
  .setAction(async ({gas}, { ethers, run, network }) => {
    await run("compile");
    const signers = await ethers.getSigners();
    const singer = signers[6];
    let functionData: BytesLike;

    const treasury = (await ethers.getContractAt(
      "DaoTreasury",
      getContract(network.name, "DaoTreasury"),
      singer
    )) as DaoTreasury;

    functionData = treasury.interface.encodeFunctionData("mintGas", [
      BigNumber.from(gas),
    ]);

    let receipt = await treasury.submitTransaction(treasury.address, functionData);
    console.log(await receipt.wait())
  });

task("veri", "verify contract").setAction(
  async (taskArgs, { ethers, run, network }) => {
    await run("verify:verify", getContractJson(network.name, "Web3DAOCN"));
    await run("verify:verify", getContractJson(network.name, "DaoVault"));
    await run("verify:verify", getContractJson(network.name, "BuyNFT"));
    await run("verify:verify", getContractJson(network.name, "DaoTreasury"));
    await run("verify:verify", getContractJson(network.name, "DaoSponsor"));
  }
);

export default {
  networks: RPCS,
  etherscan: {
    apiKey: process.env.ETHERSCAN_APIKEY,
  },
  solidity: {
    compilers: [compileSetting("0.8.4", 200)],
    overrides: {
      "contracts/test/MaticWETH.sol": compileSetting("0.6.6", 200),
    },
  },
  mocha: {
    timeout: 200000,
  },
};
