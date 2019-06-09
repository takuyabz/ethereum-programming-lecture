pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/access/roles/WhitelistedRole.sol";
import "openzeppelin-solidity/contracts/access/roles/WhitelistAdminRole.sol";
import "openzeppelin-solidity/contracts/access/Roles.sol";

contract Article is  ERC721Full, WhitelistedRole {
  constructor() public ERC721Full("Aire Voice Article", "AIA") {
  }

  struct ContentStruct {
    string title;
    string description;
    string imgsrc;
    string uri;
  }

  ContentStruct[] private contents;

  function createContent(
    string calldata title, 
    string calldata description, 
    string calldata imgsrc
  ) 
    external 
    onlyWhitelisted 
  {
    ContentStruct memory content;
    content.title = title;
    content.description = description;
    content.imgsrc = imgsrc;
    uint256 cid = contents.push(content) -1;
    _mint(msg.sender, cid);
  }

  function updateContent(
    uint256 cid, 
    string calldata title, 
    string calldata description, 
    string calldata imgsrc
  ) 
    external 
    onlyWhitelisted 
  {
    require(ownerOf(cid) == msg.sender);
    ContentStruct storage content = contents[cid];
    content.title = title;
    content.description = description;
    content.imgsrc = imgsrc;
  }

  function _getContent(
    uint256 cid
  ) 
    internal 
    view 
    returns(
      uint256, 
      string memory, 
      string memory, 
      string memory, 
      address
    ) 
  {
    require(_exists(cid));
    ContentStruct memory content = contents[cid];
    return (cid, content.title, content.description, content.imgsrc, ownerOf(cid));
  }

  function count() public view returns(uint256){
    return super.totalSupply();
  }

  function addWhitelisted(address account) public onlyWhitelistAdmin {
    super.addWhitelisted(account);
  }

  function isWhitelisted(address account) public view returns(bool) {
    return super.isWhitelisted(account);
  }
}
