import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import ChatScreen from './ChatScreen';
import { connect } from 'react-redux';
import Conversation from './Conversation';
import axios from '../axios';

class InboxScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guides: [],
      chats: []
    }
  }

  componentWillMount() {
    // console.log('this.props in InboxScreen', this.props.userProfile.profile.userId);
    let params = {
      facebookId: this.props.userProfile.profile.userId
    };
    console.log('PARAMS', this.props.userProfile.profile.userId);
    axios.get('api/chats/all/' + this.props.userProfile.profile.userId, params)
    .then(chats => {
      // Format messages into GiftedChat friendly format.
      let formattedMessages = chats.data.map(chatObject => {
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
      console.log('Received response from server and formated.', chats.data,  formattedMessages);
      this.setState({
        chats: formattedMessages,
        userLoggedIn: this.props.userProfile.profile.userId
      });
      this.props.updateChats(formattedMessages);
      // this.props.dispatch({type: 'FETCH_CHATS_FULFILLED', payload: chats.data})
      this.componentDidMount();
    })
    .catch(error => {
      this.setState({
        userLoggedIn: this.props.userProfile.profile.userId
      });
      // console.error('Unable to receive response from server GET /chats.');
    });
  }

  componentDidMount() {
    console.log('this.props in InboxScreen', this.state, this.props);
    // Iterate through chats array and reduce for unique guide ids.
    let chats = this.props.chat.chats;
    let guideIds = chats
      .map(chatObject => { return chatObject.user.guideId })
      .filter((id, i, array) => { return array.indexOf(id) === i });
    // console.log('guideIds', guideIds);
    // With the guideIds, make a call to the database to get guideNames.
    let guideNames = [];
    guideIds.forEach(guideId => {
      axios.get(`api/guides/byChat/${guideId}`)
      .then(response => {
        let newState = guideNames.push(response.data);
        this.setState({
          guides: guideNames
        });
        console.log('RESPONSE', response, guideNames, this.state);
      })
      .catch(error => {
        // No chats for logged in user so set chats state to empty [].
        // this.setState({
        //   chats: []
        // });
        console.error('Error in getting guideName from guideId');
      });
    });
  }

  render() {
    console.log('this.state.guides in InboxScreen', this.state.guides);
    return (
      <ScrollView>
        <Text> INBOX </Text>
        {this.state.guides.map((guide, index) => 
          <Conversation guideId={guide} key={index} navigation={this.props.navigation} />
        )}
      </ScrollView> 
    );
  }
}

const mapStateToProps = state => state;

function mapDispatchToProps(dispatch) {
  return {
    updateChats: (chats) => dispatch({type: 'UPDATE_CHATS', payload: chats})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen);