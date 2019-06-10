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

  modifier priceResaleRange(uint256 price) {
    require(price > 0, "price resale must be over zero");
    _;
  }

  function updateResaleInfo(
    uint256 tid,
    uint256 price,
    uint256 limitSupply,
    bool publish
  ) 
    external  
    priceResaleRange(price)
  {
    (uint256 cid, address owner, address purchaser) = super.getLogTrade(tid);
    require(purchaser == msg.sender, "must be update resale info purchaser");
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
      address owner,
      address seller,
      uint256 cid,
      uint256 price,
      uint256 limitSupply,
      uint256 totalSupply,
      bool publish
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

  modifier onlySignerResale(
    uint256 tid
  ) {
    ResaleStruct storage resale = resaleMap[tid];
    require(resale.customerMap[msg.sender], "not signed, please resale updateInfo");
    _;
  }

  function getResaleContent(
    uint256 tid
  )
    external 
    view 
    onlySignerResale(tid)
    returns(
      uint256 cid, 
      string memory title, 
      string memory description, 
      string memory imgsrc, 
      address owner
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

  modifier notLimitSupplyResale(uint256 tid) {
    ResaleStruct storage trade = resaleMap[tid];
    require(trade.limitSupply >= trade.totalSupply + 1, "supply overflow resale");
    _;
  }

  function _purchaseResale(
    uint256 tid
  )
    internal
    notResalePurchased(tid)
    notLimitSupplyResale(tid)
  {
    ResaleStruct storage resale = resaleMap[tid];
    require(_exists(resale.cid));
    resale.customerMap[msg.sender] = true;
    resale.totalSupply = resale.totalSupply+1;
  }
}
