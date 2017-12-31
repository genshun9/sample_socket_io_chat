const express = require('express');
const bodyParser = require('body-parser');

/**
 * express設定
 * post処理に、req.bodyがunderfindになるので、body-parserを利用
 * index.htmlを返却する
 */
const app = express();
app.use(express.static('./'));
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
    console.log(`connected ${socket.toString()} ${name}`);

    userHash[socket.id] = name;
    io.sockets.emit('publish', {value: `${name}が入室しました`});
  });

  // メッセージ送信イベント
  socket.on('publish', (data) => {
    console.log(`publish ${socket} ${data}`);

    io.sockets.emit('publish', {value: data.value});
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
