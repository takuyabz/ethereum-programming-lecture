const Article = artifacts.require("Article");
const truffleAssert = require("truffle-assertions");

contract("Article", async accounts => {
  it("greeting", async() => {
    instance = await Article.deployed();
    message = await instance.greetArticle();
    assert.equal(message, "Hello Article", "woops greet false");
  });

  it("addContent", async() => {
    instance = await Article.deployed();
    key = 1;
    hexKey = web3.utils.utf8ToHex(String(key));
    assert.equal(hexKey, "0x31", "key gen fail");

    count = await instance.getContentCount();
    assert.equal(count, 0, "add content initialize fail");

    await instance.addContent(
      hexKey,
      "title",
      "description",
      "https://example.com/",
    );

    count = await instance.getContentCount();
    assert.equal(count, 1, "add content fail");
    
  });

  it("updateContent", async() => {
    instance = await Article.deployed();
    key = 1;
    hexKey = web3.utils.utf8ToHex(String(key));
    assert.equal(hexKey, "0x31", "key gen fail");

    count = await instance.getContentCount();
    assert.equal(count, 1, "add content initialize fail");

    resultKey = await instance.getContentAtIndex(0);
    assert.equal(web3.utils.hexToUtf8(resultKey), key, "returns key fail");

    result = await instance.getContent(resultKey);
    assert.equal(result[0],"title","title fail");
    assert.equal(result[1],"description","description fail");
    assert.equal(result[2],"https://example.com/", "imgsrc fail");
    timestamp = (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp;
    assert.equal(timestamp, web3.utils.hexToNumber(result[3]));

    await instance.updateContent(
      hexKey,
      "title2",
      "description2",
      "https://example.com/2",
    );

    count = await instance.getContentCount();
    assert.equal(count, 1, "update content fail");

    resultKey = await instance.getContentAtIndex(0);
    assert.equal(web3.utils.hexToUtf8(resultKey), key, "returns key fail");

    result = await instance.getContent(resultKey);
    assert.equal(result[0],"title2","update title fail");
    assert.equal(result[1],"description2","update description fail");
    assert.equal(result[2],"https://example.com/2", "update imgsrc fail");

    timestamp2 = (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp;
    assert.equal(timestamp, web3.utils.hexToNumber(result[3]));
    assert.equal(timestamp2, web3.utils.hexToNumber(result[4]));
  });

  it("delete Content", async () => {
    instance = await Article.deployed();
    key = 1;
    hexKey = web3.utils.utf8ToHex(String(key));
    assert.equal(hexKey, "0x31", "key gen fail");

    count = await instance.getContentCount();
    assert.equal(count, 1, "add content initialize fail");

    instance.deleteContent(hexKey);

    count = await instance.getContentCount();
    assert.equal(count, 0, "add content initialize fail");

  });

  it("operation", async() =>{
    params = {
      contents: [
        {
          title : "title1",
          description :"descriptin1",
          imgsrc: "https://example.com/1.png"
        },
        {
          title : "title2",
          description: "description2",
          imgsrc: "https://example.com/2.png"
        }
      ]
    };

    instance = await Article.deployed();

    await params.contents.forEach(async (content, i) => {
      await instance.addContent(
        web3.utils.utf8ToHex(String(i)),
        content.title,
        content.description,
        content.imgsrc
      );
    })

    count = await instance.getContentCount();

    for (i = 0; i < count; i++) {
      key = await instance.getContentAtIndex(i);
      content = await instance.getContent(key);
      assert.equal(content.title, params.contents[i].title, `title ${i} fail`);
      assert.equal(content.description, params.contents[i].description, `description ${i} fail`);
      assert.equal(content.imgsrc, params.contents[i].imgsrc, `imgsrc ${i} fail`);
    }
  });
});

// // const Web3 = require("web3");
// // const TruffleContract = require("truffle-contract");
// // const Whitelist = artifacts.require("./Whitelist.sol");
// // const web3 = new Web3("http://localhost:9545");
// // const artifact = TruffleContract(Whitelist);
// // artifact.setProvider(web3.currentProvider);
// // async function test() {
// //   const instance = await artifact.deployed();
// //   const message = await instance.greeting();
// //   return Promise.resolve(message);
// // }
