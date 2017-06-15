import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { ListItem } from 'react-native-elements';

class NewConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user1: null,
      user2: null
    }
  }

  render() {
    console.log('this.props.conversation', this.props.conversation);
    const { navigate } = this.props.navigation;
    let nameToShow;
    let me;
    let them;
    let avatar;
    // Where I am the user
    if (this.props.userId === this.props.conversation.user.facebook_id) {
      nameToShow = this.props.conversation.guide.full_name;
      me = this.props.conversation.user.facebook_id;
      them = this.props.conversation.guide.facebook_id;
      avatar = this.props.conversation.guide.avatar
    } else {
      // Where I am the guide.
      nameToShow = this.props.conversation.user.full_name;
      me = this.props.conversation.guide.facebook_id;
      them = this.props.conversation.user.facebook_id;
      avatar = this.props.conversation.user.avatar
    }
    return (
      <View style={{backgroundColor: 'white'}}>
        <ListItem
          roundAvatar
          avatar={this.props.avatar}
          title={nameToShow}
          avatar = {avatar}
          onPress={() => navigate('NewChatScreen', {me: me, them: them})}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  }
});


const mapStateToProps = state => state;

export default NewConversation;