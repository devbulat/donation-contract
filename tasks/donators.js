require("@nomiclabs/hardhat-web3");

task("donators", "Prints donators")
  .addParam("contract", "The contract's address")
  .setAction(async (taskArgs) => {
    const {
      abi,
    } = require("../artifacts/contracts/Donation.sol/Donation.json");

    try {
      const Donation = new web3.eth.Contract(abi, taskArgs.contract);
      const donators = await Donation.methods.getDonators().call();

      console.log("Donators:\n", donators);
    } catch (e) {
      console.log("Error:\n", e);
    }
  });

module.exports = {};
