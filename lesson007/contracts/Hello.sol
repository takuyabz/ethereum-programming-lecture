pragma solidity ^0.5.0;

contract Hello {
  string message;
  constructor() public {
    message = "hello";
  }

  function setMessage(string memory _message) public {
    message = _message;
  }

  function getMessage() public view returns(string memory) {
    return message;
  }

  function sayHello() public pure returns(string memory) {
    return "おはようございます。";
  }

}

