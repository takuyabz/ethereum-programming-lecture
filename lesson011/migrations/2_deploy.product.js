const Main = artifacts.require("./Main.sol");
const Article = artifacts.require("./Article.sol");
const Trade = artifacts.require("./Trade.sol");
const TradePurchaser = artifacts.require("./TradePurchaser.sol");
const TradeHistory = artifacts.require("./TradeHistory.sol");
const Resale = artifacts.require("./Resale.sol");
const ResalePurchaser = artifacts.require("./ResalePurchaser.sol");
const ResaleHistory = artifacts.require("./ResaleHistory.sol");

module.exports = async (deployer) => {
  await deployer.deploy(Main);
  await deployer.deploy(Article);
  await deployer.deploy(Trade);
  await deployer.deploy(TradeHistory);
  await deployer.deploy(TradePurchaser);
  await deployer.deploy(Resale);
  await deployer.deploy(ResaleHistory);
  await deployer.deploy(ResalePurchaser);
}
