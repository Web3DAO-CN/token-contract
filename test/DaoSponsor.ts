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

const [
  wallet,
  commitee1,
  commitee2,
  sponsor1,
  sponsor2,
  sponsor3,
  sponsor4,
  sponsor5,
] = waffle.provider.getWallets();

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
  let testPlan = [
    {
      account: sponsor1,
      ethAmount: expandTo18Decimals(100),
    },
    {
      account: sponsor2,
      ethAmount: expandTo18Decimals(200),
    },
    {
      account: sponsor3,
      ethAmount: expandTo18Decimals(300),
    },
    {
      account: sponsor4,
      ethAmount: expandTo18Decimals(400),
    },
    {
      account: sponsor5,
      ethAmount: expandTo18Decimals(500),
    },
  ];
  before("deploy 部署合约", async () => {
    attrIds = [BN(1), BN(2), BN(3), BN(4), BN(5)];
    names = ["Gas", "Block", "Nonce", "Tx", "Sponsor"];
    symbols = ["gas", "block", "nonce", "tx", "sp"];
    decimals = [18, 18, 18, 18, 18];
    uris = ["", "", "", "", ""];

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
          .withArgs(constants.AddressZero, treasury.address, BN(1));
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
          [BN(1)]
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
          .withArgs(BN(1));
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
              [expandTo18Decimals(1000)]
            )
          )
        )
          .to.emit(weth, "Transfer")
          .withArgs(
            constants.AddressZero,
            sponsor1.address,
            expandTo18Decimals(1000)
          );
      });
      it("deposit weth sponsor2", async () => {
        expect(
          await weth.deposit(
            sponsor2.address,
            utils.defaultAbiCoder.encode(
              ["uint256"],
              [expandTo18Decimals(1000)]
            )
          )
        )
          .to.emit(weth, "Transfer")
          .withArgs(
            constants.AddressZero,
            sponsor2.address,
            expandTo18Decimals(1000)
          );
      });
      it("deposit weth sponsor3", async () => {
        expect(
          await weth.deposit(
            sponsor3.address,
            utils.defaultAbiCoder.encode(
              ["uint256"],
              [expandTo18Decimals(1000)]
            )
          )
        )
          .to.emit(weth, "Transfer")
          .withArgs(
            constants.AddressZero,
            sponsor3.address,
            expandTo18Decimals(1000)
          );
      });
      it("deposit weth sponsor4", async () => {
        expect(
          await weth.deposit(
            sponsor4.address,
            utils.defaultAbiCoder.encode(
              ["uint256"],
              [expandTo18Decimals(1000)]
            )
          )
        )
          .to.emit(weth, "Transfer")
          .withArgs(
            constants.AddressZero,
            sponsor4.address,
            expandTo18Decimals(1000)
          );
      });
      it("deposit weth sponsor5", async () => {
        expect(
          await weth.deposit(
            sponsor5.address,
            utils.defaultAbiCoder.encode(
              ["uint256"],
              [expandTo18Decimals(1000)]
            )
          )
        )
          .to.emit(weth, "Transfer")
          .withArgs(
            constants.AddressZero,
            sponsor5.address,
            expandTo18Decimals(1000)
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
      it("weth approve sponsor2", async () => {
        expect(
          await weth
            .connect(sponsor2)
            .approve(treasury.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(sponsor2.address, treasury.address, constants.MaxUint256);
        expect(
          await weth
            .connect(sponsor2)
            .approve(buyNFT.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(sponsor2.address, buyNFT.address, constants.MaxUint256);
      });
      it("weth approve sponsor3", async () => {
        expect(
          await weth
            .connect(sponsor3)
            .approve(treasury.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(sponsor3.address, treasury.address, constants.MaxUint256);
        expect(
          await weth
            .connect(sponsor3)
            .approve(buyNFT.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(sponsor3.address, buyNFT.address, constants.MaxUint256);
      });
      it("weth approve sponsor4", async () => {
        expect(
          await weth
            .connect(sponsor4)
            .approve(treasury.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(sponsor4.address, treasury.address, constants.MaxUint256);
        expect(
          await weth
            .connect(sponsor4)
            .approve(buyNFT.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(sponsor4.address, buyNFT.address, constants.MaxUint256);
      });
      it("weth approve sponsor5", async () => {
        expect(
          await weth
            .connect(sponsor5)
            .approve(treasury.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(sponsor5.address, treasury.address, constants.MaxUint256);
        expect(
          await weth
            .connect(sponsor5)
            .approve(buyNFT.address, constants.MaxUint256)
        )
          .to.emit(weth, "Approval")
          .withArgs(sponsor5.address, buyNFT.address, constants.MaxUint256);
      });
    });
  });
  // 测试计划: 5个赞助商,按照testPlan数组进行赞助
  // 每一个赞助商首先要购买NFT,vault中会产生每人0.025eth收益
  // 之后赞助商赞助,并铸造sponsor的attr积分数量
  // 最后treasury再铸造一些gas
  describe("sponsor 赞助", () => {
    for (let i = 0; i < testPlan.length; i++) {
      let tokenId = i + 2;
      let mintGasAmount = expandTo18Decimals(100000);
      it("sponsor " + (i + 1) + " 购买NFT", async () => {
        reserve = reserve.add(price);
        expect(
          await buyNFT
            .connect(testPlan[i].account)
            .buy(testPlan[i].account.address)
        )
          .to.emit(buyNFT, "Buy")
          .withArgs(testPlan[i].account.address)
          .to.emit(vault, "Deposit")
          .withArgs(price, reserve)
          .to.emit(weth, "Transfer")
          .withArgs(testPlan[i].account.address, vault.address, price)
          .to.emit(token, "Transfer")
          .withArgs(
            constants.AddressZero,
            testPlan[i].account.address,
            tokenId
          );
      });
      it("DaoTreasury 赞助 " + (i + 1), async () => {
        let sponsorAmount = sponsorTotalSupply.eq(BN(0))
          ? testPlan[i].ethAmount
          : testPlan[i].ethAmount.mul(sponsorTotalSupply).div(reserve);
        console.log("赞助ethAmount:", testPlan[i].ethAmount.toString());
        console.log("储备量reserve:", reserve);
        console.log(
          "sponsor总量sponsorTotalSupply:",
          sponsorTotalSupply.toString()
        );
        console.log("收到的sponsorAmount:", sponsorAmount.toString());
        reserve = reserve.add(testPlan[i].ethAmount);
        expect(
          await treasury
            .connect(testPlan[i].account)
            .sponsor(tokenId, testPlan[i].ethAmount)
        )
          .to.emit(sponsor, "Sponsor")
          .withArgs(tokenId, testPlan[i].ethAmount, sponsorAmount)
          .to.emit(token, "TransferSingle")
          .withArgs(
            sponsor.address,
            constants.AddressZero,
            tokenId,
            sponsorAttrId,
            sponsorAmount
          )
          .to.emit(weth, "Transfer")
          .withArgs(
            testPlan[i].account.address,
            vault.address,
            testPlan[i].ethAmount
          )
          .to.emit(vault, "Deposit")
          .withArgs(testPlan[i].ethAmount, reserve);
        sponsorTotalSupply = sponsorTotalSupply.add(sponsorAmount);
      });
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
    }
  });
  // 测试计划: treasury铸造一些gas,然后用sponsor5借出
  describe("DaoTreasury 借出gas", () => {
    let mintGasAmount = expandTo18Decimals(4000000);
    it("DaoTreasury borrowGas 借出gas超出Treasury持有量错误", async () => {
      console.log(
        "gasTotalSupply():",
        (await token["totalSupply(uint256)"](gasAttrId)).toString()
      );
      await expect(
        treasury.connect(sponsor5).borrowGas(BN(6), mintGasAmount)
      ).revertedWith("ERC3664: transfer amount exceeds balance");
    });
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
    it("DaoTreasury borrowGas 超出最大借出量错误", async () => {
      await expect(
        treasury
          .connect(sponsor5)
          .borrowGas(BN(6), mintGasAmount.add(expandTo18Decimals(1)))
      ).revertedWith("DaoSponsor:more than max borrow");
    });
    it("DaoTreasury sponsor5 借出gas", async () => {
      let tokenId = BN(6);
      let gasAmount = expandTo18Decimals(2000000);
      let stakeAmount = gasAmount
        .mul(sponsorTotalSupply)
        .div(reserve.mul(10000));
      console.log("stakeAmount:", stakeAmount);
      expect(await treasury.connect(sponsor5).borrowGas(tokenId, gasAmount))
        .to.emit(token, "TransferSingle")
        .withArgs(treasury.address, BN(1), tokenId, gasAttrId, gasAmount)
        .to.emit(sponsor, "BorrowGas")
        .withArgs(tokenId, gasAmount, stakeAmount);
    });
  });
  // 测试计划: 系统时间流逝1年,之后5个赞助商退出
  // sponsor5因为没有归还借出的gas所以退出一部分
  describe("sponsor 退出", () => {
    it("DaoTreasury quit 退出未到时间错误", async () => {
      await expect(
        treasury.connect(sponsor1).quit(BN(2), expandTo18Decimals(100))
      ).to.be.revertedWith("DaoSponsor: lock time!");
    });

    it("increaseTime 时间流逝", async () => {
      await waffle.provider.send("evm_increaseTime", [3600 * 24 * 365]);
    });

    for (let i = 0; i < testPlan.length; i++) {
      let tokenId = i + 2;
      it("DaoTreasury sponsor " + (i + 1) + " 退出", async () => {
        let lv = await sponsor.lockVault(tokenId);
        let sponsorAmount = (
          await token["balanceOf(uint256,uint256)"](tokenId, sponsorAttrId)
        ).sub(lv.stakeAmount);
        let quitAmount = sponsorAmount.mul(reserve).div(sponsorTotalSupply);
        console.log("退出数量sponsorAmount:", sponsorAmount);
        console.log("预期收到的eth数量quitAmount:", quitAmount);
        console.log("储备量reserve:", reserve);
        console.log("sponsor总量sponsorTotalSupply:", sponsorTotalSupply);
        reserve = reserve.sub(quitAmount);
        expect(
          await treasury
            .connect(testPlan[i].account)
            .quit(tokenId, sponsorAmount)
        )
          .to.emit(sponsor, "Quit")
          .withArgs(tokenId, sponsorAmount, quitAmount)
          .to.emit(token, "TransferSingle")
          .withArgs(
            sponsor.address,
            tokenId,
            constants.AddressZero,
            sponsorAttrId,
            sponsorAmount
          )
          .to.emit(vault, "Withdraw")
          .withArgs(quitAmount, reserve)
          .to.emit(weth, "Transfer")
          .withArgs(vault.address, testPlan[i].account.address, quitAmount);
        sponsorTotalSupply = sponsorTotalSupply.sub(sponsorAmount);
      });
    }
  });
  // 测试计划: sponsor5归还借出的gas,并将解锁的sponsor积分退出
  describe("sponsor 归还gas", () => {
    let tokenId = BN(6);
    it("DaoTreasury sponsor5 approve gas", async () => {
      await expect(
        token
          .connect(sponsor5)
          ["approve(uint256,uint256,uint256,uint256)"](
            BN(6),
            BN(1),
            gasAttrId,
            expandTo18Decimals(2000000)
          )
      )
        .to.emit(token, "AttributeApproval")
        .withArgs(
          sponsor5.address,
          BN(6),
          BN(1),
          gasAttrId,
          expandTo18Decimals(2000000)
        );
    });
    it("DaoTreasury sponsor5 归还gas", async () => {
      let lv = await sponsor.lockVault(tokenId);
      let gasAmount = expandTo18Decimals(2000000);
      let unStakeAmount = lv.stakeAmount.mul(gasAmount).div(lv.borrowGasAmount);

      console.log("unStakeAmount:", unStakeAmount);

      await expect(treasury.connect(sponsor5).returnGas(tokenId, gasAmount))
        .to.emit(sponsor, "ReturnGas")
        .withArgs(tokenId, gasAmount, unStakeAmount);
    });
    it("DaoTreasury sponsor 5 退出剩余", async () => {
      let lv = await sponsor.lockVault(tokenId);
      let sponsorAmount = (
        await token["balanceOf(uint256,uint256)"](tokenId, sponsorAttrId)
      ).sub(lv.stakeAmount);
      let quitAmount = sponsorAmount.mul(reserve).div(sponsorTotalSupply);
      console.log("退出数量sponsorAmount:", sponsorAmount);
      console.log("预期收到的eth数量quitAmount:", quitAmount);
      console.log("储备量reserve:", reserve);
      console.log("sponsor总量sponsorTotalSupply:", sponsorTotalSupply);
      reserve = reserve.sub(quitAmount);
      expect(await treasury.connect(sponsor5).quit(tokenId, sponsorAmount))
        .to.emit(sponsor, "Quit")
        .withArgs(tokenId, sponsorAmount, quitAmount)
        .to.emit(token, "TransferSingle")
        .withArgs(
          sponsor.address,
          tokenId,
          constants.AddressZero,
          sponsorAttrId,
          sponsorAmount
        )
        .to.emit(vault, "Withdraw")
        .withArgs(quitAmount, reserve)
        .to.emit(weth, "Transfer")
        .withArgs(vault.address, sponsor5.address, quitAmount);
      sponsorTotalSupply = sponsorTotalSupply.sub(sponsorAmount);
    });
    it("最终数据", async () => {
      console.log("lv:()", await sponsor.lockVault(BN(6)));
      console.log("储备量reserve:()", await vault.reserve());
      console.log(
        "sponsor总量sponsorTotalSupply:",
        await token["totalSupply(uint256)"](sponsorAttrId)
      );
      console.log(
        "sponsor 5 gas attr balance:",
        await token["balanceOf(uint256,uint256)"](BN(6), gasAttrId)
      );
      console.log(
        "sponsor 5 sponsor attr balance:",
        await token["balanceOf(uint256,uint256)"](BN(6), sponsorAttrId)
      );
    });
  });
});
