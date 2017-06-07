import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { setTouristBookings } from '../Actions/bookingActions';
import axios from '../axios';

class TripsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      touristBookings: []
    }

    this.navigateToExplore = this.navigateToExplore.bind(this);
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

//Waiting for db methods/trips to dynamically render
  render() {
    const styles = {
      subheader: {
        fontSize: 20,
        marginTop: 10
      },
    };
    
    if (this.state.touristBookings[0]) {
      return (
        <ScrollView>
            <Text>Trips As A Tourist</Text>
          {this.state.touristBookings[0].bookings.map((booking, i)=>{
            return (
            <Card key={i}>
              <Text style={styles.subheader}>
                City
              </Text>
              <Text>
                {booking.city}
              </Text>
              <Text style={styles.subheader}>
                Guide
              </Text>
              <Text>
                {booking.guide.user.full_name}
              </Text>
              <Text style={styles.subheader}>
                Date & Time
              </Text>
              <Text>
                {booking.date.slice(0, 10)} | {booking.start_hr}:00-{booking.end_hr}:00
              </Text>
              <Text style={styles.subheader}>
                Status
              </Text>
              <Text>
                {booking.status}
              </Text>
            </Card>
            )
          })}
        </ScrollView>
      ); 
    } else {
      return (
        <View></View>
      ); 
    }
  }
  
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Button title='Explore' onPress={() => navigation.navigate('Explore')}/>,
    headerRight: <Button title='Guide Trips' onPress={() => navigation.navigate('GuideTrips')}/>
  })
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(TripsScreen);