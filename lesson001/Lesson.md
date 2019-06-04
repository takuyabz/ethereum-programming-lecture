# Tutorial

please node.js install
https://nodejs.org/ja/download/

~~~ bash Step1 Setup Env & start ganache-cli
node -v
npm -v
npm install -g truffle
npm install -g ganache-cli
ganacha-cli
~~~

~~~ bash Step2 Truffle init
mkdir lesson001
cd lesson001
truffle init
touch contracts/Hello.sol
code contracts/Hello.sol
truffle compile
touch migrations/2_deploy.js
code migrations/2_deploy.js
truffle migrate
~~~

This Lesson Finish!
