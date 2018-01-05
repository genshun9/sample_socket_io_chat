import * as React from 'react';
import ChatActionCreators from '../actions/ChatActionCreators';
import ChatStore from '../stores/ChatStore';

interface ChatState {
  myName?: string,
  chats?: any,
  message?: string
}

export default class App extends React.Component<{}, ChatState> {
  _onChangeChat: () => {};

  constructor(props) {
    super(props);
    const myName = `${Math.floor(Math.random() * 100)}さん`;
    this.state = {
      myName: myName,
      chats: [],
      message: ''
    };
    this._onChangeChat = this.onChangeChat.bind(this);
  }

  componentWillMount() {
    ChatStore.addChangeListener(this._onChangeChat);
    ChatActionCreators.connect(this.state.myName);
  }

  componentWillUnmount() {

  }

  render() {
    const messageElm = this.state.chats.map((chat, index) => {
      return <div key={index}>{chat}</div>
    });
    return (
      <div>
        <input
          type="text"
          id="msg_input"
          style={{width: 200}}
          onChange={this.onChangeMessage.bind(this)}
          value={this.state.message}
        />
        <button onClick={this.publishMessage.bind(this)} disabled={this.state.message === ''}>
          語る
        </button>
        <div id="msg">
          {messageElm}
        </div>
      </div>
    )
  }

  onChangeChat(): void {
    this.setState({chats: ChatStore.getAll()});
  }

  onChangeMessage(e): void {
    this.setState({message: e.target.value});
  }

  // メッセージを送信
  publishMessage(): void {
    ChatActionCreators.publish({value: `[${this.state.myName}] ${this.state.message}`});
    this.setState({message: ''})
  }
}