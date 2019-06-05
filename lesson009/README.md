# Tutorial

Vue.js + Webpack + Wordpress + Truffle => Wonderfull!
~~~ bash terminal
mkdir lesson009
cd lesson009
truffle init
truffle compile
truffle migrate --reset
~~~

~~~ bash terminal
mkdir server
cd server
touch docker-compose.yml
docker-compose up -d
~~~

access http://localhost:10001/

# Wordpress Operation

http://localhost://localhost:10001/wp-admin/

1. Choose Languse
  - 言語：日本語
2. Welcome
  - サイトのタイトル -> sample
  - ユーザー名 -> user
  - パスワード -> password
  - パスワード確認 -> 脆弱なパスワードの使用を確認
  - メールアドレス -> user@example.com
  - 検索エンジンでの表示 -> チェック
3. Wordpressをインストール
4. ログイン
  - ユーザー名 -> user
  - パスワード -> password
  - ログイン状態を保存 ->  チェック
5. ダッシュボード表示
6. プラグインインストール
  - All In One SEO Pack
  - Classic Editor
  - Google XML Sitemaps
  - Jetpack by WordPress.com
  - MW WP Form
  - SAKURA RS WP SSL
  - TinyMCE Advanced
  - WordPress Popular Posts
  - WordPress Importer
  - WP CSV Exporter
  - WP-PageNavi

## WordPress Theme Install

1. file upload limit change
2. download theme(zip)
3. install theme

~~~ bash terminal
rm upload.ini
touch upload.ini
code upload.ini
~~~

1. Wordpress 管理画面ダッシュボード 外観 
2. テーマ
3. 新規追加
4. テーマのアップロード

## Wordpress Export & Import

1. Export 全てのコンテンツ
2. WordPress

# FrontEnd & WordPress Integration

~~~ bash terminal
cd ..
vue init webpack-simple client
cd client

~~~ bash terminal
vue init webpack-simple client
cd client
code package.json
npm install
npm run dev
code src App.vue
code .babelrc
code webpack.config.js
code src App.vue
code webpack.config.js
npm run dev
npm run build
~~~

## WordPress Integration

STEP.01 Create WordPress Asset Folder
~~~ bash terminal
cd ..
cd server
mkdir wp-content/assets
touch wp-content/assets/hello.txt
echo "hello" > wp-content/assets/hello.txt
~~~

browser access

http://localhost:10001/wp-content/assets/hello.txt

STEP.02 Update Client Build Settings.

~~~ bash terminal
code webpack.config.js
npm run build
~~~

STEP.03 Create WordPress Page

~~~ html
<div id="app"></div>
<script src="/wp-content/assets/build.js"></script>
~~~

STEP.04 Check Page Preview

## Truffle Integrate

~~~ bash terminal
cd ..
touch contracts/Hello.sol
code contracts/Hello.sol
truffle compile
touch migrations/2_deploy.js
code migrations/2_deploy.js
truffle migrate
cd client
ln -s `pwd`/../build/contracts src/assets
code src/App.vue
npm run dev
npm run build
lite-server
code webpack.config.js
npm run publish
http-server
~~~

注意メモ

Web3、Truffle周りで、
パッケージの依存関係が
うまく行かないことがある。

その時は、
web3、Truffle-contractを
再インストールして、
稼働できる状態を模索する必要あり。

## Development Workflow

1. Solidity Development
  - contracts/XXX.sol
2. Truffle Compile
  - truffle compile
3. Truffle Migrate
  - migrations/NNN_XXX.js, truffle
4. Local Dev
  - src/***.vue, src/***.***
  - npm run dev
  - Browser Live Debug
5. Build
  - npm run build
6. WordPress Check
  - 固定ページにスクリプトを埋め込み
  - 表示、動きのチェック
7. Publish
  - npm run publish
  - wp-content/assets/ へ配置
  - 最終動作確認


