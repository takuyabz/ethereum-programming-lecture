# Tutorial

Vue.js + Webpack + Truffle = Wow!

~~~ bash terminal
mkdir lesson008
cd lesson008
truffle init
truffle compile
truffle migrate --reset
~~~

~~~ bash terminal
vue init webpack-simple client
cd client
npm install
npm uninstall webpack-dev-server
npm i -D webpack-dev-server
npm i -D webpack-cli 
npm run dev
code src App.vue
rm -rf node_modules/websocket/.git
npm i -D babel-polyfill
npm i -D babel-plugin-transform-regenerator
code .babelrc
code webpack.config.js
npm i -D web3@1.0.0-beta.37
code src App.vue
npm i -D json-loader
npm i -D truffle
npm i -D truffle-solidity-loader
code webpack.config.js
code package.json
cd ..
touch contracts/Hello.sol
code contracts/Hello.sol
truffle compile
touch migrations/2_deploy.js
code migrations/2_deploy.js
truffle migrate
cd client
ln -s `pwd`/../build/contracts src/assets
cd client
npm i -D truffle-contract
code src/App.vue
npm run dev
npm run build
lite-server
rm -rf node_modules/ganache-core/node_modules/web3-providers-ws/node_modules/websocket/.git
npm i -D uglifyjs-webpack-plugin@1
code webpack.config.js
npm run publish
http-server
npm un webpack-dev-server
npm i -D webpack-dev-server
npm i -D vue-loader@14.2.2
~~~
