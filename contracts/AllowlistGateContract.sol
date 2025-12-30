// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/** 2. **Whitelist / Allowlist**

* **Objective:** Owner adds/removes addresses to a allowed_list; only allowed_list addresses can perform
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
    mapping(address => bool) public allowed_list;
    uint256 public counter;

    constructor() {
        owner = msg.sender;
    }

    modifier OnlyOwner() {
        require(owner == msg.sender, 'owner is required');
        _;
    }

    modifier OnlyAllowed() {
       require(owner == msg.sender || allowed_list[msg.sender], 'account is not authorized');
        _;
    }

    event WhitelistedEvent(address indexed account, bool allowed);

    function addToList(address account) public OnlyOwner {
        require(account != address(0), "Invalid address");
        require(!allowed_list[account], 'account already exists');

        allowed_list[account] = true;
        emit WhitelistedEvent(account, true);
    }

    function removeFromList(address account) public OnlyOwner {
        delete allowed_list[account];
        emit WhitelistedEvent(account, false);
    }

    function increment() public OnlyAllowed {
        counter += 1;
    }
}
