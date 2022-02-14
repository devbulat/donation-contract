require("@nomiclabs/hardhat-web3");

task("donation", "Get donations by address")
  .addParam("contract", "The contract's address")
  .addParam("address", "Donators address")
  .setAction(async (taskArgs) => {
    const {
      abi,
    } = require("../artifacts/contracts/Donation.sol/Donation.json");

    try {
      const Donation = new web3.eth.Contract(abi, taskArgs.contract);
      const donation = await Donation.methods
        .getUserDonation(taskArgs.address)
        .call();

      console.log(`Donator address:\n`, taskArgs.address);
      console.log(`Donations:\n`, donation);
    } catch (e) {
      console.log("Error:\n", e);
    }
  });

module.exports = {};
