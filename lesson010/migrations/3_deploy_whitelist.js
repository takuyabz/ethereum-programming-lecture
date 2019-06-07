const Whitelist = artifacts.require("./Whitelist.sol");

module.exports = (deployer) => {
  deployer.deploy(Whitelist);
}