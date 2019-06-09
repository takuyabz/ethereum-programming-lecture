const SampleHello = artifacts.require("./Example/SampleHello.sol");
const SampleWhitelist = artifacts.require("./Example/SampleWhitelist.sol");
const SampleArticle = artifacts.require("./Example/SampleArticle.sol");
const SampleKeySet = artifacts.require("./Example/SampleKeySet.sol");
const SampleKeySetLib = artifacts.require("./Example/SampleKeySetLib.sol");

module.exports = async (deployer) => {
  await deployer.deploy(SampleHello);
  await deployer.deploy(SampleWhitelist);
  await deployer.deploy(SampleArticle);
  await deployer.deploy(SampleKeySetLib);
  await deployer.link(SampleKeySetLib,SampleKeySet);
  await deployer.deploy(SampleKeySet);
};
