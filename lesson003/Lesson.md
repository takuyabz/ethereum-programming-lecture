# Tutorial

~~~ bash terminal
mkdir lesson003
cd lesson003
truffle init
touch contracts/Todo.sol
code contracts/Todo.sol
touch migrations/2_deploy.js
code migrations/2_deploy.js
truffle compile
truffle migrate --reset
truffle console
~~~

~~~ bash truffle console
accounts = await web3.eth.getAccounts()
contract = await Todo.deployed()
contract.addTask("this is first task")
contract.getTask(0)
event = await contract.callEvent()
event.logs[0].args.description
~~~

~~~ Result
truffle(ganache)> contract.getTask(0)
'this is first task'
truffle(ganache)> event.logs[0].args.description
'call event'
~~~

Lesson Finish!
