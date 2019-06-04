# Tutorial

please node.js install
https://nodejs.org/ja/download/


~~~ bash Step1 Setup Env & start ganache-cli
node -v
npm -v
npm install -g truffle
truffle version
npm install -g ganache-cli
ganache-cli --version
ganacha-cli
~~~

~~~ Result Output
👍 >node -v
v10.16.0

 fixer: ~/dev/lectures/20190604/t4/lesson001 [git:master] 
👍 >npm -v
6.9.0

👍 >truffle version
Truffle v5.0.20 (core: 5.0.20)
Solidity v0.5.0 (solc-js)
Node v10.16.0
Web3.js v1.0.0-beta.37

👍 >ganache-cli --version
Ganache CLI v6.4.3 (ganache-core: 2.5.5)
~~~

please Install VS Code
https://azure.microsoft.com/ja-jp/products/visual-studio-code/

please Check User Guid
https://code.visualstudio.com/docs/getstarted/tips-and-tricks 

## Checkpoint
- CLI Interface
  - code .
  - code directory/file
- Extensions
  - Auto Close Tag
  - Auto Rename Tag
  - Bracker Pair Colozier
  - Indent-Rainbow
  - Material Icon Theme
  - Material Theme
  - npm Intelisense
  - Path Intelisense
  - solidity
  - Terminal
  - Terminal Tabs
  - Vetur
  - Visual Studio InteliCode
  - vue
  - Vue 2 Snippets
  - Vue Snippets(vue-ls)
  - Vue VSCode Snippets
  - vue-beautify
  - vue-format
  - WakaTime

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
