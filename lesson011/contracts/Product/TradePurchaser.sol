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
    tradePurchased[msg.sender].purchaseList.push(cid);
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
    require(tradePurchased[msg.sender].purchaseList.length > index, "index overflow");
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

}