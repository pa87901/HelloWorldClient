import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableHighlight, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { setTouristBookings } from '../Actions/bookingActions';
import axios from '../axios';
import Stars from 'react-native-stars-rating';
import styles from './styles.js';
import Utils from '../Utils';
import Toolbar from 'react-native-toolbar';


class TripsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      touristBookings: [],
      reviewModalVisible: false,
      tipsModalVisible: false,
      rating: 0,
      review: '',
      tips: '0',
      activeCard: null
    };

    this.navigateToExplore = this.navigateToExplore.bind(this);
    this.toggleReviewModal = this.toggleReviewModal.bind(this);
    this.toggleTipsModal = this.toggleTipsModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  }

  componentDidMount() {
    // console.log('HEY FROM THE TRIPSCREEN', this.props.userProfile.profile.userId);
    axios.get(`api/bookings/all/user/${this.props.userProfile.profile.userId}`)
      .then(res => {
        this.props.dispatch(setTouristBookings(res.data))
        this.setState({touristBookings: res.data})
      })
  }

  navigateToExplore() {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Search' }),
        NavigationActions.navigate({ routeName: 'Explore' }),
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }

  navigateBack() {
    this.props.navigation.navigate('Explore');
  } 

  onSubmit(){
    axios.put(`api/bookings/guide/rrt`, {
        bookingId: this.props.booking.touristBookings[0].bookings[this.state.activeCard].id, 
        guide_review: this.state.review,
        guide_rating: this.state.rating,
        tips: this.state.tips
      })
      .then(res => {})
      .catch(err => {
        console.log(err);
      })

    this.toggleTipsModal(false);
  }

  toggleReviewModal(state) {
    this.setState({
      reviewModalVisible: state
    })
  }

  toggleTipsModal(state) {
    this.setState({
      tipsModalVisible: state
    });
    this.toggleReviewModal(false);
  }

  
//Waiting for db methods/trips to dynamically render
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
    
    if (this.state.touristBookings[0]) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Toolbar
        backgroundColor='#FF8C00'
        toolbarHeight={35}
        ref={(toolbar) => { this.toolbar = toolbar; }}
        presets={toolbarSetting}
        />
        <View style={styles.orangeBar}/>
        <ScrollView style={styles.orangeContainer}>
          <View>
          <Modal
            animationType={"none"}
            transparent={false}
            visible={this.state.reviewModalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            <View style={{marginTop: 22}}>
              <View>
                <Text>Review Your Guide!</Text>
                <Stars
                  isActive={true}
                  rateMax={5}
                  isHalfStarEnabled={false}
                  onStarPress={(rating) => {this.setState({rating: rating})}}
                  rate={0}
                  size={60}
                />
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(review) => this.setState({review: review})}
                  value={this.state.review}
                />
                <TouchableHighlight
                  onPress={()=>{this.toggleTipsModal(true)}}
                >
                  <Text>Next!</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>
          {/*Tip Modal */}
          <Modal
            animationType={"none"}
            transparent={false}
            visible={this.state.tipsModalVisible}
            >
            <View style={{marginTop: 22}}>
              <View>
                <Text>Tip Your Guide!</Text>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(tips) => this.setState({tips: tips})}
                  keyboardType='numeric'
                  value={this.state.tips}
                />
                <TouchableHighlight
                  onPress={this.onSubmit}
                >
                  <Text>Submit</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>
          </View>
          <View>
          <Text style={styles.tripHeader}>Trips As A Tourist</Text> 
          </View>
          {this.state.touristBookings[0].bookings.map((booking, i) => {
            return (
            <View>
            <Card 
              key={i}
              flexDirection='column'
            >
            <View style={styles.searchCardContainer}>
              <Text style={styles.TripCardText}>
                {booking.city}{"\n"}
                with {booking.guide.user.full_name}
              </Text>
              <Text style={styles.orangeTripCardText}>
                {new Date(booking.start_date_hr).toDateString()}, {Utils.time.convert24ToAmPm(new Date(booking.start_date_hr).getHours())} - {Utils.time.convert24ToAmPm(new Date(booking.end_date_hr).getHours())}
                {"\n"}
              </Text>
              <Text style={{fontSize: 10, fontFamily: 'Arial Rounded MT Bold'}}>
                Status
                {"\n"}
              <Text style={styles.TripCardText}>
                {booking.status}
              </Text>
              </Text>
              {/*<Button title='Map' onPress={()=>{this.props.navigation.navigate('MapScreen', {bookingId: this.props.booking.touristBookings[i].id})}}/>*/}
              {/*<Button title='Review' onPress={()=>{
                this.setState({activeCard : i})
                this.toggleReviewModal(true)
                }} />
                <Button
                title="Itinerary" 
                onPress={() => this.props.navigation.navigate('TouristItinerary', {bookingId: this.props.booking.touristBookings[0].bookings[i].id})}
                >
          </Button>*/}
              </View>
              <Text>
                {"\n"}
              </Text>
              <View style={styles.doubleButtonContainer}>
                <TouchableOpacity
                  style={styles.smallAffirmativeButton}
                  onPress={()=>{this.props.navigation.navigate('TouristItinerary', {bookingId: this.props.booking.touristBookings[0].bookings[i].id})}}
                >
                  <Text style={styles.smallDoubleButtonText}>Itinerary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.smallNegativeButton}
                  onPress={ () => {
                    this.setState({activeCard : i})
                    this.toggleReviewModal(true)
                  }}
                >
                  <Text style={styles.smallDoubleButtonText}>Review</Text>
                </TouchableOpacity>
              </View>
            </Card>
              </View>
            )
          })}
        </ScrollView>
        </View>
      ); 
    } else {
      return (
        <View style={styles.orangeContainer}></View>
      ); 
    }
  }
  
  static navigationOptions = ({ navigation }) => ({
    // headerLeft: <Button title='Explore' onPress={() => navigation.navigate('Explore')}/>,
    // headerRight: <Button title='Guide Trips' onPress={() => navigation.navigate('GuideTrips')}/>
    header: null
  })
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(TripsScreen);
    // const styles = {
    //   subheader: {
    //     fontSize: 20,
    //     marginTop: 10
    //   },
    // };