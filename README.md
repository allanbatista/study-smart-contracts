# Smart Contract Study Project

A hands-on educational project for learning Solidity smart contract development using Truffle Suite. This repository follows a progressive learning path, starting with simple contracts and advancing toward complex patterns like DAOs and NFT marketplaces.

## Overview

This project is designed for **study purposes** to practice and understand:
- Solidity programming fundamentals
- Smart contract patterns (access control, pausable, reentrancy guards)
- Testing smart contracts with Truffle/Mocha
- Deploying to local and test networks

See [CHALLENGE.md](./CHALLENGE.md) for the complete learning roadmap with 9 progressive challenges.

## Technologies Used

- **Solidity** 0.8.21 - Smart contract language
- **Truffle Suite** - Development framework
- **Ganache** - Local Ethereum blockchain
- **Web3.js** - Ethereum JavaScript API
- **Mocha** - Testing framework
- **Infura** - Ethereum node provider (for testnet deployment)

## Project Structure

```
smart-contract/
├── contracts/           # Solidity smart contracts
├── migrations/          # Truffle deployment scripts
├── test/                # Contract test files
├── build/               # Compiled contract artifacts (generated)
├── truffle-config.js    # Truffle configuration
├── package.json         # Node.js dependencies
├── .env.example         # Environment variables template
├── CHALLENGE.md         # Learning roadmap
└── README.md            # This file
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Yarn](https://yarnpkg.com/) or npm
- [Truffle](https://trufflesuite.com/) (`npm install -g truffle`)

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:allanbatista/study-smart-contracts.git
   cd smart-contract
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Copy the environment file and configure it:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your credentials (required for testnet deployment only).

## Usage

### Local Development

1. Start a local blockchain:
   ```bash
   npx ganache
   ```

2. In another terminal, compile contracts:
   ```bash
   npx truffle compile
   ```

3. Deploy contracts to local network:
   ```bash
   npx truffle migrate
   ```

4. Run tests:
   ```bash
   npx truffle test
   ```

### Testnet Deployment (Sepolia)

1. Configure `.env` with your credentials:
   - `INFURA_PROJECT_ID`: Get from [Infura](https://www.infura.io/)
   - `PRIVATE_KEY`: Your wallet private key (never commit this!)

2. Get test ETH from a faucet (see [Testnet Resources](#testnet-resources))

3. Deploy to Sepolia:
   ```bash
   npx truffle migrate --network sepolia
   ```

## Contracts

| Contract | Description |
|----------|-------------|
| `CounterContract` | Basic counter with increment functionality |
| `CounterWithOwnerContract` | Counter with owner access control and pause functionality |

## Testing

Run all tests:
```bash
npx truffle test
```

Run a specific test file:
```bash
npx truffle test test/counter_contract.js
```

## Testnet Resources

### Sepolia (Ethereum Testnet)
- **Faucet**: https://cloud.google.com/application/web3/faucet/ethereum/sepolia
- **Explorer**: https://sepolia.etherscan.io/

### BNB Testnet
- **Faucet**: https://www.bnbchain.org/en/testnet-faucet
- **Explorer**: https://bscscan.com/

## Learning Roadmap

This project follows a progressive learning path with 9 challenges:

1. **Counter with Owner + Pausable** - Access control and pause functionality
2. **Whitelist / Allowlist** - Permission management with mappings
3. **Vault (Cofrinho)** - ETH deposits/withdrawals with reentrancy guards
4. **ERC-20 Token** - Standard token implementation from scratch
5. **Crowdfunding** - Goal-based fundraising with deadlines and refunds
6. **Auction** - Bidding system with pull payments
7. **NFT ERC-721** - Non-fungible tokens with supply caps
8. **NFT Marketplace** - List, buy, sell NFTs with royalties
9. **DAO** - Governance with proposals, voting, and timelock

See [CHALLENGE.md](./CHALLENGE.md) for detailed requirements of each challenge.

## Notes

My first transaction ever (on Sepolia): [0x450604f90aec9268e8f6d714b7ee88d638c22021e0c5becf2c5a62c20b7ec596](https://sepolia.etherscan.io/tx/0x450604f90aec9268e8f6d714b7ee88d638c22021e0c5becf2c5a62c20b7ec596)
