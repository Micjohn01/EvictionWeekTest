import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const { vars } = require("hardhat/config");

const SECRET_KEY = vars.get("PRIVATE_KEY");
const ALCHEMY = vars.get("ALCHEMY_KEY");
const API_KEY = vars.get("ETHERSCAN_KEY");

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/" + ALCHEMY,
      }
    }
  },
  lockGasLimit: 200000000000,
  gasPrice: 10000000000,
};
