const hh = require("hardhat")

async function main() {
  const ShyftBALV2LPStaking = await hh.ethers.getContractFactory("ShyftBALV2LPStaking")
  const BALV2Staking = await ShyftBALV2LPStaking.deploy("0xb17C88bDA07D28B3838E0c1dE6a30eAfBCF52D85", 1627201708)

  console.log("ShyftBALV2LPStaking was deployed to :: ", BALV2Staking.address, " successfully.");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });