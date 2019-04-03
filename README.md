# Docker-Hosting-React

React.js製静的サイトとElasticsearchが連携したWEBアプリケーションをDockerで運用する。

# TL;DR
### Development
```shell
$ npm start
```

or 

```shell
$ npm install           # Install require package
$ npm run docker:dev    # Start docker development server 

### Run in another shell ###
$ npm run frontend:watch    # webpack build in watch mode
```

### Production
```shell
$ npm install           # Install require package
$ npm run docker:build  # Create bundle file & docker image
$ docker-compose up     # Serve application
```
```shell
$ docker-compose up -d  # Serve application in daemon
```

### Clean up docker process
```shell
$ docker-compose down   # Clean up docker proccess
```

# Environment

### Infrastructure
- Docker - 18.09.1
- Docker Compose - 1.23.2
- Node.js - v10.15.1
- npm - 6.4.1

### Main packages
- React.js - 16.8.4
- webpack - 4.29.6
- babel - 7.x
- pdfjs - 2.0.943

### Using Images
- nginx:latest
- elasticsearch:6.7.0


# Role of Container

### nginx:latest => Proxy Server (proxy)
nginx:latestからコンテナを生成しプロキシサーバとして運用。これにより、Docker内DNSによる名前解決を不自由なく使うことができる。そのほか、キャッシュサーバとしての設定やロードバランシングの設定も可能になった。(現在の規模ではロードバランシングにあまり意味がないため設定していない)

### nginx:latest => Hosting Server (hosting)
nginx:latestからコンテナを生成し静的サイトを配信。あらかじめwebpackでバンドルした静的コンテンツを参照し、配信を行っている。Proxy Serverの設定に基づき `/` でアクセスする。

### elasticsearch:6.7.0 => Search Engine (elasticsearch)
elasticsearch:6.7.0からコンテナを生成し全文検索エンジンを運用。登録したコンテンツの検索をRESTライクで容易に検索することができる。バージョンによる変更が多い技術なため、バージョンは固定で運用。Proxy Serverの設定に基づき `/api/` でアクセスする(もう少し厳密なURIを考え中)。

# Tips
### ● Elasticsearchの仮想メモリ数について
Ubuntuデフォルトでは仮想メモリ数が足りず、Elasticsearchが落ちる(主にVPSでよく見られるので要注意)。環境設定の変更のために下記コマンドを実行する必要がある。
```shell
$ sysctl -w vm.max_map_count=262144
```

### ● Typescriptの導入に関して
Typescriptを用いた開発を当初は考えていたが、今後の展開で考えている[PDF.js](https://mozilla.github.io/pdf.js/)との連携において難点があるため、Javascriptでの開発で妥協している。将来的にEslint, JSDocを導入したい。