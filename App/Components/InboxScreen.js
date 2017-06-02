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
      guides: []
    }
  }

  componentWillMount() {
    // console.log('this.props in InboxScreen', this.props.chat.chats);
    // Iterate through chats array and reduce for unique guide ids.
    let chats = this.props.chat.chats;
    let guideIds = chats
      .map(chatObject => {return chatObject.user.guideId})
      .filter((id, i, array) => {return array.indexOf(id) === i})
    // console.log('guideIds', guideIds);
    // With the guideIds, make a call to the database to get guideNames.
    let guideNames = [];
    guideIds.forEach(guideId => {
      axios.get(`/guides/${guideId}`)
      .then(response => {
        let newState = guideNames.push(response.data);
        this.setState({
          guides: guideNames
        });
        console.log('RESPONSE', response, guideNames, this.state);
      })
      .catch(error => {
        console.error('Error in getting guideName from guideId');
      });
    });
  }

  render() {
    console.log('this.state.guides in InboxScreen', this.state.guides);
    return (
      <ScrollView>
        <Text> INBOX </Text>
        <Button
          title='testChat'
          onPress={() => {this.props.navigation.navigate('Chat')}}
        />
        {this.state.guides.map((guide, index) => 
          <Conversation guideId={guide} key={index} navigation={this.props.navigation} />
        )}
      </ScrollView> 
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(InboxScreen);