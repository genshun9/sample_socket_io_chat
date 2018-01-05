import {Dispatcher} from 'flux';
import Store from './Store';
import {PUBLISH, RECEIVE} from '../constants/Constants';
import AppDispatcher, {PayLoad} from '../dispatchers/AppDispatcher';

export interface Chat extends Array<string> {
}

export class ChatStore extends Store {
  constructor(private dispatcher: Dispatcher<PayLoad>) {
    super();
    dispatcher.register(this.dispatchHandler.bind(this));
  }

  private chats: Chat = [];

  public getAll(): Chat {
    return this.chats;
  }

  public store(msg: string): void {
    this.chats.push(msg);
  }

  private dispatchHandler(action: PayLoad): void {
    switch (action.actionType) {
      case PUBLISH:
        // メッセージの送信は後ほどsocket.ioから受信するので、storeしない
        this.emitChange();
        break;
      case RECEIVE:
        this.store(action.value);
        this.emitChange();
        break;
      default:
    }
  }
}

export default new ChatStore(AppDispatcher)