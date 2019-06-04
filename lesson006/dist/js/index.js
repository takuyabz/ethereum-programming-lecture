window.onload =() => {
  (async()=>{
    var web3Provider = null;
    var web3 = null;
    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch (error) {}
    } else if (window.Web3) {
      web3 = new Web3("http://localhost:7545");
      web3Provider = web3.currentProvider;
    } 
    if (web3Provider) {
      web3 = new Web3(web3Provider);
      var accounts = await web3.eth.getAccounts();
      artifacts = await fetch("Todo.json");
      json = await artifacts.json();
      console.log(json.abi);
      var Todo = TruffleContract(json);
      Todo.setProvider(web3Provider);
      var instance = await Todo.deployed();
      var greetingElm = document.getElementById("greeting");
      greetingElm.innerText = await instance.getGreeting();
      var actionElm = document.getElementById("action");
      actionElm.addEventListener("click",async function(){
        await instance.setGreeting("Change Text!!", {from: accounts[0]});
        greetingElm.innerText = await instance.getGreeting();
      })
    }
  })();
}