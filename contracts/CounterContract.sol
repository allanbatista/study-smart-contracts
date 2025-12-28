// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CounterContract {
    uint32 public counter;

    constructor() {
        counter = 1;
    }

    function increment() public {
        counter += 1;
    }
}
