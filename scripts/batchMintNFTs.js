// scripts/mintNFTs.js
const { ethers } = require("hardhat");
require("dotenv").config();

// Replace with the private key of your deployment account
const public_key = process.env.PUBLIC_KEY;

async function main() {
  // Replace with the contract address deployed from the deploy script
  const contractAddress = process.env.CONTRACT_ADDRESS;
  
  const NFTMetadataArray = [
    "https://gateway.pinata.cloud/ipfs/QmNar6cKDWv5XEkshTzVADQFUfNuKbmnZNsfcNxAVEEZZQ?_gl=1*1m9onth*_ga*MzI3ODE5NjMxLjE2ODk4NjEzOTU.*_ga_5RMPXG14TE*MTY5MDQ1MjE0Ni45LjEuMTY5MDQ1MjQ2OS4yMS4wLjA.",
    "https://gateway.pinata.cloud/ipfs/QmdUktHa68Hcj4iRFVYC7LK24opDFReXMAEfvHHfUfjNew?_gl=1*1m9onth*_ga*MzI3ODE5NjMxLjE2ODk4NjEzOTU.*_ga_5RMPXG14TE*MTY5MDQ1MjE0Ni45LjEuMTY5MDQ1MjQ2OS4yMS4wLjA.",
    "https://gateway.pinata.cloud/ipfs/QmQ83MMPR1uQMP3Ry5E7NkU3MJhmgDnuCRjCf93BeHcSMu?_gl=1*1m9onth*_ga*MzI3ODE5NjMxLjE2ODk4NjEzOTU.*_ga_5RMPXG14TE*MTY5MDQ1MjE0Ni45LjEuMTY5MDQ1MjQ2OS4yMS4wLjA.",
    "https://gateway.pinata.cloud/ipfs/Qmcyym1jRjvjdkXxiae9A7TCrEzmKXtjEUznR6j6gD2jmL?_gl=1*1ek9ahb*_ga*MzI3ODE5NjMxLjE2ODk4NjEzOTU.*_ga_5RMPXG14TE*MTY5MDQ1MjE0Ni45LjEuMTY5MDQ1MjQ2OS4yMS4wLjA.",
    "https://gateway.pinata.cloud/ipfs/QmYE5ehC5r6KChfytj8a2D3w4jLNCWZKi8EWt63QXLb9GN?_gl=1*1ek9ahb*_ga*MzI3ODE5NjMxLjE2ODk4NjEzOTU.*_ga_5RMPXG14TE*MTY5MDQ1MjE0Ni45LjEuMTY5MDQ1MjQ2OS4yMS4wLjA.",
  ];

 
 
  // Get the contract instance
  const customERC721 = await ethers.getContractAt("ShrutiContract",contractAddress);

  console.log("Minting NFTs...");

  for (let i = 0; i < NFTMetadataArray.length; i++) {
    const tokenId = i+1;
    await customERC721.mint(public_key, NFTMetadataArray[i]);
    console.log(`NFT ${i + 1} minted with token ID: ${tokenId}`);
  }

  console.log("All NFTs minted successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
