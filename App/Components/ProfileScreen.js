import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import {
  Card, Button, List, ListItem
} from 'react-native-elements';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToGuideQuestions = this.navigateToGuideQuestions.bind(this);
  }

  navigateToGuideQuestions() {
    this.props.navigation.navigate('GuideQuestions');
  }

  render() {
    return (
      <ScrollView>
        <Card
          title='Full Name'
          image={require('./JONSNOW.png')}
        >
          <Text style={{textAlign: 'center'}}>
            How Are You Feeling Today?
          </Text>
        </Card>  
        <List>
          <ListItem
            hideChevron={true}
            leftIcon={{name: 'directions-walk'}}
            title="Become a Guide"
            onPress={this.navigateToGuideQuestions}
          />
          <ListItem
            hideChevron={true}
            leftIcon={{name: 'help-outline'}}
            title="Help & Support"
          />
          <ListItem
            hideChevron={true}
            leftIcon={{name: 'feedback'}}
            title="Provide Feedback"
          />
        </List>
      </ScrollView> 
    );
  }
}