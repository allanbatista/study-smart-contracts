// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/** 2. **Whitelist / Allowlist**

* **Objective:** Owner adds/removes addresses to a whitelist; only whitelisted addresses can perform
  a restricted action (e.g., participate in an early sale, vote on proposals, or access beta features).
* **Key Concepts:**
    - Whitelist: A mapping of approved addresses; acts as a permission list.
    - Admin functions: Owner-only functions to manage who is allowed.
* **Real-world Use:** Early-stage project grants voting rights only to verified community members to
  prevent Sybil attacks (one person creating multiple fake accounts).
* **Learns:** Mappings, events (emitting when addresses are added/removed), admin patterns, permission systems.
* **/

contract AllowlistGateContract {
    address public owner;
    mapping(address => bool) public whitelisted;

    constructor() {
        owner = msg.sender;
    }

    modifier OnlyOwner() {
        require(owner == msg.sender, 'owner is required');
        _;
    }

    event WhitelistedEvent(address indexed account, bool allowed);

    function addToList(address account) public OnlyOwner {
        whitelisted[account] = true;
        emit WhitelistedEvent(account, true);
    }

    function removeFromList(address account) public OnlyOwner {
        delete whitelisted[account];
        emit WhitelistedEvent(account, false);
    }
}
