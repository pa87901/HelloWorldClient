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
    let subtitle;
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

    // Formatting preview message.
    if (this.props.conversation.message.length > 40) {
      subtitle = this.props.conversation.message.slice(0, 37) + '...';
    } else {
      subtitle = this.props.conversation.message;
    }
    return (
      <View style={{backgroundColor: 'white'}}>
        <ListItem
          roundAvatar
          // avatar={this.props.avatar}
          title={nameToShow}
          subtitle={subtitle}
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