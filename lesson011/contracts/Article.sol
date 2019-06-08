pragma solidity ^0.5.0;

import "./Whitelist.sol";
import "./Owned.sol";
import "./KeySetLib.sol";

contract Article is Owned, Whitelist {
  using KeySetLib for KeySetLib.Set;
  KeySetLib.Set contentSet;

  struct ContentStruct {
    string title;
    string description;
    string imgsrc;
    uint256 createdAt;
    uint256 updatedAt;
  }

  mapping(bytes32 => ContentStruct) contents;

  event LogNewContent(
    address sender, 
    bytes32 key, 
    string title, 
    string description, 
    string imgsrc, 
    uint256 createdAt, 
    uint256 updatedAt
  );

  event LogUpdateContent(
    address sender, 
    bytes32 key, 
    string title, 
    string description, 
    string imgsrc, 
    uint256 createdAt, 
    uint256 updatedAt
  );

  event LogDeleteContent(
    address sender, 
    bytes32 key
  );

  function addContent(
    bytes32 key, 
    string memory title, 
    string memory description, 
    string memory imgsrc
  ) 
    public 
  {
    contentSet.insert(key);
    ContentStruct storage c = contents[key];
    c.title = title;
    c.description = description;
    c.imgsrc = imgsrc;
    c.createdAt = block.timestamp;
    c.updatedAt = 0;
    emit LogNewContent(msg.sender, key, c.title, c.description, c.imgsrc, c.createdAt, c.updatedAt);
  }

  function updateContent(
    bytes32 key, 
    string memory title, 
    string memory description, 
    string memory imgsrc
  ) 
    public 
  {
    require(contentSet.exists(key), "can not update a content that doesn't exist");
    ContentStruct storage c = contents[key];
    c.title = title;
    c.description = description;
    c.imgsrc = imgsrc;
    c.updatedAt = block.timestamp;
    emit LogUpdateContent(msg.sender, key, c.title, c.description, c.imgsrc, c.createdAt, c.updatedAt);
  }

  function deleteContent(
    bytes32 key
  ) 
    public 
  {
    contentSet.remove(key);
    delete contents[key];
    emit LogDeleteContent(msg.sender, key);
  }

  modifier contentExist(
    bytes32 key
  ) 
  {
    require(contentSet.exists(key), "cant get a content that doesn't exist.");
    _;
  }

  function getContent(
    bytes32 key
  ) 
    public 
    view 
    contentExist(key)
    returns(
      string memory title, 
      string memory description, 
      string memory imgsrc, 
      uint createdAt, 
      uint updatedAt
    ) 
  {
    ContentStruct storage c = contents[key];
    return(c.title, c.description, c.imgsrc, c.createdAt, c.updatedAt);
  }

  function getContentCount() 
    public 
    view 
    returns(
      uint count
    ) 
  {
    return contentSet.count();
  }

  function getContentAtIndex(
    uint index
  ) 
    public 
    view 
    returns(
      bytes32 key
    ) 
  {
    return contentSet.keyAtIndex(index);
  }

  function greetArticle() 
    public 
    pure 
    returns(
      string memory
    ) 
  {
    return "Hello Article";
  }

}
