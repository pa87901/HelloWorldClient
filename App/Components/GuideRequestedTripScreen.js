import React from 'react';
import { connect } from 'react-redux';
import { Image, TouchableOpacity, TouchableHighlight, ScrollView, Text, View, Modal } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button, Card, TextInput, List, ListItem } from 'react-native-elements';
import Toolbar from 'react-native-toolbar';
import { setRequestedGuideBookings } from '../Actions/bookingActions';
import axios from '../axios';
import Utils from '../Utils';
import Stars from 'react-native-stars-rating';
import styles from './styles.js';



class GuideRequestedTripScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptModalVisible: false,
      acceptConfirmVisible: false,
    }
    this.handleAcceptButton = this.handleAcceptButton.bind(this);
    this.handleAcceptConfirm = this.handleAcceptConfirm.bind(this);
    this.handleDeclineButton = this.handleDeclineButton.bind(this);
    this.handleDeclineConfirm = this.handleDeclineConfirm.bind(this);
    this.navigateToGuideOptions = this.navigateToGuideOptions.bind(this);
  }

  handleAcceptButton() {
    this.setState({
      acceptModalVisible: !this.state.acceptModalVisible
    })
  }

  handleAcceptConfirm() {
    let selectedBooking = this.props.booking.selectedRequestedBooking;
    let bookingId = selectedBooking.id;

    axios.put('api/bookings', {bookingId: bookingId, status: 'confirmed'})
    .then(res => {
      axios.get(`api/bookings/requested/guide/${this.props.userProfile.profile.userId}`)
      .then(res => {
        this.props.dispatch(setRequestedGuideBookings(res.data[0].bookings));
      })
    })
    .catch(err => {
      console.log(err);
    })

    this.setState({
      acceptModalVisible: !this.state.acceptModalVisible,
      acceptConfirmVisible: !this.state.acceptConfirmVisible
    })
  }

  handleDeclineButton() {
    this.setState({
      declineModalVisible: !this.state.declineModalVisible
    })
  }

  handleDeclineConfirm() {
    let selectedBooking =  this.props.booking.selectedRequestedBooking;
    let bookingId = selectedBooking.id;

    axios.put('api/bookings', {bookingId: bookingId, status: 'declined'})
    .then(res => {
      axios.get(`api/bookings/requested/guide/${this.props.userProfile.profile.userId}`)
      .then(res => {
        this.props.dispatch(setRequestedGuideBookings(res.data[0].bookings));
      })
    })
    .catch(err => {
      console.log(err);
    })

    this.props.navigation.navigate('GuideTrips');

  }

  navigateToGuideOptions() {
    const resetToGuideOptions = NavigationActions.reset({
      index: 3,
      actions: [
        NavigationActions.navigate({routeName: 'Search'}),
        NavigationActions.navigate({routeName: 'Explore'}),
        NavigationActions.navigate({routeName: 'ProfileScreen'}),
        NavigationActions.navigate({routeName: 'GuideOptions'}),
      ]
    })
    
    this.props.navigation.dispatch(resetToGuideOptions);    
  }

  render() {

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
    
    //let selectedBooking = this.props.booking.selectedRequestedBooking;
    let reqDate = new Date();
    let reqDateFormatted = `${reqDate.getMonth() + 1}/${reqDate.getDate()}/${reqDate.getFullYear()}`
    let adjustTime = time =>
      time < 12 ? `${time} AM` : time === 12 ? `12 PM` : `${time - 12} PM`;
    let selectedBooking= {
        "id": 62,
        "user_id": 16,
        "guide_id": 6,
        "city": "San Francisco, CA, United States",
        "start_date_hr": "2017-10-10T20:00:00.000Z",
        "end_date_hr": "2017-10-10T21:00:00.000Z",
        "status": "requested",
        "cancelled_by": null,
        "cancelled_at": null,
        "confirmed_at": null,
        "completed_at": null,
        "base_fee": null,
        "tips": "0.00",
        "user_rating": null,
        "user_review": null,
        "guide_rating": "0.00",
        "guide_review": "",
        "created_at": "2017-06-15T21:55:31.601Z",
        "updated_at": "2017-06-15T21:55:31.601Z",
        "user": {
          "id": 16,
          "facebook_id": "facebook|10207309921705383",
          "full_name": "Alex Liang",
          "guide": false,
          "email": "0parallel@gmail.com",
          "avatar": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13528706_10205105740442229_8619736897622577090_n.jpg?oh=93f960089e18618fc8de089c0199f97b&oe=59D2E7CD",
          "picture": "https://scontent.xx.fbcdn.net/v/t31.0-1/13502823_10205105740442229_8619736897622577090_o.jpg?oh=395ddb46ca0b9ae2ffde6bfc04085890&oe=59E1173F",
          "avg_rating": "0.00",
          "rating_count": 0,
          "created_at": "2017-06-15T02:04:15.213Z",
          "updated_at": "2017-06-15T02:04:15.213Z"
        }}
      
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Toolbar
        backgroundColor='#FF8C00'
        toolbarHeight={35}
        ref={(toolbar) => { this.toolbar = toolbar; }}
        presets={toolbarSetting}
        />
        <View style={styles.orangeBar}/>
        <ScrollView style={styles.orangeTintProfileContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.profileHeaderContainer}>
              <Text style={styles.profileHeader}>{selectedBooking.city}</Text>
              <Text style={styles.profileHeader}>{Utils.time.displayDate(new Date(selectedBooking.start_date_hr).toDateString())}, {Utils.time.convert24ToAmPm(this.props.search.fromHour)} - {Utils.time.convert24ToAmPm(selectedBooking.end_date_hr)}</Text>
            </View>
            <View style={styles.profileCard}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.profileName}>{selectedBooking.user.full_name}</Text>
              </View>
              <View style={{ flex: 1, marginTop: 8, marginBottom: 6, alignItems: 'center' }}>
                <Stars
                  rateMax={5}
                  rate={Math.ceil(selectedBooking.user.avg_rating)}
                  size={25}
                />
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image
                  source={{ uri: selectedBooking.user.picture }}
                  style={styles.profileImage}
                />
              </View>
              <View style={{ flex: 1, paddingLeft: 20, marginTop: 10 }}>
                <Text style={styles.profileSubheader}>Reviews</Text>
              </View>
              <View>
                <List style={styles.reviewList}>
                  {this.props.profileSelection.selectedProfile.bookings.map((review, i) =>
                      <ListItem
                        key={i}
                        roundAvatar
                        avatar={{ uri: review.userAvatar }}
                        hideChevron={true}
                        containerStyle={styles.listItem}
                        title={review.userFullName}
                        subtitle={`Rating: ${Math.floor(review.rating)}. ${review.review}`}
                      />
                  )}
                </List>
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType={'none'}
          transparent={true}
          visible={this.state.acceptModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Text style={styles.profileSubheader}>'Please Read'</Text>
              </View>
              <View style={styles.textInputContainer}>
              </View>
              <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Text style={{ height: 50, fontFamily: 'Arial', fontSize: 14 }}>We are excited you are about to accept the request! In order to protect both you and customer's experiences, we are offering allowance of up to two weeks prior to scheduled trip during which you can cancel / decline the trip without any penalties. Thereafter, you will be charged per Localize's late cancelation fee schedule set forth in our policies.</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.inquirySubmitButton}
                onPress={this.handleAcceptConfirm}
              >
                <Text style={styles.inquirySubmitText}>Confirm Booking!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.doubleButtonContainer}>
          <TouchableHighlight
            style={styles.affirmativeButton}
            onPress={this.handleAcceptButton}
          >
            <Text style={styles.doubleButtonText}>Confirm</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.negativeButton}
            onPress={this.handleDeclineConfirm}
          >
            <Text style={styles.doubleButtonText}>Decline</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
    
  static navigationOptions = ({ navigation }) => ({
    header: null
  })
}



const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideRequestedTripScreen);