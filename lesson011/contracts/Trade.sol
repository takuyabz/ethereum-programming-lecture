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

  modifier ratioSupply(uint256 cid, uint256 limitSupply) {
    require(limitSupply > 0, "limit supply must be over 0");
    TradeStruct storage trade = tradeMap[cid];
    require(trade.totalSupply <= limitSupply, "limit supply must be over totalSupply");
    _;
  }

  modifier priceTradeRange(uint256 price) {
    require(price > 0, "price must be over zero");
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
    ratioSupply(cid, limitSupply)
    priceTradeRange(price)
  {
    require(ownerOf(cid) == msg.sender,"must be owner");
    require(_exists(cid));
    TradeStruct storage trade = tradeMap[cid];
    trade.price = price;
    trade.ratio = ratio;
    trade.limitSupply = limitSupply;
    trade.publish = publish;
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

  modifier onlySignerTrade(
    uint256 cid
  ) {
    TradeStruct storage trade = tradeMap[cid];
    require(trade.customerMap[msg.sender], "not signed, please updateInfo");
    _;
  }

  function getTradeContent(
    uint256 _cid
  ) 
    external 
    view 
    onlySignerTrade(cid)
    returns(
      uint256 cid,
      string memory title, 
      string memory description, 
      string memory imgsrc, 
      address owner
    ) 
  {
    require(_exists(_cid));
    return super._getContent(_cid);
  }

  modifier notTradePurchased(uint256 cid) {
    TradeStruct storage trade = tradeMap[cid];
    require(trade.customerMap[msg.sender] == false, "trade exist");
    _;
  }

  modifier notLimitSupplyTrade(uint256 cid) {
    TradeStruct storage trade = tradeMap[cid];
    require(trade.limitSupply >= trade.totalSupply + 1, "supply overflow");
    _;
  }

  function _purchaseTrade(
    uint256 cid
  )
    internal
    notLimitSupplyTrade(cid)
    notTradePurchased(cid)
  {
    require(_exists(cid));
    TradeStruct storage trade = tradeMap[cid];
    trade.customerMap[msg.sender] = true;
    trade.totalSupply = trade.totalSupply+1;
  }

}
