const Main = artifacts.require("./Product/Main.sol");
const Article = artifacts.require("./Product/Article.sol");
const Trade = artifacts.require("./Product/Trade.sol");
const TradePurchaser = artifacts.require("./Product/TradePurchaser.sol");
const TradeHistory = artifacts.require("./Product/TradeHistory.sol");
const Resale = artifacts.require("./Product/Resale.sol");
const ResalePurchaser = artifacts.require("./Product/ResalePurchaser.sol");
const ResaleHistory = artifacts.require("./Product/ResaleHistory.sol");

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

