# Tutorial

~~~ bash terminal
truffle init
touch contracts/Lesson.sol
code contracts/Lesson.sol
touch migrations/2_deploy.js
code migrations/2_deploy.js
truffle compile
truffle migrate
truffle console
~~~

~~~ bash truffle console
accounts = await web3.eth.getAccounts()
accounts[0]
contract = await Lesson.deployed()
contract.getLevel.call()
~~~

~~~ Result
truffle(ganache)> contract.getLevel.call()
'this is lesson002'
~~~

Lesson Finish!
