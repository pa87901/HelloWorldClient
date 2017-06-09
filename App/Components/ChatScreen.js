import React from 'react';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import axios from '../axios';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    // Creating the socket-client instance will automatically connect to the server.
    // this.socket = SocketIOClient('http://ec2-35-167-135-24.us-west-2.compute.amazonaws.com:3000');
    this.state = {
      messages: [],
      userId: null,
      guideId: null,
      guide: true
    };
    // If we navigated to ChatScreen from Inbox menu icon: 
    if (this.props.navigation.state.params) {
      this.socket = SocketIOClient('http://localhost:3000', {query: {userId: this.props.userProfile.profile.userId, guideId: this.props.navigation.state.params.guideId.user_id}})
    }
    else {
      // If we navigated to ChatScreen from clicking on a guide profile card:
      this.socket = SocketIOClient('http://localhost:3000', {query: {userId: this.props.userProfile.profile.userId, guideId: this.props.profileSelection.selectedProfile.user_id}})
    }
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    // If we navigated to ChatScreen from Inbox menu icon: 
    if (this.props.navigation.state.params) {
      this.setState({
        userId: this.props.userProfile.profile.userId,
        guideId: this.props.navigation.state.params.guideId.user_id
      });
    } else {
      // If we navigated to ChatScreen from clicking on a guide profile card:
      this.setState({
        userId: this.props.userProfile.profile.userId,
        guideId: this.props.profileSelection.selectedProfile.user_id
      });
    }
  }

  componentDidMount() {
    let privateRoom = `${this.state.userId}-${this.state.guideId}`
    console.log('PRIVATE ROOM', privateRoom);
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

  render() {
    console.log('this.props in ChatScreen', this.props, this.state);
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