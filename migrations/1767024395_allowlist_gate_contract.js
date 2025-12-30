const AllowlistGateContract = artifacts.require('AllowlistGateContract');

module.exports = function(deployer) {
    deployer.deploy(AllowlistGateContract);
};
