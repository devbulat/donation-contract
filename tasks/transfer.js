require("@nomiclabs/hardhat-web3");

task("transfer", "Make a transfer")
  .addParam("contract", "The contract's address")
  .addParam("account", "Account for request")
  .addParam("amount", "Transfer amount")
  .addParam("address", "Destination address")
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
        .transfer(taskArgs.amount, taskArgs.address)
        .send({ from: donator.address });
      console.log("Transfer has been sent");
    } catch (e) {
      console.log("Transfer has not been sent. Error:", e);
    }
  });

module.exports = {};
