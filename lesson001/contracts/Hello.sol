pragma solidity ^0.5.0;

contract Hello {
  string message;
  constructor (string memory myMessage) public {
    message = myMessage;
  }
}