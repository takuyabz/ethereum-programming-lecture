pragma solidity ^0.5.0;

import "./Resale.sol";

contract ResaleHistory is Resale {
  struct ResaleHistoryStruct {
    uint256 cid;
    uint256 tid;
    address owner;
    address seller;
    address purchaser;
  }

  mapping(uint256 => ResaleHistoryStruct) private history;
  uint256 private lastIndex;

  function _purchaseResale(
    uint256 tid
  )
    internal
  {
    (uint256 cid, address owner, address purchaser) = super.getLogTrade(tid);
    require(_exists(cid));
    super._purchaseResale(tid);
    ResaleHistoryStruct storage logItem = history[lastIndex++];
    logItem.cid = cid;
    logItem.tid = tid;
    logItem.owner = owner;
    logItem.seller = purchaser;
    logItem.purchaser = msg.sender;
  }

  function getLastRid() public view returns(uint256) {
    return lastIndex;
  }

  modifier rangeIndexResale(uint256 rid) {
    require(lastIndex > rid, "trade id over flow");
    _;
  }
  
  function getLogResale(
    uint256 rid
  )
    public
    rangeIndexResale(rid)
    view 
    returns(
      uint256,
      uint256,
      address,
      address,
      address
    )
  {
    ResaleHistoryStruct storage logItem = history[rid];
    return (
      logItem.cid,
      logItem.tid,
      logItem.owner,
      logItem.seller,
      logItem.purchaser
    );
  }
}