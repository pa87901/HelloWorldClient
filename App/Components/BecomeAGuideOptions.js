import React from 'react';
import { AsyncStorage, StyleSheet, Text, ScrollView, Image } from 'react-native';
import {
  Button, List, ListItem
} from 'react-native-elements';
import { connect } from 'react-redux';
import { authenticate } from '../Actions/authActions'; 
import { setUserProfile } from '../Actions/userProfileActions';
import axios from '../axios'

export default class BecomeAGuideOptions extends React.Component {
  constructor(props){
    super(props);

    this.navigateToGuideQuestions1 = this.navigateToGuideQuestions1.bind(this);
    this.navigateToSpecialtiesSetting = this.navigateToSpecialtiesSetting.bind(this);
  }

  navigateToGuideQuestions1() {
    this.props.navigation.navigate('GuideQuestions1');
  }

  navigateToSpecialtiesSetting() {
    this.props.navigation.navigate('SpecialtiesSetting');
  }

  render() {
     return (
      <ScrollView>  
        <List>
          <ListItem
            hideChevron={true}
            leftIcon={{name: 'directions-walk'}}
            title="Create Post"
            onPress={this.navigateToGuideQuestions1}
          />
          <ListItem
            hideChevron={true}
            leftIcon={{name: 'help-outline'}}
            title="Set Specialties"
            onPress={this.navigateToSpecialtiesSetting}
          />
          <ListItem
            hideChevron={true}
            leftIcon={{name: 'feedback'}}
            title="Scheduled & Requested Tours"
          />
        </List>
      </ScrollView> 
    );
  }
}