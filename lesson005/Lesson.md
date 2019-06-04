# Tutorial

~~~ bash terminal
truffle init
touch contracts/Todo.sol
code contracts/Todo.sol
touch migrations/2_deploy.js
code migrations/2_deploy.js
truffle compile
truffle migrate
truffle console
~~~

~~~ bash truffle console
accounts = await web3.eth.getAccounts()
contract = await Todo.deployed()
contract.createTask("this is title", "this is description", "tech fixer");
contract.createTask("this is title2", "this is description2", "tech fixer");
contract.getTaskIds();
contract.getTask(1);
contract.getTask(2);
~~~

~~~ Result
truffle(ganache)> contract.getTaskIds();
[ <BN: 1>, <BN: 2> ]
truffle(ganache)> contract.getTask(1);
Result {
  '0': <BN: 1>,
  '1': <BN: 5cf647d4>,
  '2': 'this is title',
  '3': 'this is description',
  '4': 'tech fixer',
  '5': false }
truffle(ganache)> contract.getTask(2);
Result {
  '0': <BN: 2>,
  '1': <BN: 5cf647d8>,
  '2': 'this is title2',
  '3': 'this is description2',
  '4': 'tech fixer',
  '5': false }
~~~

Lesson finish!

