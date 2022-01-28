import { ethers, waffle } from "hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import {
  BuyNFT,
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

const [wallet, commitee1, commitee2, sponsor1, user1, user2] =
  waffle.provider.getWallets();

describe("deploy Token", () => {
  let vault: DaoVault;
  let weth: MaticWETH;
  let sponsor: DaoSponsor;
  let buyNFT: BuyNFT;
  let token: Web3DAOCN;
  let treasury: DaoTreasury;
  let attrIds: BigNumber[];
  let names: string[];
  let symbols: string[];
  let decimals: number[];
  let uris: string[];
  let price: BigNumber;
  let reserve: BigNumber = BN(0);
  let sponsorAttrId = BN(5);
  let gasAttrId = BN(1);
  let sponsorTotalSupply = BN(0);
  let debt = BN(0);
  let transactionId = BN(0);
  let sponsorETHAmount = expandTo18Decimals(1000);
  let gasAttrPrice = 10000;
  let holdNFTId = BN(1);
  let sponsorTokenId = BN(2);
  let user1TokenId = BN(3);
  let user2TokenId = BN(4);
  let mintGasAmount: BigNumber;
  let gasTax: BigNumber;
  before("deploy 部署合约", async () => {
    attrIds = [BN(1), BN(2), BN(3), BN(4), BN(5)];
    names = ["Gas", "Block", "Nonce", "Tx", "Sponsor"];
    symbols = ["gas", "block", "nonce", "tx", "sp"];
    decimals = [18, 18, 18, 18, 18];
    uris = ["", "", "", "", ""];
    mintGasAmount = sponsorETHAmount.mul(gasAttrPrice).div(2);

    token = (await (
      await ethers.getContractFactory("Web3DAOCN")
    ).deploy()) as Web3DAOCN;
    console.log("token address:" + token.address.white);

    weth = (await (
      await ethers.getContractFactory("MaticWETH")
    ).deploy(wallet.address)) as MaticWETH;
    console.log("weth address:" + weth.address.white);

    vault = (await (
      await ethers.getContractFactory("DaoVault")
    ).deploy(weth.address)) as DaoVault;
    console.log("vault address:" + vault.address.white);

    buyNFT = (await (
      await ethers.getContractFactory("BuyNFT")
    ).deploy(token.address, vault.address, weth.address)) as BuyNFT;
    console.log("buyNFT address:" + buyNFT.address.white);

    treasury = (await (
      await ethers.getContractFactory("DaoTreasury")
    ).deploy(token.address, weth.address, vault.address, BN(1))) as DaoTreasury;
    console.log("DaoTreasury address:" + treasury.address.white);

    sponsor = (await (
      await ethers.getContractFactory("DaoSponsor")
    ).deploy(
      token.address,
      vault.address,
      treasury.address,
      BN(5)
    )) as DaoSponsor;
    console.log("DaoSponsor address:" + sponsor.address.white);

    price = await buyNFT.price();
    gasTax = await treasury.gasTax();
  });
  describe("前置操作", () => {
    describe("NFT管理员操作", () => {
      it("创建属性", async () => {
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

      it("token 升级权限 sponsor", async () => {
        expect(await token.grantRole(MINTER_ROLE, sponsor.address))
          .to.emit(token, "RoleGranted")
          .withArgs(MINTER_ROLE, sponsor.address, wallet.address);
      });

      it("token 升级权限 buyNFT", async () => {
        expect(await token.grantRole(MINTER_ROLE, buyNFT.address))
          .to.emit(token, "RoleGranted")
          .withArgs(MINTER_ROLE, buyNFT.address, wallet.address);
      });

      it("token 升级权限 treasury", async () => {
        expect(await token.grantRole(MINTER_ROLE, treasury.address))
          .to.emit(token, "RoleGranted")
          .withArgs(MINTER_ROLE, treasury.address, wallet.address);
      });

      it("给treasury铸造 NFT", async () => {
        expect(await token["mint(address)"](treasury.address))
          .to.emit(token, "Transfer")
          .withArgs(constants.AddressZero, treasury.address, holdNFTId);
      });

      it("NFT 允许transfer Gas", async () => {
        expect(await token.setAttrTransferAllow(gasAttrId, true))
          .to.emit(token, "AttrTransferAllow")
          .withArgs(gasAttrId, true);
      });
    });
    describe("DaoTreasury 管理操作", () => {
      it("DaoTreasury 添加委员会 1", async () => {
        let functionData = treasury.interface.encodeFunctionData(
          "addCommitee",
          [commitee1.address]
        );
        expect(await treasury.submitTransaction(treasury.address, functionData))
          .to.emit(treasury, "Submission")
          .withArgs(transactionId)
          .to.emit(treasury, "Confirmation")
          .withArgs(wallet.address, transactionId)
          .to.emit(treasury, "ExecutionSuccess")
          .withArgs(transactionId)
          .to.emit(treasury, "CommiteeAddition")
          .withArgs(commitee1.address);
        transactionId = transactionId.add(BN(1));
      });
      it("DaoTreasury 添加委员会 2", async () => {
        let functionData = treasury.interface.encodeFunctionData(
          "addCommitee",
          [commitee2.address]
        );
        expect(await treasury.submitTransaction(treasury.address, functionData))
          .to.emit(treasury, "Submission")
          .withArgs(transactionId)
          .to.emit(treasury, "Confirmation")
          .withArgs(wallet.address, transactionId)
          .to.emit(treasury, "ExecutionSuccess")
          .withArgs(transactionId)
          .to.emit(treasury, "CommiteeAddition")
          .withArgs(commitee2.address);
        transactionId = transactionId.add(BN(1));
      });
      it("DaoTreasury 设置最小确认数2", async () => {
        let functionData = treasury.interface.encodeFunctionData(
          "changeRequirement",
          [BN(2)]
        );
        expect(await treasury.submitTransaction(treasury.address, functionData))
          .to.emit(treasury, "Submission")
          .withArgs(transactionId)
          .to.emit(treasury, "Confirmation")
          .withArgs(wallet.address, transactionId)
          .to.emit(treasury, "ExecutionSuccess")
          .withArgs(transactionId)
          .to.emit(treasury, "RequirementChange")
          .withArgs(BN(2));
        transactionId = transactionId.add(BN(1));
      });
      it("DaoTreasury 提交操作 移除委员", async () => {
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
          .withArgs(transactionId)
          .to.emit(treasury, "Confirmation")
          .withArgs(commitee1.address, transactionId);
        transactionId = transactionId.add(BN(1));
      });

      it("DaoTreasury 确认操作 移除委员", async () => {
        expect(await treasury.connect(commitee2).confirmTransaction(BN(3)))
          .to.emit(treasury, "Confirmation")
          .withArgs(commitee2.address, BN(3))
          .to.emit(treasury, "ExecutionSuccess")
          .withArgs(BN(3))
          .to.emit(treasury, "CommiteeRemoval")
          .withArgs(wallet.address);
      });
      it("DaoTreasury 设置DaoSponsor", async () => {
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
          .withArgs(transactionId)
          .to.emit(treasury, "Confirmation")
          .withArgs(commitee1.address, transactionId);
        expect(
          await treasury.connect(commitee2).confirmTransaction(transactionId)
        )
          .to.emit(treasury, "Confirmation")
          .withArgs(commitee2.address, transactionId)
          .to.emit(treasury, "ExecutionSuccess")
          .withArgs(transactionId)
          .to.emit(treasury, "SetDaoSponsor")
          .withArgs(sponsor.address);
        transactionId = transactionId.add(BN(1));
      });
      it("DaoTreasury 设置HoldNFTId", async () => {
        let functionData = treasury.interface.encodeFunctionData(
          "setHoldNFTId",
          [holdNFTId]
        );
        expect(
          await treasury
            .connect(commitee1)
            .submitTransaction(treasury.address, functionData)
        )
          .to.emit(treasury, "Submission")
          .withArgs(transactionId)
          .to.emit(treasury, "Confirmation")
          .withArgs(commitee1.address, transactionId);
        expect(
          await treasury.connect(commitee2).confirmTransaction(transactionId)
        )
          .to.emit(treasury, "Confirmation")
          .withArgs(commitee2.address, transactionId)
          .to.emit(treasury, "ExecutionSuccess")
          .withArgs(transactionId)
          .to.emit(treasury, "SetHoldNFTId")
          .withArgs(holdNFTId);
        transactionId = transactionId.add(BN(1));
      });
    });
    describe("DaoSponsor 管理操作", () => {
      it("DaoSponsor 转移owner权限", async () => {
        expect(await sponsor.transferOwnership(treasury.address))
          .to.emit(sponsor, "OwnershipTransferred")
          .withArgs(wallet.address, treasury.address);
      });
    });
    describe("DaoVault 管理操作", () => {
      it("DaoVault 转移owner权限", async () => {
        expect(await vault.transferOwnership(treasury.address))
          .to.emit(vault, "OwnershipTransferred")
          .withArgs(wallet.address, treasury.address);
      });
    });
    describe("buyNFT 管理操作", () => {
      it("buyNFT setMaxTotalSupply", async () => {
        expect(await buyNFT.setMaxTotalSupply("100"))
          .to.emit(buyNFT, "SetMaxTotalSupply")
          .withArgs("100");
      });
      it("buyNFT 转移owner权限", async () => {
        expect(await buyNFT.transferOwnership(treasury.address))
          .to.emit(buyNFT, "OwnershipTransferred")
          .withArgs(wallet.address, treasury.address);
      });
    });
    describe("give sponsor weth", () => {
      it("deposit weth sponsor1", async () => {
        expect(
          await weth.deposit(
            sponsor1.address,
            utils.defaultAbiCoder.encode(
              ["uint256"],
              [sponsorETHAmount.add(price)]
            )
          )
        )
          .to.emit(weth, "Transfer")
          .withArgs(
            constants.AddressZero,
            sponsor1.address,
            sponsorETHAmount.add(price)
          );
      });
      it("weth approve sponsor1", async () => {
        expect(
          await weth
            .connect(sponsor1)
            .approve(treasury.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(sponsor1.address, treasury.address, constants.MaxUint256);
        expect(
          await weth
            .connect(sponsor1)
            .approve(buyNFT.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(sponsor1.address, buyNFT.address, constants.MaxUint256);
      });

      it("deposit weth user1", async () => {
        expect(
          await weth.deposit(
            user1.address,
            utils.defaultAbiCoder.encode(
              ["uint256"],
              [sponsorETHAmount.add(price)]
            )
          )
        )
          .to.emit(weth, "Transfer")
          .withArgs(
            constants.AddressZero,
            user1.address,
            sponsorETHAmount.add(price)
          );
      });

      it("deposit weth user2", async () => {
        expect(
          await weth.deposit(
            user2.address,
            utils.defaultAbiCoder.encode(["uint256"], [price])
          )
        )
          .to.emit(weth, "Transfer")
          .withArgs(constants.AddressZero, user2.address, price);
      });

      it("weth approve user", async () => {
        expect(
          await weth
            .connect(user1)
            .approve(treasury.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(user1.address, treasury.address, constants.MaxUint256);
        expect(
          await weth
            .connect(user1)
            .approve(buyNFT.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(user1.address, buyNFT.address, constants.MaxUint256);
      });
      it("weth approve user2", async () => {
        expect(
          await weth
            .connect(user2)
            .approve(treasury.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(user2.address, treasury.address, constants.MaxUint256);
        expect(
          await weth
            .connect(user2)
            .approve(buyNFT.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(user2.address, buyNFT.address, constants.MaxUint256);
      });
    });
  });
  describe("DaoTreasury 赞助", () => {
    it("sponsor1 购买NFT", async () => {
      reserve = reserve.add(price);
      expect(await buyNFT.connect(sponsor1).buy(sponsor1.address))
        .to.emit(buyNFT, "Buy")
        .withArgs(sponsor1.address)
        .to.emit(vault, "Deposit")
        .withArgs(price, reserve)
        .to.emit(weth, "Transfer")
        .withArgs(sponsor1.address, vault.address, price)
        .to.emit(token, "Transfer")
        .withArgs(constants.AddressZero, sponsor1.address, sponsorTokenId);
    });
    it("DaoTreasury 赞助", async () => {
      reserve = reserve.add(sponsorETHAmount);
      let sponsorAmount = sponsorETHAmount;
      expect(
        await treasury
          .connect(sponsor1)
          .sponsor(sponsorTokenId, sponsorETHAmount)
      )
        .to.emit(sponsor, "Sponsor")
        .withArgs(sponsorTokenId, sponsorETHAmount, sponsorAmount)
        .to.emit(token, "TransferSingle")
        .withArgs(
          sponsor.address,
          constants.AddressZero,
          sponsorTokenId,
          sponsorAttrId,
          sponsorAmount
        )
        .to.emit(weth, "Transfer")
        .withArgs(sponsor1.address, vault.address, sponsorETHAmount)
        .to.emit(vault, "Deposit")
        .withArgs(sponsorETHAmount, reserve);
      sponsorTotalSupply = sponsorTotalSupply.add(sponsorAmount);
    });
  });
  describe("DaoTreasury mintGas", () => {
    it("DaoTreasury 铸造gas", async () => {
      let functionData = treasury.interface.encodeFunctionData("mintGas", [
        mintGasAmount,
      ]);
      expect(
        await treasury
          .connect(commitee1)
          .submitTransaction(treasury.address, functionData)
      )
        .to.emit(treasury, "Submission")
        .withArgs(transactionId)
        .to.emit(treasury, "Confirmation")
        .withArgs(commitee1.address, transactionId);
      expect(
        await treasury.connect(commitee2).confirmTransaction(transactionId)
      )
        .to.emit(treasury, "Confirmation")
        .withArgs(commitee2.address, transactionId)
        .to.emit(treasury, "ExecutionSuccess")
        .withArgs(transactionId)
        .to.emit(treasury, "MintGas")
        .withArgs(mintGasAmount);
      transactionId = transactionId.add(BN(1));
    });
  });
  describe("DaoTreasury user 操作", () => {
    it("user1 购买NFT", async () => {
      reserve = reserve.add(price);
      expect(await buyNFT.connect(user1).buy(user1.address))
        .to.emit(buyNFT, "Buy")
        .withArgs(user1.address)
        .to.emit(vault, "Deposit")
        .withArgs(price, reserve)
        .to.emit(weth, "Transfer")
        .withArgs(user1.address, vault.address, price)
        .to.emit(token, "Transfer")
        .withArgs(constants.AddressZero, user1.address, user1TokenId);
    });
    it("user2 购买NFT", async () => {
      reserve = reserve.add(price);
      expect(await buyNFT.connect(user2).buy(user2.address))
        .to.emit(buyNFT, "Buy")
        .withArgs(user2.address)
        .to.emit(vault, "Deposit")
        .withArgs(price, reserve)
        .to.emit(weth, "Transfer")
        .withArgs(user2.address, vault.address, price)
        .to.emit(token, "Transfer")
        .withArgs(constants.AddressZero, user2.address, user2TokenId);
    });
    it("DaoTreasury user1 buyGas", async () => {
      let buyEthAmount = sponsorETHAmount.div(2);
      let resciveGas = buyEthAmount.mul(gasAttrPrice);
      reserve = reserve.add(buyEthAmount);

      expect(await treasury.connect(user1).buyGas(user1TokenId, buyEthAmount))
        .to.emit(vault, "Deposit")
        .withArgs(buyEthAmount, reserve)
        .to.emit(weth, "Transfer")
        .withArgs(user1.address, vault.address, buyEthAmount)
        .to.emit(token, "TransferSingle")
        .withArgs(
          treasury.address,
          holdNFTId,
          user1TokenId,
          gasAttrId,
          resciveGas
        )
        .to.emit(treasury, "BuyGas")
        .withArgs(user1TokenId, buyEthAmount);
    });
    it("DaoTreasury user1 transfer gas", async () => {
      let buyEthAmount = sponsorETHAmount.div(2);
      let resciveGas = buyEthAmount.mul(gasAttrPrice);
      expect(
        await token
          .connect(user1)
          ["transfer(uint256,uint256,uint256,uint256)"](
            user1TokenId,
            user2TokenId,
            gasAttrId,
            resciveGas
          )
      )
        .to.emit(token, "TransferSingle")
        .withArgs(
          user1.address,
          user1TokenId,
          user2TokenId,
          gasAttrId,
          resciveGas
        );
    });
    it("DaoTreasury user2 sell gas", async () => {
      let buyEthAmount = sponsorETHAmount.div(2);
      let resciveGas = buyEthAmount.mul(gasAttrPrice);
      let resciveETH = buyEthAmount.mul(BN(10000).sub(gasTax)).div(BN(10000));
      reserve = reserve.sub(resciveETH);
      expect(
        await token
          .connect(user2)
          ["approve(uint256,uint256,uint256,uint256)"](
            user2TokenId,
            holdNFTId,
            gasAttrId,
            constants.MaxUint256
          )
      )
        .to.emit(token, "AttributeApproval")
        .withArgs(
          user2.address,
          user2TokenId,
          holdNFTId,
          gasAttrId,
          constants.MaxUint256
        );

      expect(await treasury.connect(user2).sellGas(user2TokenId, resciveGas))
        .to.emit(vault, "Withdraw")
        .withArgs(resciveETH, reserve)
        .to.emit(weth, "Transfer")
        .withArgs(vault.address, user2.address, resciveETH)
        .to.emit(token, "TransferSingle")
        .withArgs(
          treasury.address,
          user2TokenId,
          holdNFTId,
          gasAttrId,
          resciveGas
        );
    });
  });
});
