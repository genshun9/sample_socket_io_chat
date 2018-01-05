# sample_socket_io_chat

## 設計
- クライアント
  - react/flux
  - typescript(@types)
- サーバ
  - node.js/express/http
  - javascript
- 通信
  - socket.io
- ビルド
  - parcel
    - parcelは`_index.html`の依存モジュールを全てdist配下へbundleする
    - node.jsは`index.html`を読み込み、dist配下のbundleされたファイルを読み込む
    - node.jsがdist配下を読み込む際、index.htmlが参照するbundle.jsのパスと、node.jsから見たbundle.jsのパスが合わないので、このやり方でやり過ごす。

## 使い方
- npm i
- npm run compile-client（普段の開発は、localhost:1234を使う）
- npm run start-server
- localhost:3000を開く
