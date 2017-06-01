import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import ChatScreen from './ChatScreen';

export default class InboxScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text> INBOX </Text>
      </View> 
    );
  }
}