import { ethers } from "hardhat";

async function main() {
  // Deploy DuniaDAO
  const DuniaDAO = await ethers.getContractFactory("DuniaDAO");
  const duniaDAO = await DuniaDAO.deploy();
  await duniaDAO.waitForDeployment();
  console.log("DuniaDAO deployed to:", await duniaDAO.getAddress());

  // Deploy SkillVerification
  const SkillVerification = await ethers.getContractFactory("SkillVerification");
  const skillVerification = await SkillVerification.deploy();
  await skillVerification.waitForDeployment();
  console.log("SkillVerification deployed to:", await skillVerification.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});