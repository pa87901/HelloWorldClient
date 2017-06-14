import React from 'react';
import { AsyncStorage, StyleSheet, Text, ScrollView, Image } from 'react-native';
import {
  Card, Button, List, ListItem
} from 'react-native-elements';
import { connect } from 'react-redux';
import { authenticate } from '../Actions/authActions'; 
import { setUserProfile } from '../Actions/userProfileActions';
import { setRequestedGuideBookings } from '../Actions/bookingActions';
import axios from '../axios';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.navigateToGuideOptions = this.navigateToGuideOptions.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    AsyncStorage.setItem('profile', '');
    AsyncStorage.setItem('authToken', '');
    this.props.dispatch(authenticate(false));
    this.props.dispatch(setUserProfile(false));
  }

  test() {
    // Alex's test
    // console.log(this.props.userProfile.profile)
    // axios.post('api/users', this.props.userProfile.profile)
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    // Charles's test
    this.props.navigation.navigate('CardFormScreen');
  }

  navigateToGuideOptions() {
    this.props.navigation.navigate('GuideOptions');

    axios.get(`api/specialties/${this.props.userProfile.profile.userId}`)
    .then(res => {
      res.data[0].guideSpecialties.forEach(specialtyObj => {
        var specialtyItem = specialtyObj.specialty.specialty;
        this.props.dispatch(this.state[specialtyItem](true));
      });
    })
    .catch(err => {
      console.log(err);
    });

    axios.get(`api/bookings/requested/guide/${this.props.userProfile.profile.userId}`)
    .then(res => {
      this.props.dispatch(setRequestedGuideBookings(res.data[0].bookings));
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    console.log('PROPS', this.props);

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
            onPress={this.navigateToGuideOptions}
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