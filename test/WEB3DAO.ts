import { ethers, waffle } from "hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import { Web3DAOCN } from "../typechain";
import { constants, BytesLike, ContractTransaction, BigNumber } from "ethers";
import { expect } from "./shared/expect";
import { getPermit } from "./shared/permitSign";
import { expandTo18Decimals, BN, MINTER_ROLE } from "./shared/constant";
import Colors = require("colors.ts");
Colors.enable();

const [wallet, minter, tokenHolder] = waffle.provider.getWallets();

describe("deploy Token", () => {
  let token: Web3DAOCN;
  let receipt: ContractTransaction;
  let attrIds: BigNumber[];
  let names: string[];
  let symbols: string[];
  let decimals: number[];
  let uris: string[];
  let amounts: BigNumber[];
  before("deploy", async () => {
    token = (await (
      await ethers.getContractFactory("Web3DAOCN")
    ).deploy("")) as Web3DAOCN;
    console.log("token address:" + token.address.white);
    attrIds = [BN(1), BN(2), BN(3), BN(4)];
    names = ["Gas", "Block", "Nonce", "Tx"];
    symbols = ["gas", "block", "nonce", "tx"];
    decimals = [18, 18, 18, 18];
    uris = ["", "", "", ""];
    amounts = [
      expandTo18Decimals(100000),
      expandTo18Decimals(100000),
      expandTo18Decimals(100000),
      expandTo18Decimals(100000),
    ];
  });
  it("verify admin", async () => {
    expect(await token.hasRole(constants.HashZero, wallet.address)).to.eq(true);
  });
  it("set minter", async () => {
    receipt = await token.grantRole(MINTER_ROLE, minter.address);
    expect(receipt)
      .to.emit(token, "RoleGranted")
      .withArgs(MINTER_ROLE, minter.address, wallet.address);
  });
  it("revoke minter", async () => {
    receipt = await token.revokeRole(MINTER_ROLE, wallet.address);
    expect(receipt)
      .to.emit(token, "RoleRevoked")
      .withArgs(MINTER_ROLE, wallet.address, wallet.address);
  });
  it("mint NFT", async () => {
    receipt = await token.connect(minter)["mint(address)"](tokenHolder.address);
    expect(receipt)
      .to.emit(token, "Transfer")
      .withArgs(constants.AddressZero, tokenHolder.address, BN(1));
  });
  it("Create Attrs", async () => {
    receipt = await token
      .connect(minter)
      .createBatch(attrIds, names, symbols, decimals, uris);
    expect(receipt)
      .to.emit(token, "AttributeCreated")
      .withArgs(attrIds[0], names[0], symbols[0], decimals[0], uris[0])
      .to.emit(token, "AttributeCreated")
      .withArgs(attrIds[1], names[1], symbols[1], decimals[1], uris[1])
      .to.emit(token, "AttributeCreated")
      .withArgs(attrIds[2], names[2], symbols[2], decimals[2], uris[2])
      .to.emit(token, "AttributeCreated")
      .withArgs(attrIds[3], names[3], symbols[3], decimals[3], uris[3]);
  });
  it("verify Attrs name", async () => {
    expect(await token["name(uint256)"](attrIds[0])).to.eq(names[0]);
    expect(await token["name(uint256)"](attrIds[1])).to.eq(names[1]);
    expect(await token["name(uint256)"](attrIds[2])).to.eq(names[2]);
    expect(await token["name(uint256)"](attrIds[3])).to.eq(names[3]);
  });
  it("verify Attrs symbol", async () => {
    expect(await token["symbol(uint256)"](attrIds[0])).to.eq(symbols[0]);
    expect(await token["symbol(uint256)"](attrIds[1])).to.eq(symbols[1]);
    expect(await token["symbol(uint256)"](attrIds[2])).to.eq(symbols[2]);
    expect(await token["symbol(uint256)"](attrIds[3])).to.eq(symbols[3]);
  });
  it("verify Attrs decimal", async () => {
    expect(await token["decimal(uint256)"](attrIds[0])).to.eq(decimals[0]);
    expect(await token["decimal(uint256)"](attrIds[1])).to.eq(decimals[1]);
    expect(await token["decimal(uint256)"](attrIds[2])).to.eq(decimals[2]);
    expect(await token["decimal(uint256)"](attrIds[3])).to.eq(decimals[3]);
  });
  it("verify Attrs attrURI", async () => {
    expect(await token["attrURI(uint256)"](attrIds[0])).to.eq(uris[0]);
    expect(await token["attrURI(uint256)"](attrIds[1])).to.eq(uris[1]);
    expect(await token["attrURI(uint256)"](attrIds[2])).to.eq(uris[2]);
    expect(await token["attrURI(uint256)"](attrIds[3])).to.eq(uris[3]);
  });
  it("mint attr", async () => {
    receipt = await token
      .connect(minter)
      ["mint(uint256,uint256,uint256)"](
        BN(1),
        attrIds[0],
        expandTo18Decimals(100000)
      );
    expect(receipt)
      .to.emit(token, "TransferSingle")
      .withArgs(
        minter.address,
        constants.AddressZero,
        BN(1),
        attrIds[0],
        expandTo18Decimals(100000)
      );
  });
  it("mintBatch attr", async () => {
    receipt = await token
      .connect(minter)
      ["mintBatch(uint256,uint256[],uint256[])"](
        BN(1),
        [attrIds[0], attrIds[1]],
        [amounts[0], amounts[1]]
      );
    expect(receipt)
      .to.emit(token, "TransferBatch")
      .withArgs(
        minter.address,
        BN(0),
        BN(1),
        [attrIds[0], attrIds[1]],
        [amounts[0], amounts[1]]
      );
  });
  it("burnBatch attr", async () => {
    receipt = await token
      .connect(minter)
      ["burnBatch(uint256,uint256[],uint256[])"](
        BN(1),
        [attrIds[0]],
        [amounts[0]]
      );
    expect(receipt)
      .to.emit(token, "TransferBatch")
      .withArgs(minter.address, BN(1), BN(0), [attrIds[0]], [amounts[0]]);
  });
  it("burn attr error", async () => {
    await expect(
      token
        .connect(minter)
        ["burn(uint256,uint256,uint256)"](
          BN(1),
          attrIds[1],
          expandTo18Decimals(200000)
        )
    ).to.be.revertedWith("ERC3664: insufficient balance for transfer");
  });
  it("approve", async () => {
    receipt = await token
      .connect(tokenHolder)
      ["approve(uint256,uint256,uint256,uint256)"](
        BN(1),
        BN(2),
        attrIds[1],
        amounts[1]
      );
    expect(receipt)
      .to.emit(token, "AttributeApproval")
      .withArgs(tokenHolder.address, BN(1), BN(2), attrIds[1], amounts[1]);
  });
  it("approve attr error", async () => {
    await expect(
      token
        .connect(minter)
        ["approve(uint256,uint256,uint256,uint256)"](
          BN(1),
          BN(2),
          attrIds[0],
          amounts[0]
        )
    ).to.be.revertedWith("Web3DAOCN: caller is not the nft holder");
  });
  it("mint NFT", async () => {
    receipt = await token.connect(minter)["mint(address)"](tokenHolder.address);
    expect(receipt)
      .to.emit(token, "Transfer")
      .withArgs(constants.AddressZero, tokenHolder.address, BN(2));
  });
  it("transfer Attr", async () => {
    await expect(
      token
        .connect(tokenHolder)
        ["transfer(uint256,uint256,uint256,uint256)"](
          BN(1),
          BN(2),
          attrIds[1],
          amounts[1]
        )
    ).to.be.revertedWith("Web3DAOCN: Attr transfer not allow");
  });
  it("setAttrTransferAllow", async () => {
    receipt = await token
      .connect(minter)
      .setAttrTransferAllow(attrIds[0], true);
    expect(receipt)
      .to.emit(token, "AttrTransferAllow")
      .withArgs(attrIds[0], true);
    receipt = await token
      .connect(minter)
      .setAttrTransferAllow(attrIds[1], true);
    expect(receipt)
      .to.emit(token, "AttrTransferAllow")
      .withArgs(attrIds[1], true);
  });
  it("transfer Attr error", async () => {
    await expect(
      token
        .connect(wallet)
        ["transfer(uint256,uint256,uint256,uint256)"](
          BN(1),
          BN(2),
          attrIds[0],
          amounts[0]
        )
    ).to.be.revertedWith("Web3DAOCN: caller is not the nft holder");
  });
  it("transfer Attr", async () => {
    receipt = await token
      .connect(tokenHolder)
      ["transfer(uint256,uint256,uint256,uint256)"](
        BN(1),
        BN(2),
        attrIds[0],
        amounts[0]
      );
    expect(receipt)
      .to.emit(token, "TransferSingle")
      .withArgs(tokenHolder.address, BN(1), BN(2), attrIds[0], amounts[0]);
  });
  it("transfer Attr error", async () => {
    await expect(
      token
        .connect(tokenHolder)
        ["transfer(uint256,uint256,uint256,uint256)"](
          BN(1),
          BN(2),
          attrIds[0],
          amounts[0]
        )
    ).to.be.revertedWith("ERC3664: transfer amount exceeds balance");
  });
  it("transfer Attr", async () => {
    receipt = await token
      .connect(wallet)
      ["transferFrom(uint256,uint256,uint256,uint256)"](
        BN(1),
        BN(2),
        attrIds[1],
        amounts[1]
      );
    expect(receipt)
      .to.emit(token, "TransferSingle")
      .withArgs(wallet.address, BN(1), BN(2), attrIds[1], amounts[1]);
  });
  it("mint NFT", async () => {
    receipt = await token.connect(minter)["mint(address)"](tokenHolder.address);
    expect(receipt)
      .to.emit(token, "Transfer")
      .withArgs(constants.AddressZero, tokenHolder.address, BN(3));
  });
  it("mint attr", async () => {
    receipt = await token
      .connect(minter)
      ["mint(uint256,uint256,uint256)"](
        BN(3),
        attrIds[0],
        expandTo18Decimals(100000)
      );
    expect(receipt)
      .to.emit(token, "TransferSingle")
      .withArgs(
        minter.address,
        constants.AddressZero,
        BN(3),
        attrIds[0],
        expandTo18Decimals(100000)
      );
  });
  it("transfer Attr error", async () => {
    await expect(
      token
        .connect(wallet)
        ["transfer(uint256,uint256,uint256,uint256)"](
          BN(3),
          BN(2),
          attrIds[0],
          amounts[0]
        )
    ).to.be.revertedWith("Web3DAOCN: caller is not the nft holder");
  });
  it("permit approve", async () => {
    let signature = await getPermit(
      tokenHolder,
      token.address,
      BN(3),
      BN(2),
      attrIds[0],
      amounts[0]
    );
    receipt = await token
      .connect(wallet)
      .permit(BN(3), BN(2), attrIds[0], amounts[0], signature);
    expect(receipt)
      .to.emit(token, "AttributeApproval")
      .withArgs(wallet.address, BN(3), BN(2), attrIds[0], amounts[0]);
  });
  it("transfer Attr", async () => {
    receipt = await token
      .connect(wallet)
      ["transferFrom(uint256,uint256,uint256,uint256)"](
        BN(3),
        BN(2),
        attrIds[0],
        amounts[0]
      );
    expect(receipt)
      .to.emit(token, "TransferSingle")
      .withArgs(wallet.address, BN(3), BN(2), attrIds[0], amounts[0]);
  });
});
