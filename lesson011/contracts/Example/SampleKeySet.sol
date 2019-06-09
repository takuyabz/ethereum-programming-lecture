pragma solidity ^0.5.0;

import "./SampleKeySetLib.sol";

contract SampleKeySet {
  using SampleKeySetLib for SampleKeySetLib.Set;
  SampleKeySetLib.Set set;

  event LogUpdate(address sender, string action, bytes32 key);

  function exists(bytes32 key)
    public
    view
    returns(bool)
  {
    return set.exists(key);
  }

  function insert(bytes32 key)
    public
  {
    set.insert(key);
    emit LogUpdate(msg.sender, "insert", key);
  }

  function remove(bytes32 key)
    public
  {
    set.remove(key);
    emit LogUpdate(msg.sender, "remove", key);
  }

  function count()
    public
    view
    returns(uint)
  {
    return set.count();
  }

  function keyAtIndex(uint index)
    public
    view
    returns(bytes32)
  {
    return set.keyAtIndex(index);
  }

  function clear()
    public
  {
    set.clear();
  }
}
