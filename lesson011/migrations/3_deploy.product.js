const Main = artifacts.require("./Product/Main.sol");
const Article = artifacts.require("./Product/Article.sol");
const Trade = artifacts.require("./Product/Trade.sol");
const TradePurchaser = artifacts.require("./Product/TradePurchaser.sol");
module.exports = async (deployer) => {
  await deployer.deploy(Main);
  await deployer.deploy(Article);
  await deployer.deploy(Trade);
  await deployer.deploy(TradePurchaser);
}
