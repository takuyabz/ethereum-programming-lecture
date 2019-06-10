const Trade = artifacts.require("Trade");
const truffleAssert = require("truffle-assertions");

contract("Trade", async accounts => {
  it("setup", async () => {
    instance = await Trade.deployed();
    returnVal = await instance.isWhitelisted(accounts[0]);
    assert.equal(returnVal, false, "whitelisted logic fail");
    await instance.addWhitelisted(accounts[0]);
    returnVal = await instance.isWhitelisted(accounts[0]);
    assert.equal(returnVal, true, "whitelisted logic fail");

    returnVal = await instance.count();
    assert.equal(returnVal, 0, "content logic fail");

    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };

    await instance.createContent(
      content.title,
      content.description,
      content.imgsrc
    );

    returnVal = await instance.isWhitelisted(accounts[0]);
    assert.equal(returnVal, true, "content logic fail");
  });

  it("update Trade Info", async () => {
    instance = await Trade.deployed();
    returnVal = await instance.isWhitelisted(accounts[0]);
    assert.equal(returnVal, true, "content logic fail");
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    await instance.updateTradeInfo(
      tradeInfo.cid,
      tradeInfo.price,
      tradeInfo.ratio,
      tradeInfo.limitSupply,
      tradeInfo.publish
    );

    returnVal = await instance.getTradeInfo(tradeInfo.cid);

    assert.equal(returnVal.price, tradeInfo.price, "trade info logic fail price");
    assert.equal(returnVal.ratio, tradeInfo.ratio, "trade info logic fail ratio");
    assert.equal(returnVal.limitSupply, tradeInfo.limitSupply, "trade info logic fail limitSupply");
    assert.equal(returnVal.publish, tradeInfo.publish, "trade info logic fail publish");

  });

  it("update Trade Info with price 0", async () => {
    instance = await Trade.deployed();
    returnVal = await instance.isWhitelisted(accounts[0]);
    assert.equal(returnVal, true, "content logic fail");
    tradeInfo = {
      cid: 0,
      price: 0,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    truffleAssert.reverts(
      instance.updateTradeInfo(
        tradeInfo.cid,
        tradeInfo.price,
        tradeInfo.ratio,
        tradeInfo.limitSupply,
        tradeInfo.publish
      )
      ,
      "price must be over zero"
    );

  });

  it("update Trade info other account", async () => {
    instance = await Trade.deployed();
    returnVal = await instance.isWhitelisted(accounts[1]);
    assert.equal(returnVal, false, "content logic fail");
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    await truffleAssert.reverts(
      instance.updateTradeInfo(
        tradeInfo.cid,
        tradeInfo.price,
        tradeInfo.ratio,
        tradeInfo.limitSupply,
        tradeInfo.publish,
        {
          from: accounts[1]
        }
      )
      ,
      "must be owner"
    );
  });

  it("update trade info other cid", async () => {
    instance = await Trade.deployed();
    returnVal = await instance.isWhitelisted(accounts[1]);
    assert.equal(returnVal, false, "content logic fail");
    tradeInfo = {
      cid: 1,
      price: 100,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    await truffleAssert.reverts(
      instance.updateTradeInfo(
        tradeInfo.cid,
        tradeInfo.price,
        tradeInfo.ratio,
        tradeInfo.limitSupply,
        tradeInfo.publish,
        {
          from: accounts[1]
        }
      )
      ,
      "ERC721: owner query for nonexistent token -- Reason given: ERC721: owner query for nonexistent token."
    );
  });

  it("update trade info over flow ratio", async () => {

    instance = await Trade.deployed();
    returnVal = await instance.isWhitelisted(accounts[1]);
    assert.equal(returnVal, false, "content logic fail");
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 200,
      limitSupply: 10,
      publish: false
    };

    await truffleAssert.reverts(
      instance.updateTradeInfo(
        tradeInfo.cid,
        tradeInfo.price,
        tradeInfo.ratio,
        tradeInfo.limitSupply,
        tradeInfo.publish,
        {
          from: accounts[1]
        }
      )
      ,
      "ratio overflow"
    );
  });
  it("update trade info limitSupply fail", async () => {
    instance = await Trade.deployed();
    returnVal = await instance.isWhitelisted(accounts[1]);
    assert.equal(returnVal, false, "content logic fail");
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 50,
      limitSupply: 0,
      publish: false
    };

    await truffleAssert.reverts(
      instance.updateTradeInfo(
        tradeInfo.cid,
        tradeInfo.price,
        tradeInfo.ratio,
        tradeInfo.limitSupply,
        tradeInfo.publish
      )
      ,
      "limit supply must be over 0"
    );
  });
});
