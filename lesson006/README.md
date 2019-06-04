# Tutorial

## Setup Ganache

please install & running ganache

https://truffleframework.com/ganache

- STEP.01 Run Ganache
- STEP.02 NEW WORKSPACE
- STEP.03 WORKSPACE NAME = todo
- STEP.04 ADD PROJECT -> TRUFFLE PROJECTS = truffle-config.js
- STEP.05 SAVE WORKSPACE
- STEP.06 CHECK RPC SERVER URI HTTP://127.0.0.1:7545

## Terminal Operation

~~~ bash terminal
truffle init
touch contracts/Todo.sol
code contracts/Todo.sol
touch migrations/Todo.sol
code migrations/Todo.sol
code truffle-config.js
truffle compile
truffle migrate --reset
~~~

Check Ganache GUI, CONTRACTS TAB

Todo is DEPLOYED

## Web3 Localize

download from cdn

~~~ bash terminal
npm init -y
echo "node_modules" > .gitignore
npm i -S express
npm i -D truffle-contract
touch server.js
code server.js
mkdir dist
touch dist/index.html
mkdir dist/vendor
wget -p dist/vendor https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.34/dist/web3.min.js
cp node_module/truffle-contract/dist/lib/truffle-contract.min.js dist/vendor/truffle-contract.js
mkdir dist/js
touch dist/js/index.js
mkdir dist/css
touch dist/css/style.css
code dist/index.html
code dist/css/style.css
node server.js
~~~

browser access.

- Push Message Click
- show Change Text!!

Lesson finish!
