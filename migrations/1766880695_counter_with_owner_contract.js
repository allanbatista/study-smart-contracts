const CounterWithOwnerContract = artifacts.require("CounterWithOwnerContract");

module.exports = function (deployer) {
    deployer.deploy(CounterWithOwnerContract);
};