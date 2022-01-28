const dotenv = require("dotenv");
dotenv.config();
export const RPCS = {
  hardhat: {
    allowUnlimitedContractSize: false,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  ganache: {
    url: `http://127.0.0.1:7545`,
    chainId: 1337,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  ropsten: {
    url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
  },
  rinkeby: {
    url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  goerli: {
    url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  kovan: {
    url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  maticmain: {
    url: `https://rpc-mainnet.maticvigil.com`,
    chainId: 137,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
  matictest: {
    url: `https://rpc-mumbai.maticvigil.com`,
    chainId: 80001,
    accounts: {
      mnemonic: process.env.MNEMONIC,
    },
  },
};
