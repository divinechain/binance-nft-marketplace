require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
    solidity: "0.8.0",
    networks: {
        bsc: {
            url: process.env.BSC_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};