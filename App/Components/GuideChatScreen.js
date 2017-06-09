import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import axios from '../axios';
import { GiftedChat } from 'react-native-gifted-chat';

class GuideChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      guideId: null,
      userId: null
    };
    this.socket = SocketIOClient('http://localhost:3000', {query: {userId: this.props.navigation.state.params.userId, guideId: this.props.userProfile.userGuideId}});
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    console.log('this.props in GuideChatScreen', this.props);
    console.log('guideId in GuideChatScreen', this.props.userProfile.userGuideId);
    console.log('userId in GuideChatScreen', this.props.navigation.state.params.userId);
    // Set state of this component to the respective people chatting.
    this.setState({
      guideId: this.props.userProfile.userGuideId,
      userId: this.props.navigation.state.params.userId
    });
    // axios.get('/api/users/byUserId/4')
    // .then(response => {
    //   console.log('sjdhh d', response);
    // });
  }

  componentDidMount() {
    this.socket.on('connect', socket => {
      // On connection, join a socket io room.
      console.log('PRIVATE ROOM');
      this.socket.emit('room', 'AlexLiang');
    });

    this.socket.on('chat message', (msgs) => {
      console.log('Echo message', msgs);
      let formattedMessages = msgs.map(chatObject => {
        if (chatObject.author === '') {
          return {
            text: chatObject.message,
            user: {
              _id: chatObject.user_id,
              name: 'me',
              guideId: chatObject.guide_id
            },
            createdAt: chatObject.created_at,
            _id: chatObject.id
          }
        } else if (chatObject.author === 'guide') {
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


  // SWITCH UP USERID AND GUIDE ID!!!!!
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

export default connect(mapStateToProps)(GuideChatScreen);