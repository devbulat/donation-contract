//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Donation {
    address public owner;
    address public walletAddress;
    address[] public donators;
    mapping (address => uint) public donations;
    
    constructor() {
      owner = msg.sender;
      walletAddress = address(this);
    }

    function getBalance() public view returns(uint) {
      return walletAddress.balance;
    }

    function getUserDonation(address addr) public view returns (uint)  {
      return donations[addr];
    }

    function getDonators() public view returns (address[] memory) {
      return donators;
    }

    function transfer(uint amount, address addr) public {
      require(owner == msg.sender, 'You are not onwer.');

      address payable receiver = payable(addr);
      receiver.transfer(amount);
    }

    function makeDonation() external payable {
      if (donations[msg.sender] == 0) {
        donations[msg.sender] = msg.value;
        donators.push(msg.sender);
      } else {
        donations[msg.sender] += msg.value;
      }
    }
}
