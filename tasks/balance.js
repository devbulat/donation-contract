require("@nomiclabs/hardhat-web3");

task("balance", "Prints a contract's balance")
  .addParam("contract", "The contract's address")
  .setAction(async (taskArgs) => {
    const {
      abi,
    } = require("../artifacts/contracts/Donation.sol/Donation.json");

    try {
      const Donation = new web3.eth.Contract(abi, taskArgs.contract);
      const balance = await Donation.methods.getBalance().call();
      console.log("Contract balance:\n", balance);
    } catch (e) {
      console.log("Error:\n", e);
    }
  });

module.exports = {};
