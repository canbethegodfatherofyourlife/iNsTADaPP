async function main() {

  const [deployer] = await ethers.getSigners();

  const InstaDapp = await ethers.getContractFactory("InstaDapp");
  const instaDapp = await InstaDapp.deploy();
  console.log("Contract address: " + instaDapp.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });