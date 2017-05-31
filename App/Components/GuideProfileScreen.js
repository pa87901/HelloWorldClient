import React from 'react';
import { Text, ScrollView } from 'react-native';

export default class GuideProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <Text>This is Guide Profile View</Text>
      </ScrollView>
    );
  }
}