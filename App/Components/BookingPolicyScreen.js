import React from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { PricingCard, Card, Button } from 'react-native-elements';
import axios from '../axios.js';
import stripe from 'tipsi-stripe';
import testID from '../Utils/testID';
import { STRIPE_PUBLISHABLE_KEY } from '../Config/config';

stripe.init({
  publishableKey: STRIPE_PUBLISHABLE_KEY
});

class BookingPolicyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      token: null
    };

    this.navigateToConfirmation = this.navigateToConfirmation.bind(this);
    this.bookTour = this.bookTour.bind(this);
  }

  bookTour() {
    const options = {
      travelerId: this.props.userProfile.profile.userId,
      guideFacebookId: this.props.profileSelection.selectedProfile.user.facebook_id,
      city: this.props.search.city,
      startHr: 9,
      endHr: 17,
      date: this.props.search.date
    };
    
    axios.post('api/bookings', options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  navigateToConfirmation() {
    // create axios call to create a booking
    
    this.bookTour();
    this.props.navigation.navigate('BookingConfirmation');
  }

  render() {
    console.log('PROPS', this.props);

    const handleCardPayPress = async () => {
      try {
        this.setState({
          loading: true,
          token: null
        });
        const token = await stripe.paymentRequestWithCardForm({
          smsAutofillDisabled: true,
          requiredBillingAddressFields: 'full',
          managedAccountCurrency: 'usd',
        });

        console.log('RESULT', token);
        this.setState({
          loading: false,
          token,
        });

        this.props.navigation.navigate('BookingConfirmation');
      } catch (error) {
        console.log('ERROR', error);
        this.setState({
          loading: false,
        });
      }
    };

    const { loading, token } = this.state;

    return (
      <ScrollView>
        <PricingCard
          color='#FF8C00'
          title='Your Total Cost'
          price='$100'
          info={['$10 Per Hour', '9AM - 9PM', 'Authorize Only', 'Payment Will Be Made When Trip Is Confirmed']}
          button={{ title: 'Confirm and Request a Tour!', icon: 'check-circle' }}
          onButtonPress={handleCardPayPress}
        />
        <Card
          title='Terms & Conditions'
        >
          <Text style={{ marginBottom: 10 }}>
            HelloWorld enforces terms to protect both tourist(s) and guide alike. Tourist(s) may cancel and review any penalties by viewing their travel plans and then clicking ‘Cancel’ on the appropriate reservation.
          </Text>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(BookingPolicyScreen);
          

          // <Button
          //   small
          //   raised
          //   icon={{ name: 'check-circle' }}
          //   backgroundColor='#FF8C00'
          //   title='Confirm and Request a Tour!'
          //   buttonStyle={{ marginTop: 10 }}
          //   onPress={this.navigateToConfirmation}
          // />
