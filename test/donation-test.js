const { expect } = require("chai");
const { ethers } = require("hardhat");

const zeroValue = ethers.utils.parseUnits("0", "wei");
let value, DonationFactory, donationContract;

beforeEach(async function () {
  value = ethers.utils.parseUnits("2", "wei");
  DonationFactory = await ethers.getContractFactory("Donation");
  donationContract = await DonationFactory.deploy();
  const [owner] = await ethers.getSigners();
  await donationContract.connect(owner).makeDonation({ value });
});

describe("Donation", function () {
  it("Should return wallet balance", async function () {
    const balance = await donationContract.getBalance();

    expect(balance).to.equal(value);
  });

  it("Should return user donation", async function () {
    const [owner] = await ethers.getSigners();
    const ownerDonation = await donationContract.getUserDonation(owner.address);

    expect(ownerDonation).to.equal(value);
  });

  it("Shouldn't return user donation", async function () {
    const [_, addr1] = await ethers.getSigners();
    const addr1Donation = await donationContract.getUserDonation(addr1.address);

    expect(addr1Donation).to.equal(zeroValue);
  });

  it("Should return donators", async function () {
    const [owner, addr1] = await ethers.getSigners();
    let donators = await donationContract.getDonators();

    expect(donators.length).to.equal(1);
    expect(donators[0]).to.equal(owner.address);

    await donationContract.connect(addr1).makeDonation({ value });

    donators = await donationContract.getDonators();

    expect(donators.length).to.equal(2);
    expect(donators[1]).to.equal(addr1.address);
  });

  it("Shouldn't add donator if it already exist", async function () {
    const [owner] = await ethers.getSigners();
    let donators = await donationContract.getDonators();

    expect(donators.length).to.equal(1);
    expect(donators[0]).to.equal(owner.address);

    await donationContract.connect(owner).makeDonation({ value });

    expect(donators.length).to.equal(1);
  });

  it("Should transfer amount to wallet", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const oldAccountBalance = await addr1.getBalance();
    const balanceForCompare =
      ethers.BigNumber.from(oldAccountBalance).add(value);

    donationContract.connect(owner).transfer(value, addr1.address);

    const contractBalance = await donationContract.getBalance();
    const currentAccountBalance = await addr1.getBalance();

    expect(contractBalance).to.equal(zeroValue);
    expect(currentAccountBalance).to.equal(balanceForCompare);
  });

  it("Should reject transfer if it user not an owner", async function () {
    const [owner, addr1] = await ethers.getSigners();

    expect(
      donationContract.connect(addr1).transfer(value, addr1.address),
    ).to.be.revertedWith("You are not onwer.");
  });
});
