const { ethers } = require("hardhat");

async function main() {
    const BinanceNFT = await ethers.getContractFactory("BinanceNFT");
    const nftContract = await BinanceNFT.deploy();
    await nftContract.deployed();
    console.log("BinanceNFT deployed to:", nftContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });