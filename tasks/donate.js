require("@nomiclabs/hardhat-web3");

task("donate", "Make a donation")
  .addParam("contract", "The contract's address")
  .addParam("account", "Donator account")
  .addParam("amount", "Donation amount")
  .setAction(async (taskArgs) => {
    const {
      abi,
    } = require("../artifacts/contracts/Donation.sol/Donation.json");

    try {
      const signers = await ethers.getSigners();
      const donator = signers.find(
        (item) => item.address.toLowerCase() === taskArgs.account.toLowerCase(),
      );

      if (!donator) {
        throw "Donator not found.";
      }

      const Donation = new web3.eth.Contract(abi, taskArgs.contract);
      await Donation.methods
        .makeDonation()
        .send({ value: taskArgs.amount, from: donator.address });

      console.log("Donation has been sent");
    } catch (e) {
      console.log("Donation has not been sent. Error:", e);
    }
  });

module.exports = {};
