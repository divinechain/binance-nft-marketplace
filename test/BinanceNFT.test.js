const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BinanceNFT", function () {
    it("Should mint and transfer an NFT", async function () {
        const [owner, addr1] = await ethers.getSigners();
        const BinanceNFT = await ethers.getContractFactory("BinanceNFT");
        const nft = await BinanceNFT.deploy();
        await nft.deployed();

        const tokenURI = "https://example.com/metadata.json";
        const tx = await nft.mintNFT(addr1.address, tokenURI);
        await tx.wait();

        expect(await nft.ownerOf(0)).to.equal(addr1.address);
        expect(await nft.tokenURI(0)).to.equal(tokenURI);
    });
});