// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

error OwnerRequiredError();

contract CounterWithOwnerContract {
    uint public counter;
    address public owner;
    bool public is_running;

    constructor() {
        counter = 0;
        owner = msg.sender;
        is_running = true;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, 'owner is required');
        _;
    }

    function increment() public {
        require(is_running, 'was paused by owner');
        counter += 1;
    }

    function reset() public onlyOwner {
        counter = 0;
    }

    function toggle_pause() public onlyOwner {
        is_running = !is_running;
    }
}
