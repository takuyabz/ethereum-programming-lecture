const KeySet = artifacts.require("./KeySet.sol");
const KeySetLib = artifacts.require("./KeySetLib.sol");

module.exports = (deployer) => {
  deployer.deploy(KeySetLib);
  deployer.link(KeySetLib, KeySet);
  deployer.deploy(KeySet);
}
