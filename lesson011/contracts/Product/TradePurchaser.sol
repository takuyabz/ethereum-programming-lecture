pragma solidity ^0.5.0;

import "./TradeHistory.sol";

contract TradePurchaser is TradeHistory {
  struct TradePurchaseStruct {
    uint256[] purchaseList;
  }
  mapping(address => TradePurchaseStruct) tradePurchased;

  modifier sameTradePrice(
    uint256 cid
  ) 
  {
    TradeStruct storage trade = tradeMap[cid];
    require(msg.value == trade.price, "trade price error");
    _;
  }

  function purchaseTrade(
    uint256 cid
  )
    external
    sameTradePrice(cid)
    payable
  {
    super._purchaseTrade(cid);
    TradeStruct storage trade = tradeMap[cid];
    tradePurchased[ownerOf(cid)].purchaseList.push(cid);
    address(uint160(ownerOf(cid))).transfer(trade.price);
  }

  function countTradePurchased(
  ) 
    public 
    view 
    returns(
      uint256
    ) 
  {
    return tradePurchased[msg.sender].purchaseList.length;
  }

  modifier rangeTradeIndex(
    uint256 index
  ) 
  {
    require(tradePurchased[msg.sender].purchaseList.length < index, "index overflow");
    _;
  }

  function tradeAtIndex(
    uint256 index
  ) 
    public 
    view 
    rangeTradeIndex(
      index
    ) 
    returns(
      uint256
    ) 
  {
    return tradePurchased[msg.sender].purchaseList[index];
  }

  // step
  // accounts = await web3.eth.getAccounts();
  // i = await Purchaser.deployed()
  // i.addWhitelisted(accounts[0]);
  // i.isWhitelisted(accounts[0]);
  // i.createContent("hello","world","img.png");
  // i.updateTradeInfo(0,100,true);
  // i.getTradeInfo(0);
  // i.getContent(0);
  // i.getContent(0, {from: accounts[0]});
  // i.getContent(0, {from: accounts[1]});
  // i.purchase(0, {from: accounts[1], value: 100});
  // i.getContent(0, {from: accounts[0]});
  // i.getContent(0, {from: accounts[1]});
  // i.createContent("hello2","world2","img2.png");
  // i.updateTradeInfo(1,300,true);
  // i.purchase(1, {from: accounts[1], value: 300});
  // i.countPurchased();
  // i.purchaseAtIndex(1)

}