pragma solidity ^0.5.0;

contract Lesson {
  string level;
  constructor (string memory _level) public {
    level = _level;
  }
  function getLevel() public view returns(string memory) {
    return level;
  }
}