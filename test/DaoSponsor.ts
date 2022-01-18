import { ethers, waffle } from "hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import {
  DaoSponsor,
  DaoVault,
  MaticWETH,
  Web3DAOCN,
  DaoTreasury,
} from "../typechain";
import {
  constants,
  BytesLike,
  ContractTransaction,
  BigNumber,
  utils,
} from "ethers";
import { expect } from "./shared/expect";
import { getPermit } from "./shared/permitSign";
import { expandTo18Decimals, BN, MINTER_ROLE } from "./shared/constant";
import Colors = require("colors.ts");
Colors.enable();

const [wallet, commitee1, commitee2, tokenHolder] =
  waffle.provider.getWallets();

describe("deploy Token", () => {
  let vault: DaoVault;
  let weth: MaticWETH;
  let sponsor: DaoSponsor;
  let token: Web3DAOCN;
  let treasury: DaoTreasury;
  let attrIds: BigNumber[];
  let names: string[];
  let symbols: string[];
  let decimals: number[];
  let uris: string[];
  before("deploy", async () => {
    attrIds = [BN(1), BN(2), BN(3), BN(4), BN(5)];
    names = ["Gas", "Block", "Nonce", "Tx", "Sponsor"];
    symbols = ["gas", "block", "nonce", "tx", "sp"];
    decimals = [18, 18, 18, 18, 18];
    uris = ["", "", "", "", ""];

    token = (await (
      await ethers.getContractFactory("Web3DAOCN")
    ).deploy("")) as Web3DAOCN;
    console.log("token address:" + token.address.white);

    weth = (await (
      await ethers.getContractFactory("MaticWETH")
    ).deploy(wallet.address)) as MaticWETH;
    console.log("weth address:" + weth.address.white);

    vault = (await (
      await ethers.getContractFactory("DaoVault")
    ).deploy(weth.address)) as DaoVault;
    console.log("vault address:" + vault.address.white);

    treasury = (await (
      await ethers.getContractFactory("DaoTreasury")
    ).deploy(token.address, weth.address, BN(1), BN(5))) as DaoTreasury;
    console.log("DaoTreasury address:" + vault.address.white);

    sponsor = (await (
      await ethers.getContractFactory("DaoSponsor")
    ).deploy(token.address, BN(5))) as DaoSponsor;
    console.log("DaoSponsor address:" + vault.address.white);
  });
  describe("admin operate", () => {
    it("DaoTreasury addCommitee 1", async () => {
      let functionData = treasury.interface.encodeFunctionData("addCommitee", [
        commitee1.address,
      ]);
      expect(await treasury.submitTransaction(treasury.address, functionData))
        .to.emit(treasury, "Submission")
        .withArgs(BN(0))
        .to.emit(treasury, "Confirmation")
        .withArgs(wallet.address, BN(0))
        .to.emit(treasury, "ExecutionSuccess")
        .withArgs(BN(0))
        .to.emit(treasury, "CommiteeAddition")
        .withArgs(commitee1.address);
    });
    it("DaoTreasury addCommitee 2", async () => {
      let functionData = treasury.interface.encodeFunctionData("addCommitee", [
        commitee2.address,
      ]);
      expect(await treasury.submitTransaction(treasury.address, functionData))
        .to.emit(treasury, "Submission")
        .withArgs(BN(1))
        .to.emit(treasury, "Confirmation")
        .withArgs(wallet.address, BN(1))
        .to.emit(treasury, "ExecutionSuccess")
        .withArgs(BN(1))
        .to.emit(treasury, "CommiteeAddition")
        .withArgs(commitee2.address);
    });

    it("DaoTreasury changeRequirement", async () => {
      let functionData = treasury.interface.encodeFunctionData(
        "changeRequirement",
        [BN(2)]
      );
      expect(await treasury.submitTransaction(treasury.address, functionData))
        .to.emit(treasury, "Submission")
        .withArgs(BN(2))
        .to.emit(treasury, "Confirmation")
        .withArgs(wallet.address, BN(2))
        .to.emit(treasury, "ExecutionSuccess")
        .withArgs(BN(2))
        .to.emit(treasury, "RequirementChange")
        .withArgs(BN(2));
    });

    it("DaoTreasury submitTransaction removeCommitee", async () => {
      let functionData = treasury.interface.encodeFunctionData(
        "removeCommitee",
        [wallet.address]
      );
      expect(
        await treasury
          .connect(commitee1)
          .submitTransaction(treasury.address, functionData)
      )
        .to.emit(treasury, "Submission")
        .withArgs(BN(3))
        .to.emit(treasury, "Confirmation")
        .withArgs(commitee1.address, BN(3));
    });

    it("DaoTreasury confirmTransaction removeCommitee", async () => {
      expect(await treasury.connect(commitee2).confirmTransaction(BN(3)))
        .to.emit(treasury, "Confirmation")
        .withArgs(commitee2.address, BN(3))
        .to.emit(treasury, "ExecutionSuccess")
        .withArgs(BN(3))
        .to.emit(treasury, "CommiteeRemoval")
        .withArgs(wallet.address);
    });

    it("token Create Attrs", async () => {
      expect(await token.createBatch(attrIds, names, symbols, decimals, uris))
        .to.emit(token, "AttributeCreated")
        .withArgs(attrIds[0], names[0], symbols[0], decimals[0], uris[0])
        .to.emit(token, "AttributeCreated")
        .withArgs(attrIds[1], names[1], symbols[1], decimals[1], uris[1])
        .to.emit(token, "AttributeCreated")
        .withArgs(attrIds[2], names[2], symbols[2], decimals[2], uris[2])
        .to.emit(token, "AttributeCreated")
        .withArgs(attrIds[3], names[3], symbols[3], decimals[3], uris[3])
        .to.emit(token, "AttributeCreated")
        .withArgs(attrIds[4], names[4], symbols[4], decimals[4], uris[4]);
    });

    it("token mint NFT", async () => {
      expect(await token["mint(address)"](tokenHolder.address))
        .to.emit(token, "Transfer")
        .withArgs(constants.AddressZero, tokenHolder.address, BN(1));
    });

    it("token grantRole", async () => {
      expect(await token.grantRole(MINTER_ROLE, sponsor.address))
        .to.emit(token, "RoleGranted")
        .withArgs(MINTER_ROLE, sponsor.address, wallet.address);
    });

    it("DaoSponsor setDaoVault", async () => {
      expect(await sponsor.setDaoVault(vault.address))
        .to.emit(sponsor, "SetDaoVault")
        .withArgs(vault.address);
    });

    it("DaoSponsor setDaoTreasury", async () => {
      expect(await sponsor.setDaoTreasury(treasury.address))
        .to.emit(sponsor, "SetDaoTreasury")
        .withArgs(treasury.address);
    });

    it("DaoSponsor transferOwnership", async () => {
      expect(await sponsor.transferOwnership(treasury.address))
        .to.emit(sponsor, "OwnershipTransferred")
        .withArgs(wallet.address, treasury.address);
    });

    it("DaoVault transferOwnership", async () => {
      expect(await vault.transferOwnership(treasury.address))
        .to.emit(vault, "OwnershipTransferred")
        .withArgs(wallet.address, treasury.address);
    });

    it("DaoTreasury DaoVault", async () => {
      let functionData = treasury.interface.encodeFunctionData("setDaoVault", [
        vault.address,
      ]);
      expect(
        await treasury
          .connect(commitee1)
          .submitTransaction(treasury.address, functionData)
      )
        .to.emit(treasury, "Submission")
        .withArgs(BN(4))
        .to.emit(treasury, "Confirmation")
        .withArgs(commitee1.address, BN(4));
      expect(await treasury.connect(commitee2).confirmTransaction(BN(4)))
        .to.emit(treasury, "Confirmation")
        .withArgs(commitee2.address, BN(4))
        .to.emit(treasury, "ExecutionSuccess")
        .withArgs(BN(4))
        .to.emit(treasury, "SetDaoVault")
        .withArgs(vault.address);
    });

    it("DaoTreasury setDaoSponsor", async () => {
      let functionData = treasury.interface.encodeFunctionData(
        "setDaoSponsor",
        [sponsor.address]
      );
      expect(
        await treasury
          .connect(commitee1)
          .submitTransaction(treasury.address, functionData)
      )
        .to.emit(treasury, "Submission")
        .withArgs(BN(5))
        .to.emit(treasury, "Confirmation")
        .withArgs(commitee1.address, BN(5));
      expect(await treasury.connect(commitee2).confirmTransaction(BN(5)))
        .to.emit(treasury, "Confirmation")
        .withArgs(commitee2.address, BN(5))
        .to.emit(treasury, "ExecutionSuccess")
        .withArgs(BN(5))
        .to.emit(treasury, "SetDaoSponsor")
        .withArgs(sponsor.address);
    });

    it("token mint NFT", async () => {
      expect(await token["mint(address)"](treasury.address))
        .to.emit(token, "Transfer")
        .withArgs(constants.AddressZero, treasury.address, BN(2));
    });

    it("DaoTreasury setHoldNFTId", async () => {
      let functionData = treasury.interface.encodeFunctionData("setHoldNFTId", [
        BN(2),
      ]);
      expect(
        await treasury
          .connect(commitee1)
          .submitTransaction(treasury.address, functionData)
      )
        .to.emit(treasury, "Submission")
        .withArgs(BN(6))
        .to.emit(treasury, "Confirmation")
        .withArgs(commitee1.address, BN(6));
      expect(await treasury.connect(commitee2).confirmTransaction(BN(6)))
        .to.emit(treasury, "Confirmation")
        .withArgs(commitee2.address, BN(6))
        .to.emit(treasury, "ExecutionSuccess")
        .withArgs(BN(6))
        .to.emit(treasury, "SetHoldNFTId")
        .withArgs(BN(2));
    });
  });
  describe("sponsor operate", () => {
    it("deposit weth", async () => {
      expect(
        await weth.deposit(
          tokenHolder.address,
          utils.defaultAbiCoder.encode(["uint256"], [expandTo18Decimals(1000)])
        )
      )
        .to.emit(weth, "Transfer")
        .withArgs(
          constants.AddressZero,
          tokenHolder.address,
          expandTo18Decimals(1000)
        );
    });

    it("weth approve", async () => {
      expect(
        await weth
          .connect(tokenHolder)
          .approve(treasury.address, constants.MaxUint256)
      )
        .to.emit(weth, "Approval")
        .withArgs(tokenHolder.address, treasury.address, constants.MaxUint256);
    });

    it("DaoTreasury sponsor", async () => {
      expect(
        await treasury
          .connect(tokenHolder)
          .sponsor(BN(1), expandTo18Decimals(100))
      )
        .to.emit(sponsor, "Sponsor")
        .withArgs(BN(1), expandTo18Decimals(100), expandTo18Decimals(100))
        .to.emit(weth, "Transfer")
        .withArgs(tokenHolder.address, vault.address, expandTo18Decimals(100))
        .to.emit(token, "TransferSingle")
        .withArgs(
          sponsor.address,
          constants.AddressZero,
          BN(1),
          attrIds[4],
          expandTo18Decimals(100)
        );
    });

    it("DaoTreasury quit error", async () => {
      await expect(
        treasury.connect(tokenHolder).quit(BN(1), expandTo18Decimals(100))
      ).to.be.revertedWith("DaoSponsor: lock time!");
    });

    it("increaseTime", async () => {
      await waffle.provider.send("evm_increaseTime", [3600 * 24 * 365]);
    });

    it("DaoTreasury quit", async () => {
      expect(
        await treasury.connect(tokenHolder).quit(BN(1), expandTo18Decimals(100))
      )
        .to.emit(sponsor, "Quit")
        .withArgs(BN(1), expandTo18Decimals(100), expandTo18Decimals(100))
        .to.emit(token, "TransferSingle")
        .withArgs(
          sponsor.address,
          BN(1),
          constants.AddressZero,
          attrIds[4],
          expandTo18Decimals(100)
        );
    });
  });
});
