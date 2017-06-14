import React from 'react';
import { Text, ScrollView, View, TouchableHighlight, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { PricingCard, Card } from 'react-native-elements';
import Toolbar from 'react-native-toolbar';
import stripe from 'tipsi-stripe';
import axios from '../axios.js';
import config from '../Config/config';
import Utils from '../Utils';
import styles from './styles.js';


class BookingPolicyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      token: null
    };

    this.navigateToConfirmation = this.navigateToConfirmation.bind(this);
    this.bookTour = this.bookTour.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  }

  componentDidMount() {
    stripe.init({
      publishableKey: config.STRIPE_API_KEY
    });
  }

  bookTour() {
    const options = {
      travelerId: this.props.userProfile.profile.userId,
      guideFacebookId: this.props.profileSelection.selectedProfile.user.facebook_id,
      city: this.props.search.city,
      startDateHr: `${this.props.search.date}, ${this.props.search.fromHour}:00`,
      endDateHr: `${this.props.search.date}, ${this.props.search.toHour}:00`,
      date: this.props.search.date,
      availabilityId: this.props.profileSelection.selectedProfile.availabilities[0].id
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
    this.bookTour();
    this.props.navigation.navigate('BookingConfirmation');
  }

  navigateBack() {
    this.props.navigation.goBack();
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

        axios.post('api/payments', { stripeToken: token })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });

        console.log('RESULT', token);
        this.setState({
          loading: false,
          token,
        });

        this.navigateToConfirmation();
      } catch (error) {
        console.log('ERROR', error);
        this.setState({
          loading: false,
        });
      }
    };

    const toolbarSetting = {
        toolbar1: {
          hover: false,
          leftButton: {
            icon: 'chevron-left',
            iconStyle: styles.toolbarIcon,
            iconFontFamily: 'FontAwesome',
            onPress: this.navigateBack,
          },
          title: {
            text: 'LOCALIZE',
            textStyle: styles.toolbarText
          }
      },
    };

    const hourlyRate = this.props.profileSelection.selectedProfile.availabilities[0].hourly_rate;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Toolbar
        backgroundColor='#FF8C00'
        toolbarHeight={35}
        ref={(toolbar) => { this.toolbar = toolbar; }}
        presets={toolbarSetting}
        />
        <View style={styles.orangeBar} />
        <ScrollView style={styles.orangeTintProfileContainer}>
          <View style={{ flex: 1, height: 210 }}>
            <Image
              source={require('../Utils/sanfrancisco.jpg')}
              style={{ height: 210, width: Dimensions.get('window').width, resizeMode: 'contain', verticalAlign: 'text-top' }}
            />
          </View>
          <View style={styles.bookingConfirmDetails}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.profileSubheader}>Tour in {this.props.search.city}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.bookingConfirmDates}>{Utils.time.displayDate(new Date(this.props.search.date).toDateString())}, {Utils.time.convert24ToAmPm(this.props.search.fromHour)} - {Utils.time.convert24ToAmPm(this.props.search.toHour)}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: 'Arial', fontSize: 12 }}>{`$${hourlyRate} Per Hour x ${this.props.search.toHour - this.props.search.fromHour}hr`}</Text>
              <Text style={{ fontFamily: 'Arial', fontSize: 12 }}>Authorize only</Text>
              <Text style={{ fontFamily: 'Arial', fontSize: 12 }}>Payment will be made when trip is confirmed</Text>
            </View>
            <View>
              <Text style={styles.profileSubheader}>{`$${hourlyRate * (this.props.search.toHour - this.props.search.fromHour)}`}</Text>
            </View>
          </View>
          <View style={styles.termsConditions}>
            <View style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontFamily: 'Arial', fontSize: 14, fontWeight: 'bold' }}>Terms & Conditions</Text>
            </View>
            <View>
              <Text style={{ fontFamily: 'Arial', fontSize: 12 }}>Localize enforces terms to protect both tourists and guides alike. Tourist(s) may cancel and review penalties or lack thereof by viewing their travel plans and then clicking ‘Cancel’ on the appropriate reservation.</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.fullWidthButton}
            onPress={handleCardPayPress}
          >
            <Text style={styles.bookingConfirmText}>Confirm and Request a Tour!</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  })
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
