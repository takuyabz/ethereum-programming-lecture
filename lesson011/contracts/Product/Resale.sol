pragma solidity ^0.5.0;

import "./TradePurchaser.sol";

contract Resale is TradePurchaser {
  struct ResaleStruct {
    uint256 price; // 二次販売価格
    bool publish; // 販売ステータス(true:販売中/false:販売停止中)
    mapping(address  => bool) customerMap;
  }
  mapping(uint256 => ResaleStruct) resaleMap;

  function updateResaleInfo(
    uint256 cid, 
    uint256 price,
    bool publish
  ) 
    external  
  {
    require(ownerOf(cid) == msg.sender);
    require(_exists(cid));
    ResaleStruct storage resale = resaleMap[cid];
    resale.price = price;
    resale.publish = publish;
    resale.customerMap[msg.sender] = true;
  }

  function getResaleInfo(
    uint256 cid
  ) 
    external 
    view 
    returns(
      uint256 price,
      bool publish
    )
  {
    require(_exists(cid));
    ResaleStruct storage resale = resaleMap[cid];
    return (
      resale.price,
      resale.publish
    );
  }

  modifier onlySigner(
    uint256 cid
  ) {
    ResaleStruct storage resale = resaleMap[cid];
    require(resale.customerMap[msg.sender], "not signed, please updateInfo");
    _;
  }

  function getContent(
    uint256 cid
  )
    external 
    view 
    onlySigner(cid)
    returns(
      uint256, 
      string memory, 
      string memory, 
      string memory, 
      address 
    ) 
  {
    require(_exists(cid));
    return super._getContent(cid);
  }

  modifier notResalePurchased(uint256 cid) {
    ResaleStruct storage resale = resaleMap[cid];
    require(resale.customerMap[msg.sender] == false, "resale exist");
    _;
  }

  function _purchaseResale(
    uint256 cid
  )
    internal
    notResalePurchased(cid)
  {
    require(_exists(cid));
    ResaleStruct storage resale = resaleMap[cid];
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
