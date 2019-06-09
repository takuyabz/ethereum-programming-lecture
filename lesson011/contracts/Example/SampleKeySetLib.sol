pragma solidity ^0.5.0;

library SampleKeySetLib {
  struct Set {
    mapping(bytes32 => uint) keyMap;
    bytes32[] keyList;
    uint version;
  }

  function vkey(Set storage self, bytes32 key) internal view returns(bytes32) {
    return keccak256(abi.encodePacked(self.version,key));
  }

  modifier validKey(bytes32 key) {
    require(key != 0x0, "key cannot be 0x0");
    _;
  }

  modifier validEnableKey(Set storage self, bytes32 key) {
    require(self.keyMap[vkey(self,key)] == 0x0, "must be key not exist");
    require(self.keyList.length >= self.keyMap[vkey(self,key)], "key index overflow");
    _;
  }


  function insert(Set storage self, bytes32 key) 
    internal 
    validKey(key) 
    validEnableKey(self,key) 
  {
    self.keyMap[vkey(self,key)] = self.keyList.push(key);
  }

  modifier existsKey(Set storage self, bytes32 key) {
    require(self.keyList.length != 0, "keys is empty");
    require(self.keyList[self.keyMap[vkey(self,key)]-1] == key, "must be key exist");
    _;
  }

  function remove(Set storage self, bytes32 key) 
    internal
    existsKey(self, key)
  {
    bytes32 keyToMove = self.keyList[count(self)-1];
    uint rowToReplace = self.keyMap[vkey(self,key)];
    self.keyMap[vkey(self,keyToMove)] = rowToReplace - 1;
    self.keyList[rowToReplace - 1] = keyToMove;
    delete self.keyMap[vkey(self,key)];
    self.keyList.length--;
  }

  function exists(Set storage self, bytes32 key)
    internal
    view
    returns(bool)
  {
    if(self.keyList.length == 0) return false;
    return self.keyList[self.keyMap[vkey(self,key)]-1] == key;
  }

  function count(Set storage self)
    internal
    view
    returns(uint)
  {
    return self.keyList.length;
  }

  function keyAtIndex(Set storage self, uint index) 
    internal 
    view 
    returns(bytes32) 
  {
    return self.keyList[index];
  }

  function clear(Set storage self)
    public
  {
    self.version++;
    delete self.keyList;
  }
}

