pragma solidity ^0.5.0;

contract Todo {
  struct Task {
    uint id;
    uint date;
    string title;
    string description;
    string author;
    bool done;
  }

  Task[] tasks;

  function createTask(string memory _title, string memory _description, string memory _author) public {
    tasks.push(Task(tasks.length,block.timestamp, _title, _description, _author, false));
  }

  function getTask(uint id) public view returns(
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
}