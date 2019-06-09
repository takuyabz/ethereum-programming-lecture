pragma solidity ^0.5.0;

import "./ResaleHistory.sol";

contract ResalePurchaser is ResaleHistory {
  struct ResalePurchaseStruct {
    uint256[] purchaseList;
  }
  mapping(address => ResalePurchaseStruct) private resalePurchased;

  modifier sameResalePrice(
    uint256 tid
  ) 
  {
    ResaleStruct storage resale = resaleMap[tid];
    require(msg.value == resale.price, "resale price error");
    _;
  }

  function purchaseResale(
    uint256 tid,
    address seller
  )
    external
    sameResalePrice(tid)
    payable
  {
    super._purchaseResale(tid);
    ResaleStruct storage resale = resaleMap[tid];
    resalePurchased[ownerOf(resale.cid)].purchaseList.push(resale.cid);
    TradeStruct storage trade = tradeMap[resale.cid];
    address(uint160(ownerOf(resale.cid))).transfer(resale.price * (trade.ratio) / 100);
    address(uint160(seller)).transfer(resale.price * ( 100 - trade.ratio) / 100);
  }

  function countResalePurchased() 
    public 
    view 
    returns(
      uint256
    ) 
  {
    return resalePurchased[msg.sender].purchaseList.length;
  }

  modifier rangeResaleIndex(
    uint256 index
  ) 
  {
    require(resalePurchased[msg.sender].purchaseList.length < index, "index overflow");
    _;
  }

  function resaleAtIndex(
    uint256 index
  ) 
    public 
    view 
    rangeResaleIndex(index) 
    returns(
      uint256
    ) 
  {
    return resalePurchased[msg.sender].purchaseList[index];
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