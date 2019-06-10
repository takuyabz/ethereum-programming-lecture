const ResaleHistory = artifacts.require("ResaleHistory");
const truffleAssert = require("truffle-assertions");

contract("ResaleHistory", async accounts => {
  it("setup", async () => {
    // STEP. 01 Get Deployed Instance
    instance = await ResaleHistory.deployed();
    returnVal = await instance.isWhitelisted(accounts[0]);
    assert.equal(returnVal, false, "whitelisted logic fail");

    // STEP. 02 Add White list from Manager
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

    // STEP. 03 Create Content from Author

    await instance.createContent(
      content.title,
      content.description,
      content.imgsrc
    );

    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    // STEP. 04 Update Trade Info from Author

    await instance.updateTradeInfo(
      tradeInfo.cid,
      tradeInfo.price,
      tradeInfo.ratio,
      tradeInfo.limitSupply,
      tradeInfo.publish
    );

    returnVal = await instance.isWhitelisted(accounts[0]);
    assert.equal(returnVal, true, "content logic fail");

    returnVal = await instance.getTradeInfo(tradeInfo.cid);

    assert.equal(returnVal.price, tradeInfo.price, "trade info logic fail price");
    assert.equal(returnVal.ratio, tradeInfo.ratio, "trade info logic fail ratio");
    assert.equal(returnVal.limitSupply, tradeInfo.limitSupply, "trade info logic fail limitSupply");
    assert.equal(returnVal.publish, tradeInfo.publish, "trade info logic fail publish");

  });

  it("trade log overflow", async () => {
    instance = await ResaleHistory.deployed();
    await truffleAssert.reverts(
      instance.getLogResale(0)
      ,
      "trade id over flow"
    );
  });

  it("trade last index", async () => {
    instance = await ResaleHistory.deployed();
    returnVal = await instance.getLastRid();
    assert.equal(returnVal, 0, "last index fail");
  });

});
