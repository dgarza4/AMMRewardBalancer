# AMMRewardBalancerContract
Balancer AMM reward system

1. Calculating AMM reward for balance LP token staking
2. Getting tokens' amount for the reward claiming

### Using Software

NodeJS, Hardhat

Node v12.18.0
Hardhat 2.3.3
Solidity - 0.8.0 (solc-js)

### Deploy Contract

`npx hardhat run scripts/deploy.js --network [network_name]`

### Verify Contract

`npx hardhat verify --network [network_name] [contract_address] [argument1(SHFT-V2 address)] [argument2(current timestamp)]`

### Using hardhat console

`npx hardhat node`
`npx hardhat run --network localhost scripts/deploy.js`
`npx hardhat console --network localhost`

### Testing process

`npx hardhat test`

### Tokens' amount calculation algorithm

![algorithm] (https://drive.google.com/uc?export=view&id=1AgaQhpEikfP2Y4MIIJpiUkTcsXoGgRwO)