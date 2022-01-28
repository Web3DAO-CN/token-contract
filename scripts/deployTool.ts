import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { Contract, Signer, constants, BigNumber } from "ethers";
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { Libraries } from "hardhat/types";

export const allowVerifyChain = [
  "mainnet",
  "ropsten",
  "rinkeby",
  "goerli",
  "kovan",
  "bsctest",
  "bscmain",
  "hecotest",
  "hecomain",
  "maticmain",
  "ftmtest",
  "ftmmain",
  "hoomain",
];

type AddressMap = { [name: string]: string };

export function BN(n: number): BigNumber {
  return BigNumber.from(n);
}
export function compileSetting(version: string, runs: number) {
  return {
    version: version,
    settings: {
      optimizer: {
        enabled: true,
        runs: runs,
      },
    },
  };
}
export const overrides: any = {
  gasLimit: 8000000,
  // nonce: BigNumber.from(0),
};

export async function deployContract(
  ethers: HardhatEthersHelpers,
  name: string,
  network: string,
  signer: Signer,
  args: Array<any> = [],
  libraries: Libraries = {}
): Promise<Contract> {
  console.log("Deploying:", name.white);
  console.log("account:", (await signer.getAddress()).white);
  const factory = await ethers.getContractFactory(name, {
    signer: signer,
    libraries: libraries,
  });
  const contract = await factory.deploy(...args, overrides);
  console.log("  to", contract.address.white);
  console.log("  in", contract.deployTransaction.hash.white);
  await saveFile(network, name, contract, args, libraries);
  return contract.deployed();
}
export function getContract(network: string, name: string) {
  const nameArr = name.split(":");
  const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
  const path = `./deployments/${network}/`;
  const latest = `${contractName}.json`;

  if (existsSync(path + latest)) {
    console.log("Contract:", name.white);
    let json = JSON.parse(readFileSync(path + latest).toString());
    console.log("on:", json.address.white);
    return json.address;
  } else {
    return constants.AddressZero;
  }
}

export async function saveFile(
  network: string,
  name: string,
  contract: Contract,
  args: Array<any> = [],
  libraries: Object = {}
) {
  const nameArr = name.split(":");
  const contractName = nameArr.length > 1 ? nameArr[1] : nameArr[0];
  const path = `./deployments/${network}/`;
  const file = `${contractName}.json`;

  mkdirSync(path, { recursive: true });

  if (contractName != name) {
    writeFileSync(
      path + file,
      JSON.stringify({
        address: contract.address,
        constructorArguments: args,
        libraries: libraries,
        contract: name,
      })
    );
  } else {
    writeFileSync(
      path + file,
      JSON.stringify({
        address: contract.address,
        constructorArguments: args,
        libraries: libraries,
      })
    );
  }
}
