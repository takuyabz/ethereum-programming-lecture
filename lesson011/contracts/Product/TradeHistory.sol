pragma solidity ^0.5.0;

import "./Trade.sol";

contract TradeHistory is Trade {
  struct TradeHistoryStruct {
    uint256 cid;
    address owner;
    address purchaser;
  }

  mapping(uint256 => TradeHistoryStruct) private history;
  uint256 private lastIndex;

  function _purchaseTrade(
    uint256 cid
  )
    internal
  {
    require(_exists(cid));
    super._purchaseTrade(cid);
    TradeHistoryStruct storage logItem = history[lastIndex++];
    logItem.owner = ownerOf(cid);
    logItem.purchaser = msg.sender;
    logItem.cid = cid;
  }


  function getLogTrade(
    uint256 tid
  )
    public
    view 
    returns(
      uint256,
      address,
      address
    )
  {
    TradeHistoryStruct storage logItem = history[tid];
    return (
      logItem.cid,
      logItem.owner,
      logItem.purchaser
    );
  }
}