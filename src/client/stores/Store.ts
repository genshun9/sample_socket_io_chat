import {EventEmitter} from "events";

export default class Store extends EventEmitter {
  // イベント発行（削除されているとemitしてもイベントを受け取れない）
  emitChange() {
    this.emit('change');
  }

  // イベント受信
  addChangeListener(callback) {
    this.on('change', callback);
  }

  // イベント削除
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  // 1回だけイベント受信（2回emitされても受信されない）
  onceListener(callback) {
    this.once('change', callback);
  }
}