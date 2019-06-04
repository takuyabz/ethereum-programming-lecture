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
      artifact = await artifacts.json();
      abs = new TruffleContract(artifact);
      abs.setProvider(web3Provider);
      network = Object.keys(artifact.networks)[0];
      address = artifact.networks[network].address;
      todo = await abs.at(address);
      var greetingElm = document.getElementById("greeting");
      greetingElm.innerText = await todo.getGreeting();
      var actionElm = document.getElementById("action");
      actionElm.addEventListener("click",async function(){
        await todo.setGreeting((new Date()).toString(), {from: accounts[0]});
        greetingElm.innerText = await todo.getGreeting();
      })
      console.log(address);
      console.log(network);
      console.log(await web3.eth.getAccounts())
    }
  })();
}