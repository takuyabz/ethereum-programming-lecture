const ResalePurchaser = artifacts.require("ResalePurchaser");
const truffleAssert = require("truffle-assertions");

contract("ResalePurchaser", async accounts => {
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
      limitSupply: 1,
      publish: false
    };
    resaleInfo = {
      cid: 0,
      tid: 0,
      price: 1000,
      limitSupply: 1,
    };

    // STEP. 01 Get Deployed Instance
    instance = await ResalePurchaser.deployed();
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

    // STEP. 05 Purchase Trade
    await instance.purchaseTrade(
      tradeInfo.cid,
      {
        from: accounts[1],
        value: tradeInfo.price
      }
    );

    // STEP. 06 Update Resale Info
    await instance.updateResaleInfo(
      resaleInfo.tid,
      resaleInfo.price,
      resaleInfo.limitSupply,
      resaleInfo.publish,
      {
        from: accounts[1]
      }
    )
  });

  it("purchase Resale", async () => {
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
      limitSupply: 1,
      publish: false
    };
    resaleInfo = {
      cid: 0,
      tid: 0,
      price: 1000,
      limitSupply: 1,
    };

    tradeLog = {
      tid: 0
    };
    returnVal = await instance.getLogTrade(tradeLog.tid);
    tradeLog.cid = returnVal.cid;
    tradeLog.owner = returnVal.owner;
    tradeLog.purchaser = returnVal.purchaser;

    returnVal = await instance.countResalePurchased(
      {
        from: accounts[3]
      }
    );
    assert.equal(new BN(returnVal).toString(), new BN('0').toString(), "purchased logic fail");

    balanceBeforeTransferToSeller = await web3.eth.getBalance(tradeLog.purchaser);
    balanceBeforeTransferToOwner = await web3.eth.getBalance(tradeLog.owner);

    instance = await ResalePurchaser.deployed();
    await instance.purchaseResale(
      tradeLog.tid,
      tradeLog.purchaser,
      {
        from: accounts[3],
        value: resaleInfo.price
      }
    );

    balanceAfterTransferToSeller = await web3.eth.getBalance(tradeLog.purchaser);
    balanceAfterTransferToOwner = await web3.eth.getBalance(tradeLog.owner);

    returnVal = await instance.countResalePurchased(
      {
        from: accounts[3]
      }
    );
    assert.equal(new BN(returnVal).toString(), new BN('1').toString(), "purchased logic fail");

    assert.equal(
      new BN(balanceAfterTransferToOwner).
        sub(new BN(balanceBeforeTransferToOwner)).
        toString(),
      resaleInfo.price * (tradeInfo.ratio / 100),
      "transfer owner eth fail"
    );

    assert.equal(
      new BN(balanceAfterTransferToSeller).
        sub(new BN(balanceBeforeTransferToSeller)).
        toString(),
      resaleInfo.price * ((100 - tradeInfo.ratio) / 100),
      "transfer seller  eth fail"
    );

  });

  it("suply exist", async () => {

    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 1,
      publish: false
    };
    tradeLog = {
      tid: 0
    };
    resaleInfo = {
      cid: 0,
      tid: 0,
      price: 1000,
      limitSupply: 1,
      publish: false
    };


    balanceBeforeTransferTo = await web3.eth.getBalance(accounts[0]);

    instance = await ResalePurchaser.deployed();

    await instance.updateResaleInfo(
      resaleInfo.cid,
      resaleInfo.price,
      resaleInfo.limitSupply,
      resaleInfo.publish,
      {
        from: accounts[1]
      }
    );

    returnVal = await instance.getResaleInfo(resaleInfo.cid);

    assert.equal(returnVal.price, resaleInfo.price, "trade info logic fail price");
    assert.equal(returnVal.limitSupply, resaleInfo.limitSupply, "trade info logic fail limitSupply");
    assert.equal(returnVal.totalSupply, 1, "trade info logic fail totalSupply");
    assert.equal(returnVal.publish, resaleInfo.publish, "trade info logic fail publish");

    tradeLog = {
      tid: 0
    };
    returnVal = await instance.getLogTrade(tradeLog.tid);
    tradeLog.cid = returnVal.cid;
    tradeLog.owner = returnVal.owner;
    tradeLog.purchaser = returnVal.purchaser;

    await truffleAssert.reverts(
      instance.purchaseResale(
        tradeLog.tid,
        tradeLog.purchaser,
        {
          from: accounts[3],
          value: resaleInfo.price
        }
      ),
      "resale exist"
    );
  });

  it("purchase Resale limit supply overflow", async () => {
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
      limitSupply: 1,
      publish: false
    };
    tradeLog = {
      tid: 0
    };
    resaleInfo = {
      cid: 0,
      tid: 0,
      price: 1000,
      limitSupply: 1,
    };

    instance = await ResalePurchaser.deployed();

    returnVal = await instance.getLogTrade(tradeLog.tid);
    tradeLog.cid = returnVal.cid;
    tradeLog.owner = returnVal.owner;
    tradeLog.purchaser = returnVal.purchaser;

    await truffleAssert.reverts(
      instance.purchaseResale(
        tradeLog.tid,
        tradeLog.purchaser,
        {
          from: accounts[5],
          value: resaleInfo.price
        }
      )
      ,
      "supply overflow resale"
    );
  });

  it("resale at index", async () => {
    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 1,
      publish: false
    };
    tradeLog = {
      tid: 0
    };
    resaleInfo = {
      cid: 0,
      tid: 0,
      price: 1000,
      limitSupply: 1,
    };

    const BN = web3.utils.BN;
    instance = await ResalePurchaser.deployed();
    returnVal = await instance.countResalePurchased(
      {
        from: accounts[3]
      }
    );
    assert.equal(new BN(returnVal).toString(), new BN('1').toString(), "purchased logic fail");

    returnVal = await instance.resaleAtIndex(0,
      {
        from: accounts[3]
      }
    );
    assert.equal(new BN(returnVal).toString(), new BN('0').toString(), "purchased logic fail");

  });

  it("trade at index over flow", async () => {
    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 1,
      publish: false
    };
    tradeLog = {
      tid: 0
    };
    resaleInfo = {
      cid: 0,
      tid: 0,
      price: 1000,
      limitSupply: 1,
    };


    const BN = web3.utils.BN;
    instance = await ResalePurchaser.deployed();
    returnVal = await instance.countResalePurchased(
      {
        from: accounts[3]
      }
    );
    assert.equal(new BN(returnVal).toString(), new BN('1').toString(), "purchased logic fail");

    await truffleAssert.reverts(
      instance.resaleAtIndex(2,
        {
          from: accounts[3]
        }
      )
      ,
      "index overflow"
    );
  });

  it("view purchase content", async () => {
    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 1,
      publish: false
    };
    tradeLog = {
      tid: 0
    };
    resaleInfo = {
      cid: 0,
      tid: 0,
      price: 1000,
      limitSupply: 1,
    };

    const BN = web3.utils.BN;
    instance = await ResalePurchaser.deployed();

    tid = await instance.resaleAtIndex(0,
      {
        from: accounts[3]
      }
    );

    returnVal = await instance.getResaleContent(tid,
      {
        from: accounts[3]
      }
    );
    assert.equal(new BN(returnVal.cid).toString(), new BN(content.cid).toString(), "get content cid fail");
    assert.equal(returnVal.title, content.title, "get content title fail");
    assert.equal(returnVal.description, content.description, "get content description fail");
    assert.equal(returnVal.imgsrc, content.imgsrc, "get content img src fail");
    assert.equal(returnVal.owner, accounts[0], "get content address fail");

    await truffleAssert.reverts(
      instance.getResaleContent(tid,
        {
          from: accounts[2]
        })
      ,
      "not signed, please resale updateInfo"
    )
  });

  it("purchase Resale limit supply update", async () => {
    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 1,
      publish: false
    };
    tradeLog = {
      tid: 0
    };
    resaleInfo = {
      cid: 0,
      tid: 0,
      price: 1000,
      limitSupply: 1,
      publish: false
    };

    balanceBeforeTransferTo = await web3.eth.getBalance(accounts[0]);

    instance = await ResalePurchaser.deployed();

    returnVal = await instance.getResaleInfo(resaleInfo.cid);

    assert.equal(returnVal.price, resaleInfo.price, "resale info logic fail price");
    assert.equal(returnVal.limitSupply, resaleInfo.limitSupply, "resale info logic fail limitSupply");
    assert.equal(returnVal.totalSupply, 1, "resale info logic fail totalSupply");
    assert.equal(returnVal.publish, resaleInfo.publish, "resale info logic fail publish");


    tradeLog = {
      tid: 0
    };
    returnVal = await instance.getLogTrade(tradeLog.tid);
    tradeLog.cid = returnVal.cid;
    tradeLog.owner = returnVal.owner;
    tradeLog.purchaser = returnVal.purchaser;


    await truffleAssert.reverts(
      instance.purchaseResale(
        tradeLog.tid,
        tradeLog.purchaser,
        {
          from: accounts[5],
          value: resaleInfo.price
        }
      )
      ,
      "supply overflow resale"
    );

    await instance.updateResaleInfo(
      resaleInfo.tid,
      resaleInfo.price,
      resaleInfo.limitSupply + 1,
      resaleInfo.publish,
      {
        from: accounts[1]
      }
    );

    returnVal = await instance.getResaleInfo(resaleInfo.cid);

    assert.equal(returnVal.price, resaleInfo.price, "resale info logic fail price");
    assert.equal(returnVal.limitSupply, resaleInfo.limitSupply + 1, "resale info logic fail limitSupply ");
    assert.equal(returnVal.totalSupply, 1, "resale info logic fail totalSupply");
    assert.equal(returnVal.publish, resaleInfo.publish, "resale info logic fail publish");

    await instance.purchaseResale(
      tradeLog.tid,
      tradeLog.purchaser,
      {
        from: accounts[5],
        value: resaleInfo.price
      }
    );

    returnVal = await instance.getResaleInfo(resaleInfo.cid);

    assert.equal(returnVal.price, resaleInfo.price, "resale info logic fail price");
    assert.equal(returnVal.limitSupply, resaleInfo.limitSupply + 1, "resale info logic fail limitSupply");
    assert.equal(returnVal.totalSupply, 2, "resale info logic fail totalSupply");
    assert.equal(returnVal.publish, resaleInfo.publish, "resale info logic fail publish");
  });

});
