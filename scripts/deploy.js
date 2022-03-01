// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

async function main() {
  const [owner, minter] = await ethers.getSigners();

  console.log('minter', minter.address);
  console.log('owner', owner.address);
  
  const maincontract = await hre.ethers.getContractFactory("ERC721R");
  const nft = await maincontract
  .connect(minter)
  .deploy("ERC721R", "R-C", 5000, 1, 1645518868, 1645519008, 100000000000000, "ipfs://QmXLrHE5QRRC1PYXNBqfkguuYc7DvKhboNp1BQDZLJGhjV/");
  
  console.log('starting');
  await nft.deployed();

  // const test = await hre.ethers.getContractFactory("test");
  // const testDeployed = await test.deploy();
  // await testDeployed.deployed();
  // let txn1 = await testDeployed.getOwner(1);

  // console.log("cryptoadz", txn1, testDeployed.address);
  // 0x250E645dD66977BB0b8D2639755fF1Ca25c88A83
  console.log('address', nft.address);




  let uri1 = await nft.tokenURI(0);
  console.log(uri1);

  // await nft.connect(minter).toggleReveal()
  // let uri = await nft.tokenURI(1);
  // console.log(uri);

  // let txn = await nft.connect(owner).mint(2)
  // let txnx = await txn.wait();
  // console.log('balance', Number( await nft.balanceOf(owner.address)));

  // let txn1 = await nft.connect(owner).mint("0xdf9e6a194F3d4DC2571158F4bA7CFA9696AA9274", 2)
  // let txnnn1 = txn1.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });