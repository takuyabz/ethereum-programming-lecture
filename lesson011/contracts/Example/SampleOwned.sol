pragma solidity ^0.5.0;

contract SampleOwned {
  constructor () public {
    owner = msg.sender;
  }
  address owner;
  modifier onlyOwner {
    require(msg.sender == owner, "only owner");
    _;
  }

  function greet() public pure returns(string memory){
    return "Hello Owned";
  }
}
