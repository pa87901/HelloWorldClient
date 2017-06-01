import React, { Component } from 'react';
// import {
//   Text,
//   View
// } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    // Creating the socket-client instance will automatically connect to the server.
    // this.socket = SocketIOClient('http://ec2-35-167-135-24.us-west-2.compute.amazonaws.com:3000');
    this.socket = SocketIOClient('http://localhost:3000')
    this.state = {
      messages: []
    };
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.socket.on('chat message', (msgs) => {
      console.log('Echo message', msgs, this.state.messages);
      this.setState({
        messages: msgs
      });
    });
  }

  onReceive(incMessage) {
    this.socket.on('chat message', (msgs) => {
      this.setState({
        messages: msgs
      });
    });
  }

  onSend(messages = []) {
    console.log('previous state', messages, this.state.messages);
    // Append the typed messsage to the previous state of messages.
    // this.setState((previousState) => {
    //   let newStateMessages = previousState.messages.slice();
    //   newStateMessages = newStateMessages.concat(messages);
    //   console.log('previousState', previousState, 'newStateMessages', newStateMessages);
      // this.componentWillMount();
    // });
    // Emit typed message to server.
    console.log('emitting', messages);
    this.socket.emit('chat message', messages);
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
          name: 'Alfred',
          avatar: 'https://avatars0.githubusercontent.com/u/22867659?v=3&u=ce528a943e09cdde30d47ef590543c0ce41ff615&s=400'
        }}
      />
    );
  }
}