import React, { Component } from 'react';
import { ScrollView, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import axios from '../axios';
import { updateChats } from '../Actions/chatActions.js';
import Conversation from './Conversation';

class GuideInboxScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      chats: []
    }
  }

  componentWillMount() {
    console.log('this.props in GuideInboxScreen', this.props, 'userGuideId', this.props.userProfile.userGuideId, 'chats', this.props.chat.chats);
    // Need to change the global state this.props.chat.chats [] to be that belonging to this state's userGuideId.
    // Make axios call for chats where guideId=...
    axios.get(`/api/chats/byGuideId/${this.props.userProfile.userGuideId}`)
    .then(chats => {
      console.log('chats received by guideId', chats);
      // Format messages into GiftedChat friendly format.
      let formattedSingleChatMessage = parseChatData(chats.data);
      if(!Array.isArray(chats.data)) {
        this.setState({
          chats: [formattedSingleChatMessage]
        });
        this.props.dispatch(updateChats([formattedSingleChatMessage]));
        this.componentDidMount();
      } else {
        let formattedMultipleChatMessage = chats.data.map(chatObject => {
          return parseChatData(chatObject);
        });
        this.setState({
          chats: formattedMultipleChatMessage
        });
        this.props.dispatch(updateChats(formattedMultipleChatMessage));
        this.componentDidMount();
      }
    })
    .catch(error => {
      console.error('Error in GuideInboxScreen Axios');
    })
  }

  componentDidMount() {
    // console.log('this.state in GuideInboxScreen', this.state);
    // Iterate through chat [] and reduce for unique userIds.
    let userNames = [];
    this.state.chats
      .map(chatObject => { console.log('chatObject from server in GuideInboxScreen', chatObject.user._id); return chatObject.user._id })
      .filter((id, i, array) => { return array.indexOf(id) === i })
    // With the userIds, make a call to the database to get customer/user names.
      .forEach(user => {
        axios.get(`api/users/byUserId/${user}`)
        .then(userInfo => {
          // console.log('userInfo from GET request in GuideInboxScreen', userInfo);
          // if (typeof userInfo.data === 'object' && !Array.isArray(userInfo.data)) {
          //   userInfo.data = [userInfo.data];
          // }
          userNames.push(userInfo.data);
          console.log('userNames', userNames, this.state);
          this.setState({
            users: userNames
          });
        })
        .catch(error => {
          console.error('Error in getting userName from userId')
        });
      });
  }

  render() {
    console.log('this.state in GuideInboxScreen', this.state, this.props);
    if (!this.state.users.length) {
      return (
        <View>
        </View>
      )
    } else {
      return (
        <ScrollView>
          <Text>Guide Inbox</Text>
          {this.state.users.map((user, index) => 
            <Conversation userId={user} key={index} navigation={this.props.navigation} />
          )}
        </ScrollView>
      );
    }
  }

  static navigationOptions = ({ navigation }) => ({
      headerLeft: <Button title='Explore' onPress={() => navigation.navigate('Explore')}/>,
      headerRight: <Button title='Tourist Chat' onPress={() => navigation.navigate('Inbox')}/>
  })
}

const parseChatData = function(chat) {
  return {
    text: chat.message,
    user: {
      _id: chat.user_id,
      guideId: chat.guide_id
    },
    createdAt: chat.created_at,
    _id: chat.id
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(GuideInboxScreen);