# Tutorial

ロール
管理者(WhitelistAdmin)、投稿者(Whitelisted)、購入者(Signer)、閲覧者(None)

01. 管理者は投稿者（WhitelistedRole.addWhitelisted）を追加できる
02. 投稿者は記事を投稿、変更ができる
03. 閲覧者は記事数を取得できる
04. 購入者は投稿者の記事を購入できる
05. 購入者は記事を閲覧できる
06. 購入者は購入記事一覧（件数＋記事のID）を取得できる
07. 購入者は購入記事を再販できる(Resale)
08. 投稿者は再販報酬率を設定できる
09. 再販購入者は購入者の再販記事を購入できる
  09-01. 再販購入者が購入する際は投稿者に再販報酬率が還元できる
  09-01. 再販購入者が購入する際は購入者に再販報酬率を除いた価格が還元できる
10. 再販購入者は再販購入記事を閲覧できる

---
06. 管理者は投稿者を削除できる

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
