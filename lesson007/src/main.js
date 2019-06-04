import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import artifacts from '../build/contracts/Hello.json';
import $ from "jquery";

$(document).ready(async () => {
  let provider = new Web3.providers.HttpProvider("http://localhost:7545");
  let web3 = new Web3(provider);
  let accounts = await web3.eth.getAccounts();
  let abs = new TruffleContract(artifacts);
  abs.setProvider(provider);

  let network = Object.keys(artifacts.networks)[0];
  let address = artifacts.networks[network].address;
  let hello = await abs.at(address);
  $("#msg").text(await hello.sayHello());
  await hello.setMessage((new Date()).toString(), {from: accounts[0]});
  $("#msg").text(await hello.getMessage());
});
