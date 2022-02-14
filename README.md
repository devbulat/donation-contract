# Donation Contract 
Smart contract for donations receiving.
Based on [Hardhat](https://hardhat.org/).

## Local launch

You could use this command for local launch:
```shell
npm run dev:network
```
This command will start local Hardhat network. For contract deployon you could open new terminal window and invoke this command:
```shell
npm run dev:contract
```

**NOTE**
- Run `npx hardhat compile` before start.
- Don't forget to specify `CHAIN_ID` variable in your `.env` file. This value should match with chain ID from your Metamask.

## Launch contract on Rinkeby
You could use this command for launch contract on rinkeby
```shell
npm run rinkeby:contract
```
**NOTE**
- Don't forget to specify `ALCHEMY_KEY` and `PRIVATE_KEY` variables in your `.env` file.

## Commands for testing
For tests running you could invoke next commands:
```shell
npm run test:unit 
npm run test:coverage 
```
