pragma solidity ^0.5.0;

contract Todo {
  string[] tasks;
  event TaskEvent(string description);

  function addTask(string memory taskName) public {
    tasks.push(taskName);
  }

  function getTask(uint i) public view returns(string memory) {
    return tasks[i];
  }

}