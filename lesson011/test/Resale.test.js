const Resale = artifacts.require("Resale");
const truffleAssert = require("truffle-assertions");

contract("Resale", async accounts => {
  it("setup", async () => {
    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    // STEP. 01 Get Deployed Instance
    instance = await Resale.deployed();
    returnVal = await instance.isWhitelisted(accounts[0]);
    assert.equal(returnVal, false, "whitelisted logic fail");

    // STEP. 02 Add White list from Manager
    await instance.addWhitelisted(accounts[0]);
    returnVal = await instance.isWhitelisted(accounts[0]);
    assert.equal(returnVal, true, "whitelisted logic fail");

    returnVal = await instance.count();
    assert.equal(returnVal, 0, "content logic fail");

    // STEP. 03 Create Content from Author

    await instance.createContent(
      content.title,
      content.description,
      content.imgsrc
    );

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

  it("purchase and history", async () => {
    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    instance = await Resale.deployed();
    returnVal = await instance.getLastTid();
    assert.equal(returnVal, 0, "trade id fail");

    await instance.purchaseTrade(
      tradeInfo.cid,
      {
        from: accounts[1],
        value: tradeInfo.price
      }
    );

    returnVal = await instance.getLastTid();
    assert.equal(returnVal, 1, "trade id fail");

    tradeLog = await instance.getLogTrade(0);

    assert.equal(tradeLog.cid, 0, "trade log cid fail");
    assert.equal(tradeLog.owner, accounts[0], "trade log owner fail");
    assert.equal(tradeLog.purchaser, accounts[1], "trade log purchaser fail");

  });

  it("resale update info", async () => {
    const BN = web3.utils.BN;
    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    resaleInfo = {
      tid: 0,
      price: 1000,
      limitSupply: 10,
      publish : false
    }

    instance = await Resale.deployed();

    tradeLog = await instance.getLogTrade(resaleInfo.tid);

    await instance.updateResaleInfo(
      resaleInfo.tid, 
      resaleInfo.price, 
      resaleInfo.limitSupply, 
      resaleInfo.publish,
      {
        from: accounts[1]
      }
    );

    returnVal = await instance.getResaleInfo(resaleInfo.tid);

    assert.equal(returnVal.owner, tradeLog.owner, "get Resale Info owner fail");
    assert.equal(returnVal.seller, tradeLog.purchaser, "get Resale Info purchaser fail");
    assert.equal(new BN(returnVal.cid).toString(), new BN(tradeLog.cid).toString(), "get Resale Info cid fail");
    assert.equal(returnVal.price, resaleInfo.price, "get Resale Info price fail");
    assert.equal(returnVal.limitSupply, resaleInfo.limitSupply, "get Resale Info limitSupply fail");
    assert.equal(returnVal.totalSupply, 0, "get Resale Info total supply fail");
    assert.equal(returnVal.publish, resaleInfo.publish, "get Resale Info publish fail");

  });

  it("resale update info with other account", async () => {

    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    resaleInfo = {
      tid: 0,
      price: 1000,
      limitSupply: 10,
      publish : false
    }

    instance = await Resale.deployed();

    tradeLog = await instance.getLogTrade(resaleInfo.tid);

    await truffleAssert.reverts(
      instance.updateResaleInfo(
        resaleInfo.tid, 
        resaleInfo.price, 
        resaleInfo.limitSupply, 
        resaleInfo.publish,
        {
          from: accounts[0]
        }
      )
      ,
      "must be update resale info purchaser"
    );
  });

  it("resale update info other trade id", async() => {

    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    resaleInfo = {
      tid: 0,
      price: 1000,
      limitSupply: 10,
      publish : false
    }

    instance = await Resale.deployed();

    tradeLog = await instance.getLogTrade(resaleInfo.tid);

    await truffleAssert.reverts(
      instance.updateResaleInfo(
        10, 
        resaleInfo.price, 
        resaleInfo.limitSupply, 
        resaleInfo.publish,
        {
          from: accounts[1]
        }
      )
      ,
      "trade id over flow"
    );
  });

  it("resale update info with price zero", async() => {

    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    resaleInfo = {
      tid: 0,
      price: 0,
      limitSupply: 10,
      publish : false
    }

    instance = await Resale.deployed();

    tradeLog = await instance.getLogTrade(resaleInfo.tid);

    await truffleAssert.reverts(
      instance.updateResaleInfo(
        resaleInfo.tid, 
        resaleInfo.price, 
        resaleInfo.limitSupply, 
        resaleInfo.publish,
        {
          from: accounts[1]
        }
      )
      ,
      "price resale must be over zero"
    );
  });

  it("get resale content without purchase", async()=>{

    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 10,
      publish: false
    };

    resaleInfo = {
      tid: 0,
      price: 0,
      limitSupply: 10,
      publish : false
    }

    instance = await Resale.deployed();

    truffleAssert.reverts(
      instance.getResaleContent(resaleInfo.tid)
      ,
      "not signed, please resale updateInfo"
    );
  });

});
