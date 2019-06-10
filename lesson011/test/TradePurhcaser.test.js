const TradePurchaser = artifacts.require("TradePurchaser");
const truffleAssert = require("truffle-assertions");

contract("TradePurchaser", async accounts => {
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
  
    // STEP. 01 Get Deployed Instance
    instance = await TradePurchaser.deployed();
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

  it("purchase Trade price fail", async () => {
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
  
    instance = await TradePurchaser.deployed();
    await truffleAssert.reverts(
      instance.purchaseTrade(
        tradeInfo.cid,
        {
          from: accounts[1]
        }
      )
      ,
      "trade price error"
    );
  });

  it("price calculation sample", async () => {
    const BN = web3.utils.BN;
    returnVal = web3.utils.fromWei(new BN('1'), 'ether');
    assert.equal(returnVal, "0.000000000000000001", "Big Number To Eth fail");

    returnVal = web3.utils.fromWei(new BN('1').add(new BN('1')).toString(), 'ether');
    assert.equal(returnVal, "0.000000000000000002", "Add Big Number To Eth fail");

    returnVal = web3.utils.fromWei(new BN('1').sub(new BN('1')).toString(), 'ether');
    assert.equal(returnVal, "0", "Sub Anser Zero Big Number To Eth fail");

    returnVal = web3.utils.fromWei(new BN('2').sub(new BN('1')).toString(), 'ether');
    assert.equal(returnVal, "0.000000000000000001", "Sub Big Number To Eth fail");
  });

  it("purchase Trade", async () => {
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
  
    const BN = web3.utils.BN;
    balanceBeforeTransferTo = await web3.eth.getBalance(accounts[0]);

    instance = await TradePurchaser.deployed();

    returnVal = await instance.countTradePurchased(
      {
        from: accounts[1]
      }
    );
    assert.equal(new BN(returnVal).toString(), new BN('0').toString(), "purchased logic fail");

    await instance.purchaseTrade(
      tradeInfo.cid,
      {
        from: accounts[1],
        value: tradeInfo.price
      }
    );
    balanceAfterTransferTo = await web3.eth.getBalance(accounts[0]);

    assert.equal(
      new BN(balanceAfterTransferTo).
        sub(new BN(balanceBeforeTransferTo)).
        toString(),
      tradeInfo.price,
      "transfer eth"
    );

    returnVal = await instance.countTradePurchased(
      {
        from: accounts[1]
      }
    );
    assert.equal(new BN(returnVal).toString(), new BN('1').toString(), "purchased logic fail");
  });

  it("trade at index", async () => {
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
  
    const BN = web3.utils.BN;
    instance = await TradePurchaser.deployed();
    returnVal = await instance.countTradePurchased(
      {
        from: accounts[1]
      }
    );
    assert.equal(new BN(returnVal).toString(), new BN('1').toString(), "purchased logic fail");

    returnVal = await instance.tradeAtIndex(0,
      {
        from: accounts[1]
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
  
    const BN = web3.utils.BN;
    instance = await TradePurchaser.deployed();
    returnVal = await instance.countTradePurchased(
      {
        from: accounts[1]
      }
    );
    assert.equal(new BN(returnVal).toString(), new BN('1').toString(), "purchased logic fail");

    truffleAssert.reverts(
      instance.tradeAtIndex(2,
        {
          from: accounts[1]
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
  
    const BN = web3.utils.BN;
    instance = await TradePurchaser.deployed();

    cid = await instance.tradeAtIndex(0,
      {
        from: accounts[1]
      }
    );

    returnVal = await instance.getTradeContent(cid);
    assert.equal(new BN(returnVal[0]).toString(), new BN(content.cid).toString(), "get content cid fail");
    assert.equal(returnVal[1], content.title, "get content title fail");
    assert.equal(returnVal[2], content.description, "get content description fail");
    assert.equal(returnVal[3], content.imgsrc, "get content img src fail");
    assert.equal(returnVal[4], accounts[0], "get content address fail");

    returnVal = await instance.getTradeContent(cid,
      {
        from: accounts[1]
      }
    );
    assert.equal(new BN(returnVal[0]).toString(), new BN(content.cid).toString(), "get content cid fail");
    assert.equal(returnVal[1], content.title, "get content title fail");
    assert.equal(returnVal[2], content.description, "get content description fail");
    assert.equal(returnVal[3], content.imgsrc, "get content img src fail");
    assert.equal(returnVal[4], accounts[0], "get content address fail");

    truffleAssert.reverts(
      instance.getTradeContent(cid,
        {
          from: accounts[2]
        })
      ,
      "not signed, please updateInfo"
    )
  });

  it("purchase Trade limit supply overflow", async () => {
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
  
    balanceBeforeTransferTo = await web3.eth.getBalance(accounts[0]);

    instance = await TradePurchaser.deployed();

    returnVal = await instance.getTradeInfo(tradeInfo.cid);

    assert.equal(returnVal.price, tradeInfo.price, "trade info logic fail price");
    assert.equal(returnVal.ratio, tradeInfo.ratio, "trade info logic fail ratio");
    assert.equal(returnVal.limitSupply, tradeInfo.limitSupply, "trade info logic fail limitSupply");
    assert.equal(returnVal.totalSupply, 1, "trade info logic fail totalSupply");
    assert.equal(returnVal.publish, tradeInfo.publish, "trade info logic fail publish");

    await truffleAssert.reverts(
      instance.purchaseTrade(
        tradeInfo.cid,
        {
          from: accounts[2],
          value: tradeInfo.price
        }
      )
      ,
      "supply overflow"
    );
  });

  
  it("purchase Trade limit supply update", async () => {
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
  
    balanceBeforeTransferTo = await web3.eth.getBalance(accounts[0]);

    instance = await TradePurchaser.deployed();

    returnVal = await instance.getTradeInfo(tradeInfo.cid);

    assert.equal(returnVal.price, tradeInfo.price, "trade info logic fail price");
    assert.equal(returnVal.ratio, tradeInfo.ratio, "trade info logic fail ratio");
    assert.equal(returnVal.limitSupply, tradeInfo.limitSupply, "trade info logic fail limitSupply");
    assert.equal(returnVal.totalSupply, 1, "trade info logic fail totalSupply");
    assert.equal(returnVal.publish, tradeInfo.publish, "trade info logic fail publish");

    await truffleAssert.reverts(
      instance.purchaseTrade(
        tradeInfo.cid,
        {
          from: accounts[2],
          value: tradeInfo.price
        }
      )
      ,
      "supply overflow"
    );

    await instance.updateTradeInfo(
      tradeInfo.cid,
      tradeInfo.price,
      tradeInfo.ratio,
      tradeInfo.limitSupply + 1,
      tradeInfo.publish
    );

    returnVal = await instance.getTradeInfo(tradeInfo.cid);

    assert.equal(returnVal.price, tradeInfo.price, "trade info logic fail price");
    assert.equal(returnVal.ratio, tradeInfo.ratio, "trade info logic fail ratio");
    assert.equal(returnVal.limitSupply, tradeInfo.limitSupply + 1, "trade info logic fail limitSupply ");
    assert.equal(returnVal.totalSupply, 1, "trade info logic fail totalSupply");
    assert.equal(returnVal.publish, tradeInfo.publish, "trade info logic fail publish");

    await instance.purchaseTrade(
      tradeInfo.cid,
      {
        from: accounts[2],
        value: tradeInfo.price
      }
    );

    returnVal = await instance.getTradeInfo(tradeInfo.cid);

    assert.equal(returnVal.price, tradeInfo.price, "trade info logic fail price");
    assert.equal(returnVal.ratio, tradeInfo.ratio, "trade info logic fail ratio");
    assert.equal(returnVal.limitSupply, tradeInfo.limitSupply + 1, "trade info logic fail limitSupply");
    assert.equal(returnVal.totalSupply, 2, "trade info logic fail totalSupply");
    assert.equal(returnVal.publish, tradeInfo.publish, "trade info logic fail publish");

  });

  it("suply exist", async()=>{
    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };
    tradeInfo = {
      cid: 0,
      price: 100,
      ratio: 10,
      limitSupply: 3,
      publish: false
    };
  
    balanceBeforeTransferTo = await web3.eth.getBalance(accounts[0]);

    instance = await TradePurchaser.deployed();

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
    assert.equal(returnVal.totalSupply, 2, "trade info logic fail totalSupply");
    assert.equal(returnVal.publish, tradeInfo.publish, "trade info logic fail publish");

    truffleAssert.reverts(
      instance.purchaseTrade(
        tradeInfo.cid,
        {
          from: accounts[2],
          value: tradeInfo.price
        }
      ),
      "trade exist"
    );
    
  })

});
