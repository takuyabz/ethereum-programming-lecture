pragma solidity ^0.5.0;

contract Todo {

  string greeting;

  struct Task {
    uint id;
    uint date;
    string title;
    string description;
    string author;
    bool done;
  }

  uint lastTaskId;
  uint[] taskIds;
  mapping(uint => Task) tasks;

  event TaskCreated(uint, uint, string, string, string, bool);

  constructor () public {
    lastTaskId = 0;
    greeting = "Hello SmartContract";
  }

  function createTask(string memory _title, string memory _description, string memory _author) public {
    lastTaskId++;
    tasks[lastTaskId] = Task(lastTaskId, block.timestamp, _title, _description, _author, false);
    taskIds.push(lastTaskId);
    emit TaskCreated(lastTaskId, block.timestamp, _title, _description, _author, false);
  }

  function getTaskIds() public view returns(uint[] memory) {
    return taskIds;
  }

  function setGreeting(string memory message) public {
    greeting = message;
  }

  function getGreeting() public view returns(string memory) {
    return greeting;
  }

  function getTask(uint id) public taskExists(id) view returns(
    uint,
    uint,
    string memory,
    string memory,
    string memory,
    bool
  ) {
    return (
      id,
      tasks[id].date,
      tasks[id].title,
      tasks[id].description,
      tasks[id].author,
      tasks[id].done
    );
  }

  modifier taskExists(uint id) {
    require(tasks[id].id != 0, "no task");
    _;
  }
}