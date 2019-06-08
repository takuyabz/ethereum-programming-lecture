const Article = artifacts.require("./Article.sol");

module.exports = (deployer) => {
  deployer.deploy(Article);
};

