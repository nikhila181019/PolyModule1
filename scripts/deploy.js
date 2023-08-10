// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();

  // Print the deployer's address
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the ContractFactory for the CustomERC721 contract (replace "NikhilContract" with the actual contract name)
  const CustomERC721 = await ethers.getContractFactor("NikhilContract");

  // Deploy the CustomERC721 contract with the specified parameters
  const customERC721 = await CustomERC721.deploy("Nikhil_NFT", "SS", "An android doll making apps");

  // Wait for the contract to be deployed and confirmed
  await customERC721.deployed();

  // Print the address of the deployed contract
  console.log("CustomERC721 deployed to:", customERC721.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
