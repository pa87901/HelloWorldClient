import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class NewChatScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    // this.socket = SocketIOClient('https://localizetravel-staging.herokuapp.com/', {query: {userId: this.props.userProfile.profile.userId, guideId: this.props.profileSelection.selectedProfile.user.facebook_id}});
    this.socket = SocketIOClient('http://localhost:3000/', {query: {userId: this.props.userProfile.profile.userId, guideId: this.props.profileSelection.selectedProfile.user.facebook_id}});
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    console.log('REACHED NEW CHAT SCREEN');
    let privateRoom = `${this.props.userProfile.profile.userId}-${this.props.profileSelection.selectedProfile.user.facebook_id}`;
    this.socket.on('connect', socket => {
      console.log('connected');
      this.socket.emit('room', 'AlexLiang');
    });
    this.socket.on('chat message', msgs => {
      let formattedMessages = msgs.map(chatObject => {
        return {
          text: chatObject.message,
          user: {
            _id: chatObject.user.facebook_id,
            name: chatObject.user.full_name,
          },
          createdAt: chatObject.created_at,
          _id: chatObject.id
        }
      });
      // Sort the messages.
      console.log('formattedMessages', formattedMessages)
      formattedMessages.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      this.setState({
        messages: formattedMessages
      });
      console.log('OHMAN', this.state.messages)
    })
    // Listen for the echo message from server after sending.
    this.socket.on('new message', (msg) => {
      console.log('newmessage', msg);
      let newMessages = msg.concat(this.state.messages);
      this.setState({
        messages: newMessages
      });
    });
  }

  onSend(messages = []) {
    // console.log('previous state', messages, this.state.messages);
    // Emit typed message to server.
    console.log('emitting', messages);
    this.socket.emit('chat message', messages);
  }

  render() {
    let currentUser = {
      _id: this.props.userProfile.profile.userId,
      guideId: this.props.profileSelection.selectedProfile.user.facebook_id
    }

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={currentUser}
      />
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NewChatScreen2);