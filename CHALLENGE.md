1. **Counter with Owner + Pausable**

* **Objective:** Only the owner can reset the counter to zero; anyone can increment; owner can pause
  (prevent increments) or unpause the contract in case of emergency.
* **Key Concepts:**
    - `owner`: A single address with special administrative privileges (set at deployment).
    - Modifiers: Reusable access control patterns (e.g., `onlyOwner`, `whenNotPaused`).
    - Emergency pausing: A safety mechanism to halt operations without destroying state.
* **Real-world Use:** Halting a service if a security vulnerability is discovered before a fix is deployed.
* **Learns:** Access control, modifiers, state management, emergency mechanisms.

---

2. **Whitelist / Allowlist**

* **Objective:** Owner adds/removes addresses to a whitelist; only whitelisted addresses can perform
  a restricted action (e.g., participate in an early sale, vote on proposals, or access beta features).
* **Key Concepts:**
    - Whitelist: A mapping of approved addresses; acts as a permission list.
    - Admin functions: Owner-only functions to manage who is allowed.
* **Real-world Use:** Early-stage project grants voting rights only to verified community members to
  prevent Sybil attacks (one person creating multiple fake accounts).
* **Learns:** Mappings, events (emitting when addresses are added/removed), admin patterns, permission systems.

---

3. **Vault with Deposit & Withdrawal (with Reentrancy Protection)**

* **Objective:** Users deposit ETH into the contract and can withdraw their balance; the contract must
  resist reentrancy attacks where a malicious contract repeatedly calls back before the first withdrawal
  completes; emit events to log all transactions.
* **Key Concepts:**
    - `payable`: Allows the function to receive ETH.
    - Reentrancy: An attack where a contract calls back into the victim before state is updated, draining funds.
    - Checks-Effects-Interactions: Update state *before* making external calls to prevent reentrancy.
    - Pull over Push: Let users withdraw funds themselves rather than sending funds automatically.
* **Real-world Use:** A lending protocol where users deposit collateral and later withdraw it; reentrancy
  guards are critical to prevent attackers from draining the vault.
* **Learns:** `payable` functions, reentrancy vulnerabilities, reentrancy guards, secure call patterns, event logging.

---

4. **Minimal ERC-20 Token**

* **Objective:** Implement a basic token contract with `balanceOf` (check balance), `transfer` (send tokens),
  `approve` (authorize another address to spend), `transferFrom` (execute an approved transfer), and `allowance`
  (check approval limit). Emit `Transfer` and `Approval` events for transparency.
* **Key Concepts:**
    - ERC-20: The standard interface for fungible tokens on Ethereum (like stablecoins or governance tokens).
    - Allowances: A delegation system where Account A can approve Account B to spend up to X tokens on A's behalf.
    - Decimal places: Tokens typically have 18 decimals (1 token = 10^18 units) for precision.
* **Real-world Use:** Creating a governance token where holders can vote, or a payment token used within
  a DApp ecosystem.
* **Learns:** ERC-20 standard, allowance mechanics, transfer logic, event design.

---

5. **Crowdfunding with Goals**

* **Objective:** A campaign has a funding goal and a deadline. Contributors send ETH; if the goal is reached
  by the deadline, the owner withdraws funds; if not met, contributors can claim refunds.
* **Key Concepts:**
    - State transitions: The contract moves through phases (open → success/failure → finalized).
    - Escrow pattern: The contract temporarily holds funds until a condition is met, then releases them.
    - Timestamp-based deadlines: `block.timestamp` is used to enforce time limits.
* **Real-world Use:** Funding open-source projects, startups, or community initiatives where funds are only
  released if support meets a threshold.
* **Learns:** State machines, time-based logic, refund logic, escrow patterns.

---

6. **Auction with Bidding & Refunds**

* **Objective:** An auction runs for a set duration; users place bids; the highest bidder wins; losing bidders
  can withdraw their bids themselves (pull-based refunds) after the auction ends; the winner's bid is finalized
  and the owner claims it.
* **Key Concepts:**
    - Bidding: Users offer increasing amounts; only the highest can win.
    - Pull payments: Losing bidders trigger their own refunds rather than being auto-sent, reducing DoS risks.
    - DoS (Denial of Service): If refunds are automatically pushed, a malicious recipient could revert and block auction finalization.
* **Real-world Use:** NFT auctions, domain name bidding, or token sales where price discovery matters.
* **Learns:** Pull payment patterns, anti-DoS design, state finalization, safe refund mechanisms.

---

7. **Governance DAO (Voting + Timelock)**

* **Objective:** Token holders can propose actions (e.g., "transfer 1000 tokens to address X") and vote on them.
  Voting requires holding governance tokens (you vote with tokens you own). A proposal must reach a quorum
  (minimum participation) and pass a voting threshold; if approved, the action is queued with a timelock delay
  before execution, giving the community time to react or exit if they disagree.
* **Key Concepts:**
    - Voting: Tokenholders cast votes; usually 1 token = 1 vote. Voting happens on-chain and is transparent.
    - Quorum: Minimum number of participants or voting power required for a proposal to be valid.
    - Timelock: A delay between approval and execution, allowing users to exit or prepare for changes.
    - Proposals: Stored transactions describing what action to execute (target contract, function, arguments).
* **Real-world Use:** Decentralized autonomous organizations (DAOs) like Uniswap or MakerDAO let token holders
  collectively decide on protocol changes, fund allocation, and parameter adjustments.
* **Learns:** Governance design, proposal mechanics, vote counting, timelock patterns, safe delegation of power,
  calling external contracts securely.