import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class InboxChoiceScreen extends Component {
  constructor(props) {
    super(props);
    this.navigateToUserInbox = this.navigateToUserInbox.bind(this);
    this.navigateToGuideInbox = this.navigateToGuideInbox.bind(this);
  }

  navigateToUserInbox() {
    this.props.navigation.navigate('UserInbox');
  }

  navigateToGuideInbox() {
    this.props.navigation.navigate('GuideInbox');
  }

  render() {
    return (
      <View>
        <Text>InboxChoiceScreen rendering OK</Text>
        <Button
          small
          raised
          icon={{name: 'mail-outline'}}
          backgroundColor='green'
          title='User Inbox Button'
          buttonStyle={{marginTop: 10}}
          onPress={this.navigateToUserInbox}
        />
        <Button
          small
          raised
          icon={{name: 'mail-outline'}}
          backgroundColor='blue'
          title='Guide Inbox Button'
          buttonStyle={{marginTop: 10}}
          onPress={this.navigateToGuideInbox}
        />
      </View>
    )
  }
}

