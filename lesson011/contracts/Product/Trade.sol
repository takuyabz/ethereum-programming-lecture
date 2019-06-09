pragma solidity ^0.5.0;

import "./Article.sol";

contract Trade is Article {
  struct TradeStruct {
    uint256 price; // 一次販売価格
    uint256 ratio; // 再販報酬率 0 <= ratio <= 100
    uint256 limitSupply; // 発行上限
    uint256 totalSupply; // 発行数
    bool publish; // 記事販売ステータス(true:販売中/false:販売停止中)
    mapping(address  => bool) customerMap;
  }
  mapping(uint256 => TradeStruct) tradeMap;

  modifier ratioRange(uint256 ratio) {
    require(ratio <= 100, "ratio overflow");
    _;
  }

  function updateTradeInfo(
    uint256 cid, 
    uint256 price,
    uint256 ratio,
    uint256 limitSupply,
    bool publish
  ) 
    external
    ratioRange(ratio)
  {
    require(ownerOf(cid) == msg.sender);
    require(_exists(cid));
    TradeStruct storage trade = tradeMap[cid];
    trade.price = price;
    trade.publish = publish;
    trade.ratio = ratio;
    trade.limitSupply = limitSupply;
    trade.customerMap[msg.sender] = true;
  }

  function getTradeInfo(
    uint256 cid
  ) 
    external 
    view 
    returns(
      uint256 price,
      uint256 ratio,
      uint256 limitSupply,
      uint256 totalSupply,
      bool publish
    )
  {
    require(_exists(cid));
    TradeStruct storage trade = tradeMap[cid];
    return (
      trade.price,
      trade.ratio,
      trade.limitSupply,
      trade.totalSupply,
      trade.publish
    );
  }

  modifier onlySigner(
    uint256 cid
  ) {
    TradeStruct storage trade = tradeMap[cid];
    require(trade.customerMap[msg.sender], "not signed, please updateInfo");
    _;
  }

  function getTradeContent(
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

  modifier notTradePurchased(uint256 cid) {
    TradeStruct storage trade = tradeMap[cid];
    require(trade.customerMap[msg.sender] == false, "trade exist");
    _;
  }

  modifier notLimitSupply(uint256 cid) {
    TradeStruct storage trade = tradeMap[cid];
    require(trade.limitSupply > trade.totalSupply, "supply overflow");
    _;
  }

  function _purchaseTrade(
    uint256 cid
  )
    internal
    notLimitSupply(cid)
    notTradePurchased(cid)
  {
    require(_exists(cid));
    TradeStruct storage trade = tradeMap[cid];
    trade.customerMap[msg.sender] = true;
    trade.totalSupply++;
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

  //
}
