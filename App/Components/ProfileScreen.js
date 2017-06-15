import React from 'react';
import {
  AsyncStorage, Text, ScrollView, View, Image, Modal, TextInput, TouchableOpacity
} from 'react-native';
import {
  Card, Button, List, ListItem
} from 'react-native-elements';
import { connect } from 'react-redux';
import { authenticate } from '../Actions/authActions'; 
import { setUserProfile } from '../Actions/userProfileActions';
import { setRequestedGuideBookings } from '../Actions/bookingActions';
import axios from '../axios';
import styles from './styles';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      helpVisible: false,
      feedbackVisible: false,
      helpInquiry: '\n'
    };
    this.navigateToGuideOptions = this.navigateToGuideOptions.bind(this);
    this.logout = this.logout.bind(this);
    this.handleHelpClick = this.handleHelpClick.bind(this);
  }

  logout() {
    AsyncStorage.setItem('profile', '');
    AsyncStorage.setItem('authToken', '');
    this.props.dispatch(authenticate(false));
    this.props.dispatch(setUserProfile(false));
  }

  navigateToGuideOptions() {
    this.props.navigation.navigate('GuideOptions');

    axios.get(`api/specialties/${this.props.userProfile.profile.userId}`)
    .then(res => {
      res.data[0].guideSpecialties.forEach(specialtyObj => {
        const specialtyItem = specialtyObj.specialty.specialty;
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

  handleHelpClick() {
    this.setState({
      helpVisible: !this.state.helpVisible
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
            onPress={this.handleHelpClick}
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
        <Modal
          animationType={'none'}
          transparent={true}
          visible={this.state.helpVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={styles.profileSubheader}>How can we help?</Text>
              </View>
              <View style={{ paddingLeft: 20, marginBottom: 5 }}>
                <Text style={{ fontFamily: 'Arial', fontSize: 14 }}>Ask us anything:</Text>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={{ height: 50, fontFamily: 'Arial', fontSize: 14, textAlign: 'justify' }}
                  multiline={true}
                  value={this.state.helpInquiry}
                  onChange={(text) => this.setState({ helpInquiry: text })}
                  placeholder={'\n I would like to get help on...'}
                  placeholderTextColor='grey'
                />
              </View>
              <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Text style={{ height: 50, fontFamily: 'Arial', fontSize: 14 }}>Localize Customer Happiness will be in touch within the next 24 hours!</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.inquirySubmitButton}
                onPress={this.handleHelpClick}
              >
                <Text style={styles.inquirySubmitText}>Submit help inquiry</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView> 
    );
  }
}


const mapStateToProps = state =>(state);

export default connect(mapStateToProps)(ProfileScreen); 