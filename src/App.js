import React, { useState } from "react";
import { ethers } from "ethers";
import BinanceNFT from "../artifacts/contracts/BinanceNFT.sol/BinanceNFT.json";

const contractAddress = "YOUR_CONTRACT_ADDRESS";

function App() {
    const [message, setMessage] = useState("");
    const [tokenURI, setTokenURI] = useState("");
    
    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    async function mintNFT() {
        if (!tokenURI) return;
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, BinanceNFT.abi, signer);
            try {
                const transaction = await contract.mintNFT(await signer.getAddress(), tokenURI);
                setMessage("Minting in progress...");
                await transaction.wait();
                setMessage("NFT Minted Successfully!");
            } catch (err) {
                console.error(err);
                setMessage("Minting Failed!");
            }
        }
    }

    return (
        <div className="App">
            <h1>Binance NFT Marketplace</h1>
            <input
                onChange={(e) => setTokenURI(e.target.value)}
                placeholder="Enter NFT Metadata URI"
            />
            <button onClick={mintNFT}>Mint NFT</button>
            <p>{message}</p>
        </div>
    );
}

export default App;