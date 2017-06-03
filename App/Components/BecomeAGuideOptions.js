import React from 'react';
import { AsyncStorage, StyleSheet, Text, ScrollView, Image } from 'react-native';
import {
  Button, List, ListItem
} from 'react-native-elements';
import { connect } from 'react-redux';
import { authenticate } from '../Actions/authActions'; 
import { setUserProfile } from '../Actions/userProfileActions';
import axios from '../axios'

class BecomeAGuideOptions extends React.Component {
  constructor(props){
    super(props);

    this.navigateToGuideQuestions1 = this.navigateToGuideQuestions1.bind(this);
    this.navigateToSpecialtiesSetting = this.navigateToSpecialtiesSetting.bind(this);
  }

  navigateToGuideQuestions1() {
    this.props.navigation.navigate('GuideQuestions1');
  }

  navigateToSpecialtiesSetting() {
    axios.post('api/guides', {facebookId: this.props.userProfile.profile.userId})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })

    this.props.navigation.navigate('SpecialtiesSetting');
  }

  render() {
     console.log('PROPS', this.props);

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

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(BecomeAGuideOptions);