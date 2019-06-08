# Tutorial

~~~ bash terminal
cp -R lesson010 lesson011
cd lesson011
~~~

# Pure Article

contract Article {
  struct Content {
    address owner;
    string title;
    string description;
    string imgsrc;
    uint datetime;
  }
  mapping(uint => Content) contents;
  mapping(address => uint) idArticle;
  uint cid;
}


~~~ bash terminal
touch contracts/Whitelist.sol
code contracts/Whitelist.sol
touch contracts/Owned.sol
code contracts/Owned.sol
touch migrations/3_deploy_whitelist.js
code migrations/3_deploy_whitelist.js
touch test/Whitelist.test.js
code test/Whitelist.test.js
truffle compile
truffle develop
~~~

~~~ bash truffle develop
develop>compile
develop>migrate
develop>test
~~~

~~~ Result
Compiling your contracts...
===========================
> Compiling ./contracts/Owned.sol
> Compiling ./contracts/Whitelist.sol
> Artifacts written to /var/folders/fz/m0qx15x126d2jslmjqf_0rmh0000gq/T/test-11957-58446-a90jk.1imu9e
> Compiled successfully using:
   - solc: 0.5.8+commit.23d335f2.Emscripten.clang



  Contract: Whitelist
    ✓ greeting
    ✓ getAuthor Index 0
    ✓ getAuthor Index overflow
    ✓ getLastIndex
    ✓ isAuthor
    ✓ addAuthor (120ms)
    ✓ isNotAuthor
    ✓ only AddAuthor (49ms)
    ✓ OPS Test (66ms)
    ✓ Update Author Publish (108ms)
~~~

Lesson finish!
