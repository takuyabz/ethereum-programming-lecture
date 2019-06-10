const Article = artifacts.require("Article");
const truffleAssert = require("truffle-assertions");

contract("Article", async accounts => {
  it("whitelisted", async () => {
    instance = await Article.deployed();
    returnVal = await instance.isWhitelisted(accounts[0]);
    assert.equal(returnVal, false, "whitelisted logic fail");
    await instance.addWhitelisted(accounts[0]);
    returnVal = await instance.isWhitelisted(accounts[0]);
    assert.equal(returnVal, true, "whitelisted logic fail");
  });

  it("create Content", async () => {
    instance = await Article.deployed();
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
    assert.equal(returnVal, 1, "content logic fail");
  });

  it("create Content other Role", async () => {
    instance = await Article.deployed();
    returnVal = await instance.isWhitelisted(accounts[1]);
    assert.equal(returnVal, false, "whitelisted logic fail");

    content = {
      title: "Hello",
      description: "World",
      imgsrc: "https://example.com/sample.png"
    };

    await truffleAssert.reverts(
      instance.createContent(
        content.title,
        content.description,
        content.imgsrc,
        {
          from: accounts[1]
        }
      ),
      "WhitelistedRole: caller does not have the Whitelisted role -- Reason given: WhitelistedRole: caller does not have the Whitelisted role."
    );
  });

  it("update Content", async () => {
    returnVal = await instance.count();
    assert.equal(returnVal, 1, "content logic fail");
    cid = 0;

    content = {
      title: "Hello2",
      description: "World2",
      imgsrc: "https://example.com/sample2.png"
    };

    await instance.updateContent(
      cid,
      content.title,
      content.description,
      content.imgsrc
    );

    returnVal = await instance.count();
    assert.equal(returnVal, 1, "content logic fail");

  });

  it("update Content overflow", async () => {
    returnVal = await instance.count();
    assert.equal(returnVal, 1, "content logic fail");
    cid = 1;

    content = {
      title: "Hello2",
      description: "World2",
      imgsrc: "https://example.com/sample2.png"
    };

    await truffleAssert.reverts(
      instance.updateContent(
        cid,
        content.title,
        content.description,
        content.imgsrc
      ),
      "ERC721: owner query for nonexistent token -- Reason given: ERC721: owner query for nonexistent token."
    );

    returnVal = await instance.count();
    assert.equal(returnVal, 1, "content logic fail");
  });
});
