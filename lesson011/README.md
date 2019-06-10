# Tutorial

Source Code Design Overview.

01. Front End View Design
02. Module Organization
03. Workflow Driven Development
04. Test Driven Development
05. Check All Test Green.

## Use Case with Workflow

## Role

- 管理者： WhitelistAdmin
- 投稿者： Whitelisted / Author
- 購入者： Purchaser / Signer / Seller
- 閲覧者： TradePurchase / ResalePurchaser

## Use Case

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

... and more.
Check Smtart Contracts, And Test Code.

## Operation

~~~ bash terminal
cp -R lesson010 lesson011
cd lesson011
~~~

~~~ bash terminal sample
npm install openzeppelin-solidity
npm install truffle-assertions
mkdir contracts/Product
code contracts/Product/Article.sol
code contracts/Product/Trade.sol
code contracts/Product/TradeHistory.sol
code contracts/Product/TradePurchaser.sol
code contracts/Product/Resale.sol
code contracts/Product/ResaleHistory.sol
code contracts/Product/ResalePurchaser.sol
code contracts/Product/Main.sol
code migrations/2_deploy.product.js
code test/Article.test.js
code test/Trade.test.js
code test/TradePurchaser.test.js
code test/TradeHistory.test.js
code test/Resale.test.js
code test/ResalePurchaser.test.js
code test/ResaleHistory.test.js
truffle compile
truffle migrate --reset
truffle test
~~~

Lesson finish!
