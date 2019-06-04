const Hello = artifacts.require("./Hello.sol");

module.exports = (deployer) => {
  deployer.deploy(Hello,"");
}