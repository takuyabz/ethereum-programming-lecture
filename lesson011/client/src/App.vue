<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>

import Web3 from "web3";
import TruffleContract from "truffle-contract";
import Artifacts from "./assets/contracts/Hello.json";


export default {
  name: 'app',
  data () {
    return {
      msg: "Say from Solidity!"
    }
  },
  async mounted() {
    console.log(Web3);
    let provider = new Web3.providers.HttpProvider("http://localhost:7545");
    let web3 = new Web3(provider);
    let accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log(Artifacts);
    console.log(TruffleContract);
    let abs = await TruffleContract(Artifacts);
    abs.setProvider(provider);
    let network = Object.keys(Artifacts.networks)[0];
    console.log(network);
    let address = Artifacts.networks[network].address;
    console.log(address);
    let hello = await abs.at(address);
    this.msg = await hello.sayHello();
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
