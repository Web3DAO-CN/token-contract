import { ethers, waffle } from "hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import { BuyNFT, DaoVault, MaticWETH, Web3DAOCN } from "../typechain";
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
  let vault: DaoVault;
  let weth: MaticWETH;
  let buyNFT: BuyNFT;
  let token: Web3DAOCN;
  let price: BigNumber;
  before("deploy", async () => {
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

    price = await buyNFT.price();
  });

  it("buyNFT setMaxTotalSupply", async () => {
    expect(await buyNFT.setMaxTotalSupply("100"))
      .to.emit(buyNFT, "SetMaxTotalSupply")
      .withArgs("100");
  });

  it("buyNFT setDaoVault", async () => {
    expect(await buyNFT.setDaoVault(vault.address))
      .to.emit(buyNFT, "SetDaoVault")
      .withArgs(vault.address);
  });

  it("Web3DAOCN grantRole", async () => {
    expect(await token.grantRole(MINTER_ROLE, buyNFT.address))
      .to.emit(token, "RoleGranted")
      .withArgs(MINTER_ROLE, buyNFT.address, wallet.address);
  });

  it("deposit weth", async () => {
    expect(
      await weth.deposit(
        minter.address,
        utils.defaultAbiCoder.encode(["uint256"], [expandTo18Decimals(1000)])
      )
    )
      .to.emit(weth, "Transfer")
      .withArgs(
        constants.AddressZero,
        minter.address,
        expandTo18Decimals(1000)
      );
  });

  it("weth approve", async () => {
    expect(
      await weth.connect(minter).approve(buyNFT.address, constants.MaxUint256)
    )
      .to.emit(weth, "Approval")
      .withArgs(minter.address, buyNFT.address, constants.MaxUint256);
  });

  it("buyNFT buy", async () => {
    expect(await buyNFT.connect(minter).buy(minter.address))
      .to.emit(buyNFT, "Buy")
      .withArgs(minter.address)
      .to.emit(vault, "Deposit")
      .withArgs(price, price)
      .to.emit(weth, "Transfer")
      .withArgs(minter.address, vault.address, price)
      .to.emit(token, "Transfer")
      .withArgs(constants.AddressZero, minter.address, BN(1));
  });
});
