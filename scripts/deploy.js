// const { ethers } = require("ethers");
const { ethers } = require("hardhat");

async function main() {
  const Tracking = await ethers.getContractFactory("Tracking");
  const tracking = await Tracking.deploy();
  await tracking.deployed();
  console.log("deployed!");

  console.log(`Tracking contract deployed at ${tracking.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
