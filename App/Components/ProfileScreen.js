import React from 'react';
import { AsyncStorage, StyleSheet, Text, ScrollView, Image } from 'react-native';
import {
  Card, Button, List, ListItem
} from 'react-native-elements';
import { connect } from 'react-redux';
import { authenticate } from '../Actions/authActions'; 
import { setUserProfile } from '../Actions/userProfileActions';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToGuideQuestions1 = this.navigateToGuideQuestions1.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    AsyncStorage.setItem('profile', '');
    AsyncStorage.setItem('authToken', '');
    this.props.dispatch(authenticate(false));
    this.props.dispatch(setUserProfile(false));
  }

  navigateToGuideQuestions1() {
    this.props.navigation.navigate('GuideQuestions1');
  }

  render() {
    //console.log('ProfileScreenState', this.props.userProfile)
    return (
      <ScrollView>
        <Card
          title={this.props.userProfile.profile.name}
        >
          <Image source={{uri: this.props.userProfile.profile.picture}} style={{width: 50, height: 50}} />
          <Text style={{textAlign: 'center'}}>
            How Are You Feeling Today?
          </Text>
        </Card>  
        <List>
          <ListItem
            hideChevron={true}
            leftIcon={{name: 'directions-walk'}}
            title="Become a Guide"
            onPress={this.navigateToGuideQuestions1}
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
          <ListItem
            hideChevron={true}
            leftIcon={{name: 'flight-takeoff'}}
            title="Logout"
            onPress={this.logout}
          />
        </List>
      </ScrollView> 
    );
  }
}


const mapStateToProps = state =>(state);

export default connect(mapStateToProps)(ProfileScreen); 