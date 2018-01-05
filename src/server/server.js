const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

/**
 * express設定
 * post処理に、req.bodyがunderfindになるので、body-parserを利用
 * まず最初に、index.htmlを返却する
 * 次に、index.html内で/distへのgetリクエストが走るので、parcelで出力した_index.htmlを返却する
 */
const app = express();
app.use(express.static('./'));
app.get('/dist', (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../../dist/_index.html"));
});
app.use(bodyParser());

/**
 * httpサーバ設定
 * ポート3000を指定し、リクエスト待機状態にする
 */
const http = require('http').Server(app);
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

/**
 * WebSocketの機能追加
 */
const io = require('socket.io').listen(http);

// ユーザ管理ハッシュ
var userHash = {};

/**
 * socket.io設定
 */
io.sockets.on('connection', (socket) => {

  // 接続開始(接続元ユーザを保存し、他ユーザへ通知)
  socket.on('connected', (name) => {
    userHash[socket.id] = name;
    io.sockets.emit('publish', {value: `${name}が入室しました`});
  });

  // メッセージ送信イベント
  socket.on('publish', (data) => {
    io.sockets.emit('publish', data);
  });

  // 接続終了イベント(接続元ユーザを削除し、他ユーザへ通知)
  socket.on('disconnect', () => {
    if (userHash[socket.id]) {
      const msg = `${userHash[socket.id]}が退出しました`;
      delete userHash[socket.id];
      io.sockets.emit("publish", {value: msg});
    }
  });
});
