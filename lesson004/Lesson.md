# Tutorial

~~~ bash terminal
mkdir lesson004
cd lesson004
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
contract.createTask("this is title", "this is description", "tech fixer")
contract.getTask(0)
~~~

~~~ Result
truffle(ganache)> contract.getTask(0)
Result {
  '0': <BN: 0>,
  '1': <BN: 5cf637c9>,
  '2': 'this is title',
  '3': 'this is description',
  '4': 'tech fixer',
  '5': false }
~~~

Lesson finish!




