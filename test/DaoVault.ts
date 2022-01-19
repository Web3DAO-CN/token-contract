import { ethers, waffle } from "hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import { DaoVault, MaticWETH } from "../typechain";
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

const [wallet, minter, tokenHolder] = waffle.provider.getWallets();

describe("deploy Token", () => {
  let weth: MaticWETH;
  let vault: DaoVault;
  let receipt: ContractTransaction;
  before("deploy", async () => {
    weth = (await (
      await ethers.getContractFactory("MaticWETH")
    ).deploy(wallet.address)) as MaticWETH;
    console.log("weth address:" + weth.address.white);

    vault = (await (
      await ethers.getContractFactory("DaoVault")
    ).deploy(weth.address)) as DaoVault;
    console.log("vault address:" + vault.address.white);
  });

  it("deposit weth", async () => {
    expect(
      await weth.deposit(
        vault.address,
        utils.defaultAbiCoder.encode(["uint256"], [expandTo18Decimals(1000)])
      )
    )
      .to.emit(weth, "Transfer")
      .withArgs(constants.AddressZero, vault.address, expandTo18Decimals(1000));
  });

  it("vault deposit error", async () => {
    await expect(vault.deposit(expandTo18Decimals(10000))).to.be.revertedWith(
      "DaoVault:no enough amount"
    );
  });

  it("vault deposit", async () => {
    expect(await vault.deposit(expandTo18Decimals(1000)))
      .to.emit(vault, "Deposit")
      .withArgs(expandTo18Decimals(1000), expandTo18Decimals(1000));
  });

  it("vault reserve", async () => {
    expect(await vault.reserve()).to.eq(expandTo18Decimals(1000));
  });

  it("vault withdraw onlyOwner error", async () => {
    await expect(
      vault.connect(minter).withdraw(expandTo18Decimals(10000), minter.address)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("vault withdraw balance error", async () => {
    await expect(
      vault.withdraw(expandTo18Decimals(10000), minter.address)
    ).to.be.revertedWith("DaoVault:no enough balance");
  });

  it("vault withdraw", async () => {
    expect(await vault.withdraw(expandTo18Decimals(1000), minter.address))
      .to.emit(vault, "Withdraw")
      .withArgs(expandTo18Decimals(1000), expandTo18Decimals(0))
      .to.emit(weth, "Transfer")
      .withArgs(vault.address, minter.address, expandTo18Decimals(1000));
  });

  it("weth balance", async () => {
    expect(await weth.balanceOf(minter.address)).to.eq(
      expandTo18Decimals(1000)
    );
  });

  it("deposit weth", async () => {
    expect(
      await weth.deposit(
        vault.address,
        utils.defaultAbiCoder.encode(["uint256"], [expandTo18Decimals(1000)])
      )
    )
      .to.emit(weth, "Transfer")
      .withArgs(constants.AddressZero, vault.address, expandTo18Decimals(1000));
  });

  it("vault updateReserve", async () => {
    expect(await vault.updateReserve())
      .to.emit(vault, "UpdateReserve")
      .withArgs(expandTo18Decimals(1000));
  });
});

// 100.000000000000000000
// 321.506061369543983534
// 375.007812011749265670