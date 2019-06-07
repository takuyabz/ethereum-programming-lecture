const Whitelist = artifacts.require("Whitelist");
const truffleAssert = require("truffle-assertions");

contract("Whitelist", async accounts => {
  it("greeting", async () => {
    message = await instance.greeting();
    assert.equal(message, "Hello Whitelist");
  });

  it("getAuthor Index 0", async() => {
    instance = await Whitelist.deployed();
    await truffleAssert.reverts(instance.getAuthor(0), "index mismatch");
  });

  it("getAuthor Index overflow", async() => {
    instance = await Whitelist.deployed();
    await truffleAssert.reverts(instance.getAuthor(1), "index overflow");
  });

  it("getLastIndex", async() => {
    instance = await Whitelist.deployed();
    result = await instance.getLastIndex();
    assert.equal(result, 0, "last index is not zero");
  });

  it("isAuthor", async() => {
    instance = await Whitelist.deployed();
    await truffleAssert.reverts(instance.isAuthor(accounts[0]), "author address not exist");
  });

  it("addAuthor", async() => {
    instance = await Whitelist.deployed();
    result = await instance.getLastIndex();
    assert.equal(result, 0, "last index is not zero");
    await instance.addAuthor(accounts[0], {from: accounts[0]});
    result = await instance.getLastIndex();
    assert.equal(result, 1, "last index is not one");
    result = await instance.isAuthor(accounts[0]);
    assert.equal(result, true, "error addAuthor logic");
  });

  it("isNotAuthor", async() => {
    instance = await Whitelist.deployed();
    await truffleAssert.reverts(instance.isAuthor(accounts[1]), "author address not exist");
  });

  it("only AddAuthor", async() => {
    instance = await Whitelist.deployed();
    await truffleAssert.reverts(instance.addAuthor(accounts[1],{from: accounts[1]}), "only owner");
  });

  it("OPS Test", async() => {
    instance = await Whitelist.deployed();
    await instance.addAuthor(accounts[1], {from: accounts[0]});
    result = await instance.isAuthor(accounts[1]);
    assert.equal(result, true, "account is not author");
  });

  it("Update Author Publish", async() => {
    instance = await Whitelist.deployed();
    await instance.updatePublish(accounts[0], false);
    result = await instance.isAuthor(accounts[0]);
    assert.equal(result ,false, "accounts update publish error change false");

    await instance.updatePublish(accounts[0], true);
    result = await instance.isAuthor(accounts[1]);
    assert.equal(result, true, "account update publish error change true");
  });
});

// const Web3 = require("web3");
// const TruffleContract = require("truffle-contract");
// const Whitelist = artifacts.require("./Whitelist.sol");
// const web3 = new Web3("http://localhost:9545");
// const artifact = TruffleContract(Whitelist);
// artifact.setProvider(web3.currentProvider);
// async function test() {
//   const instance = await artifact.deployed();
//   const message = await instance.greeting();
//   return Promise.resolve(message);
// }
