import React from 'react';
// import {
//   Text,
//   View
// } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import axios from '../axios';


let serverURL = 'http://localhost:3000/api/chats/'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    // Creating the socket-client instance will automatically connect to the server.
    // this.socket = SocketIOClient('http://ec2-35-167-135-24.us-west-2.compute.amazonaws.com:3000');
    this.state = {
      messages: [],
      userId: null,
      guideId: null,
      guide: false
    };
    this.socket = SocketIOClient('http://localhost:3000', {query: {userId: this.props.userProfile.profile.userId, guideId: this.props.navigation.state.params.guideId.user_id}})
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.setState({
      userId: this.props.userProfile.profile.userId,
      guideId: this.props.navigation.state.params.guideId.user_id
    });
  }

  componentDidMount() {
    console.log('this.props in ChatScreen', this.props, this.state);
    let privateRoom = `${this.state.userId}-${this.state.guideId}`
    console.log('PRIVATE ROOM', privateRoom);
    this.socket.on('connect', socket => {
      // On connection, join a socket io room.
      console.log('PRIVATE ROOM');
      this.socket.emit('room', privateRoom);
    });

    this.socket.on('chat message', (msgs) => {
      // console.log('Echo message', msgs);
      let formattedMessages = msgs.map(chatObject => {
        return {
          text: chatObject.message,
          user: {
            _id: chatObject.user_id,
            name: chatObject.author,
            guideId: chatObject.guide_id
          },
          createdAt: chatObject.created_at,
          _id: chatObject.id
        }
      });

      this.setState({
        messages: formattedMessages
      });
    });

    // Listen for the echo message from server after sending.
    this.socket.on('new message', (msg) => {
      let newMessages = msg.concat(this.state.messages);
      this.setState({
        messages: newMessages
      });
    });
  }

  onSend(messages = []) {
    // console.log('previous state', messages, this.state.messages);
    // Emit typed message to server.
    // console.log('emitting', messages);
    this.socket.emit('chat message', messages);
  }

  render() {
    let currentUser;
    if (this.state.guide) {
      currentUser = {
        _id: this.state.userId,
        name: 'guide',
        guideId: this.state.guideId,
        // avatar: 'https://avatars0.githubusercontent.com/u/22867659?v=3&u=ce528a943e09cdde30d47ef590543c0ce41ff615&s=400'
      }
    } else {
      currentUser = {
        _id: this.state.userId,
        name: '',
        guideId: this.state.guideId,
        // avatar: 'https://avatars0.githubusercontent.com/u/22867659?v=3&u=ce528a943e09cdde30d47ef590543c0ce41ff615&s=400'
      }
    }

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={currentUser}
      />
    );
  }
}

const mapStateToProps = state => (state);

function bindActions(dispatch) {
  return {
    addMessage: (messages, callback) => dispatch({type: 'ADD_CHAT', payload: messages})
  };
}

export default connect(mapStateToProps, bindActions)(Chat);