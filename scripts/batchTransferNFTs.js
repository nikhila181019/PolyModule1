// scripts/transferNFTs.js
const { ethers } = require("hardhat");
const rootTunnelAbi  = require("../bridgeContract/rootContractABI.json"); // Replace with the actual RootTunnel ABI file
require("dotenv").config();

// Replace with your Ethereum contract address and name
const ETHEREUM_CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ETHEREUM_CONTRACT_NAME = "ShrutiContract";


// Replace with the public key of the account that holds the NFTs
const account_address = process.env.PUBLIC_KEY;

async function main() {
  // Connect to the Ethereum contract
  const ethereumContract = await ethers.getContractAt(ETHEREUM_CONTRACT_NAME,ETHEREUM_CONTRACT_ADDRESS);

  // Get the NFT token IDs from your Ethereum contract
  const tokenIds = [1, 2, 3, 4, 5]; // Replace with the actual token IDs of your NFTs

  // Connect to the Polygon Mumbai RootTunnel contract
  console.log("polygon")
  const polygonRootTunnel = await ethers.getContractAt( rootTunnelAbi, "0xF9bc4a80464E48369303196645e876c8C7D972de");

  // Transfer the NFTs
  for (const tokenId of tokenIds) {
    console.log(ethereumContract.address)
    console.log(`Transferring NFT with Token ID ${tokenId}`);
    await ethereumContract.approve("0xF9bc4a80464E48369303196645e876c8C7D972de", tokenId)
    
    
    // Send the transfer transaction to the Polygon RootTunnel contract
    await polygonRootTunnel.deposit(ethereumContract.address,account_address, tokenId, account_address, {gasLimit : 300000});
    

    console.log(`NFT with Token ID ${tokenId} transferred to Polygon Mumbai Testnet successfully!`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
