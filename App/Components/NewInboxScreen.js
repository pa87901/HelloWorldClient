import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios';
import { Text, View } from 'react-native';
import { updateChats } from '../Actions/chatActions'
import NewConversation from './NewConversation';
import styles from './styles.js';
import Toolbar from 'react-native-toolbar';

class NewInboxScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      inbox: []
    }
  }

  componentDidMount() {
    axios.get(`/api/chats/all/${this.props.userProfile.profile.userId}`)
    .then(chats => {
      chats = chats.data
      this.props.dispatch(updateChats(chats));
      this.setState({
        chats: chats
      })
    })
    .then(() => {
      // console.log('chats', this.props.chat.chats);
      let chatsToSlice = this.state.chats;
      // console.log('chatsToSlice', chatsToSlice)
      // ORGANISE CHATS INTO CONVERSATIONS.
      // Iterate through chats[]
      let inbox = [];
      while (chatsToSlice.length > 0) {
        let chat = chatsToSlice.shift();
        let conversation = [];
        conversation.push(chat);
        
        // console.log('PREDA', chatsToSlice, chat);
        // Shift first chat in chats[].
        let user1 = chat.user.facebook_id;
        let user2 = chat.guide.facebook_id;
        console.log('users', user1, user2);
        // Iterate through rest of chats to pick out chats where this combination of 2 users is met.
        // let i = 0;
        // console.log('chatsToSlice', chatsToSlice);
        for (let i = 0; i < chatsToSlice.length; i++) {
          // console.log('chatsToSlice[i]', chatsToSlice[i]);
          if ((chatsToSlice[i].user.facebook_id === user1 && chatsToSlice[i].guide.facebook_id === user2) || (chatsToSlice[i].user.facebook_id === user2 && chatsToSlice[i].guide.facebook_id === user1)) {
            conversation.push(chatsToSlice[i]);
            chatsToSlice.splice(i, 1);
            i--;
          }
        }
        inbox.push(conversation);
      }
      // console.log('inbox', inbox);
      this.setState({
        inbox: inbox
      })
      // console.log('inbox', inbox);
    });

  }

  render() {
    console.log('this.state in NewInbox', this.state);
    return (
      <View style={styles.orangeContainer}>
        <Toolbar
          backgroundColor='#FF8C00'
          ref={(toolbar) => { this.toolbar = toolbar; }} presets={toolbarSetting} />
        <View style={{marginTop: 80}}>
        {this.state.inbox.map((conversation, index) => {
          // Choosing avatar to pass as props.
          // let avatar;
          // if (this.props.userProfile.profile.userId === conversation[0].guide.user.facebook_id) {
          //   avatar = conversation.user.avatar;
          // } else {
          //   avatar = conversation.guide.user.avatar
          // }
          return (
            <NewConversation
            conversation={conversation[0]}
            key={index}
            userId={this.props.userProfile.profile.userId}
            navigation={this.props.navigation}
            />
          )})
        }
        </View>
      </View>
    )
  }
  static navigationOptions = ({ navigation }) => ({
    header: null
  });  
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NewInboxScreen);

const toolbarSetting = {
    toolbar1: {
      hover: false,
      // leftButton: {
      //   icon: 'search',
      //   iconStyle: {color: 'white', fontSize: 30},
      //   iconFontFamily: 'FontAwesome',
      //   onPress: () => {navToSearch('Search')},
      // },
      title:{
        text: 'LOCALIZE',
        textStyle: styles.toolbarText
      }
  },
}