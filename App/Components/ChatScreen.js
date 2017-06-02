import React from 'react';
// import {
//   Text,
//   View
// } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import axios from 'axios';


let serverURL = 'http://localhost:3000/api/chats/'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    // Creating the socket-client instance will automatically connect to the server.
    // this.socket = SocketIOClient('http://ec2-35-167-135-24.us-west-2.compute.amazonaws.com:3000');
    this.socket = SocketIOClient('http://localhost:3000', {query: {userId: 'preda', guideId: 'charles'}})
    this.state = {
      messages: [],
      userId: 'preda',
      guideId: 'charles',
      guide: false
    };
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.socket.on('chat message', (msgs) => {
      //console.log('Echo message', msgs);
      let formattedMessages = msgs.map(chatObject => {
        return {
          text: chatObject.message,
          user: {
            _id: chatObject.user_id,
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

    this.socket.on('new message', (msg) => {
      
      // let formattedMessages = msg.map(chatObject => {
      //   return {
      //     text: chatObject.message,
      //     user: {
      //       _id: chatObject.user_id,
      //       guideId: chatObject.guide_id
      //     },
      //     createdAt: chatObject.created_at,
      //     _id: chatObject.id
      //   }
      // });
      // console.log('Client received message?', this.state.messages, msg);
      let newMessages = msg.concat(this.state.messages);
      this.setState({
        messages: newMessages
      });
    })
    // this.socket.connect('', {userId: 'preda', guideId: 'charles'})

    // Make messages state start off with chats stored in redux store.
    // console.log('this.props.chat in Chat component', this.props.chat.chats);
    // this.setState({
    //   messages: this.props.chat.chats
    // })

    // Do an axios GET request to server for messages pertaining to this chat.
    // axios.get(serverURL + this.state.userId + '/' + this.state.guideId)
    //   .then(chats => {
    //     console.log('chats in ChatScreen ComponentWillMount', chats.data);
    //     let formattedMessages = chats.data.map(chatObject => {
    //       return {
    //         text: chatObject.message,
    //         user: {
    //           _id: chatObject.user_id,
    //           guideId: chatObject.guide_id
    //         },
    //         createdAt: chatObject.created_at,
    //         _id: chatObject.id
    //       }
    //     })
    //     this.setState({
    //       messages: formattedMessages
    //     });
    //   })
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
    // let newMessages = this.state.messages.reverse().concat(messages).reverse();
    // console.log('newMessages', newMessages);
    // this.props.addMessage(newMessages, function() {
      // this.componentWillMount();
    // });
  }

  render() {
    let currentUser = {
      _id: this.state.userId,
      guideId: this.state.guideId,
      guide: this.state.guide,
      avatar: 'https://avatars0.githubusercontent.com/u/22867659?v=3&u=ce528a943e09cdde30d47ef590543c0ce41ff615&s=400'
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