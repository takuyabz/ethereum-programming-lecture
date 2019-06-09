pragma solidity ^0.5.0;

import "./TradePurchaser.sol";

contract Resale is TradePurchaser {
  struct ResaleStruct {
    uint256 cid;
    uint256 price; // 二次販売価格
    uint256 limitSupply; // 発行上限
    uint256 totalSupply; // 発行数
    address owner;
    address purchaser;
    bool publish; // 販売ステータス(true:販売中/false:販売停止中)
    mapping(address  => bool) customerMap;
  }
  mapping(uint256 => ResaleStruct) resaleMap;

  function updateResaleInfo(
    uint256 tid,
    uint256 price,
    uint256 limitSupply,
    bool publish
  ) 
    external  
  {
    (uint256 cid, address owner, address purchaser) = super.getLogTrade(tid);
    require(purchaser == msg.sender);
    require(_exists(cid));
    ResaleStruct storage resale = resaleMap[tid];
    resale.cid = cid;
    resale.price = price;
    resale.limitSupply = limitSupply;
    resale.publish = publish;
    resale.owner = owner;
    resale.purchaser = purchaser;
    resale.customerMap[msg.sender] = true;
  }

  function getResaleInfo(
    uint256 tid
  ) 
    external 
    view 
    returns(
      address,
      address,
      uint256,
      uint256,
      uint256,
      uint256,
      bool
    )
  {
    ResaleStruct storage resale = resaleMap[tid];
    require(_exists(resale.cid));
    return (
      resale.owner,
      resale.purchaser,
      resale.cid,
      resale.price,
      resale.limitSupply,
      resale.totalSupply,
      resale.publish
    );
  }

  modifier onlySigner(
    uint256 tid
  ) {
    ResaleStruct storage resale = resaleMap[tid];
    require(resale.customerMap[msg.sender], "not signed, please updateInfo");
    _;
  }

  function getResaleContent(
    uint256 tid
  )
    external 
    view 
    onlySigner(tid)
    returns(
      uint256, 
      string memory, 
      string memory, 
      string memory, 
      address 
    ) 
  {
    ResaleStruct storage resale = resaleMap[tid];
    require(_exists(resale.cid));
    return super._getContent(resale.cid);
  }

  modifier notResalePurchased(uint256 tid) {
    ResaleStruct storage resale = resaleMap[tid];
    require(resale.customerMap[msg.sender] == false, "resale exist");
    _;
  }

  modifier notLimitSupply(uint256 tid) {
    ResaleStruct storage trade = resaleMap[tid];
    require(trade.limitSupply > trade.totalSupply, "supply overflow");
    _;
  }


  function _purchaseResale(
    uint256 tid
  )
    internal
    notLimitSupply(tid)
    notResalePurchased(tid)
  {
    ResaleStruct storage resale = resaleMap[tid];
    require(_exists(resale.cid));
    resale.customerMap[msg.sender] = true;
  }

  // step
  // accounts = await web3.eth.getAccounts();
  // i = await Trade.deployed()
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

}
