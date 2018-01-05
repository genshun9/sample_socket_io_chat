import {Dispatcher} from 'flux';
import AppDispatcher, {PayLoad} from '../dispatchers/AppDispatcher';
import {PUBLISH, RECEIVE} from '../constants/Constants';
import * as io from 'socket.io-client';

let Socket = io.connect('http://localhost:3000');

interface PublishData {
  value: string
}

interface SubscribeData {
  value: string
}

class ChatActionCreators {
  constructor(private socket: any, private dispatcher: Dispatcher<PayLoad>) {
    /**
     * socketイベントとコールバックの定義
     * 一旦ChatAction内で、全てのsocketの定義をする。外側に定義したい。
     */
    this.socket.on('connected', (name: string) => {
    });
    this.socket.on('disconnect', () => {
    });
    this.socket.on('publish', (data: PublishData) => {
      this.subscribe(data)
    });
  }

  // connetする際、nameをサーバへ送る
  public connect(name: string) {
    this.socket.emit('connected', name);
  }

  // disconnectする
  public disconnect() {

  }

  // socket.ioを経由した送信
  public publish(data: PublishData) {
    this.socket.emit('publish', data);
    this.dispatcher.dispatch({
      actionType: PUBLISH,
      value: data.value
    })
  }

  // socket.ioを経由した受信
  public subscribe(data: SubscribeData) {
    this.dispatcher.dispatch({
      actionType: RECEIVE,
      value: data.value
    })
  }
}

export default new ChatActionCreators(Socket, AppDispatcher);