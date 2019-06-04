# Tutorial

integrate webpack & jquery & web3 !!

~~~ bash terminal
truffle init
touch contracts/Hello.sol
code contracts/Hello.sol
touch migrations/2_deploy.js
code migrations/2_deploy.js
truffle compile
truffle migrate
truffle console
~~~

~~~ bash truffle console
accounts = web3.eth.getAccounts()
instance = Hello.deployed()
instance.sayHello()
~~~

~~~ bash terminal
npm init -y
npm i -S express
touch server.js
code server.js
mkdir dist
touch dist/index.html
code dist/index.html
npm run dev-back
~~~

browser access
http://localhost:7002/

~~~ bash terminal
npm i -D babel-core babel-loader@7 babel-preset-env webpack webpack-cli babel-polyfill
npm install -g nodemon
code package.json
mkdir src
touch src/main.js
mkdir dist/js
touch webpack.config.js
touch .babelrc
code .babelrc
npm run dev-front
~~~

check src/main.js

1. console.log("hello1");
2. save
3. browser refresh
4. console.log("hello2");
5. save
6. browser refresh

~~~ bash terminal
npm i -D web3@1.0.0-beta.37 truffle-contract  jquery
code src/main.js

rm -rf node_modules/web3-providers-ws/node_modules/websocket/.git
npm i -D truffle-solidity-loader 
rm -rf node_modules/ethpm-registry/node_modules/websocket/.git
rm -rf node_modules/ganache-core/node_modules/web3-providers-ws/node_modules/websocket/.git
npm i -D json-loader
npm i -D truffle
code truffle-config.js
~~~

~~~ main.js
import $ from "jquery";
console.log($);
~~~

babel ok!

~~~ bash terminal
code main.js
code Hello.sol
truffle compile
truffle migrate
~~~

## Setup Metamask

please install your google chrome extension.

https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja

- STEP.01 Install MetaMask
- STEP.02 Get Started
- STEP.03 Create Wallet
- STEP.04 Agree
- STEP.05 Create Password
- STEP.06 Secret Backup Phrase
- STEP.07 Confirm your Secret Backup Phrase
- STEP.08 All Done
- STEP.09 Setting
- STEP.10 Currency Conversion -> JPY
- STEP.11 Primary Currency -> 法定通貨
- STEP.12 Current Language -> 日本語
- STEP.13 New Netowrk -> http://localhost:7545
- STEP.14 Security & Privacy プライバシーモード -> off
