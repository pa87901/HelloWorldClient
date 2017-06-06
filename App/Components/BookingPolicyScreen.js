import React from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'react-native-elements';
import axios from '../axios.js';


class BookingPolicyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToConfirmation = this.navigateToConfirmation.bind(this);
    this.bookTour = this.bookTour.bind(this);
  }

  bookTour(){
    let options = {
      travelerId: this.props.userProfile.profile.userId,
      guideFacebookId: this.props.profileSelection.selectedProfile.user.facebook_id,
      city: this.props.search.city,
      startHr: 9,
      endHr: 17,
      date: this.props.search.date
    };
    
    axios.post('api/bookings', options)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  navigateToConfirmation() {
    // create axios call to create a booking
    
    this.bookTour();
    this.props.navigation.navigate('BookingConfirmation');
  }

  render() {
    console.log('PROPS', this.props);

    return (
      <ScrollView>
        <Card
          title='Terms & Conditions'
        >
          <Text style={{marginBottom: 10}}>
            HelloWorld enforces terms to protect both tourist(s) and guide alike. Tourist(s) may cancel and review any penalties by viewing their travel plans and then clicking ‘Cancel’ on the appropriate reservation.
          </Text>
          <Button
            small
            raised
            icon={{name: 'check-circle'}}
            backgroundColor='#FF8C00'
            title='Confirm and Request a Tour!'
            buttonStyle={{marginTop: 10}}
            onPress={this.navigateToConfirmation}
          />
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(BookingPolicyScreen);