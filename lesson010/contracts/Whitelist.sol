pragma solidity ^0.5.0;

import "./Owned.sol";

contract Whitelist is Owned{
  /* USECASE
  // 管理者が書面相当で投稿者（著作者）の情報を得る
  // 投稿者のアドレス情報をコントラクトに登録
  // ホワイトリストとして取り扱う
  // ホワイトリストに登録された投稿者はアドレスによって判断できるようにする
  */

  struct Author {
    address owner;
    bool publish;
  }

  mapping(uint => Author) authors;
  mapping(address => uint) indexes;
  uint lastIndex;

  constructor () public {
    lastIndex = 0;
  }

  function _increment() private {
    lastIndex = lastIndex + 1;
  }

  function addAuthor(address author) public onlyOwner notExistsAuthor(author) {
    _increment();
    indexes[author] = lastIndex;
    authors[indexes[author]] =  Author(author, true);
  }

  function updatePublish(address author, bool publish) public onlyOwner existsAuthor(author) {
    authors[indexes[author]].publish = publish;
  }

  function isAuthor(address author) public view existsAuthor(author) returns(bool) {
    return authors[indexes[author]].publish;
  }

  modifier notExistsAuthor(address author) {
    require(indexes[author] == 0, "author address exists");
    _;
  }

  modifier existsAuthor(address author) {
    require(indexes[author] != 0, "author address not exist");
    _;
  }

  function getLastIndex() public view onlyOwner returns(uint) {
    return lastIndex;
  }

  function getAuthor(uint index) public view onlyOwner IndexRange(index) returns(address) {
    return authors[index].owner;
  }

  modifier IndexRange(uint index) {
    require (index != 0, "index mismatch");
    require (index < lastIndex , "index overflow");
    _;
  }

  function greeting() public view onlyOwner returns(string memory) {
    return "Hello Whitelist";
  }
}
