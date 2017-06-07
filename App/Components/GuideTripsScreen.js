import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Button, Text} from 'react-native';
import { Card } from 'react-native-elements';
import { setGuideBookings } from '../Actions/bookingActions';
import { NavigationActions } from 'react-navigation';
import axios from '../axios';
// import {} from 'react-native-elements';

class GuideTripsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guideBookings: []
    }

    this.navigateToExplore = this.navigateToExplore.bind(this);
  }

  componentWillMount() {
    axios.get(`api/bookings/all/guide/${this.props.userProfile.profile.userId}`)
      .then(res => {
        this.props.dispatch(setGuideBookings(res.data))
        this.setState({guideBookings: res.data})
      })
  }

  navigateToExplore() {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Trips' }),
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    console.log('STATE', this.state);

    if (this.state.guideBookings[0]) {
      return (
        <ScrollView>
            <Text>Trips As A Guide</Text>
          {this.state.guideBookings[0].bookings.map((booking, i)=>{
            return (
            <Card key={i}>
              <Text style={styles.subheader}>
                City
              </Text>
              <Text>
                {booking.city}
              </Text>
              <Text style={styles.subheader}>
                Tourist
              </Text>
              <Text>
                {booking.user.full_name}
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
    headerRight: <Button title='Tourist Trips' onPress={() => navigation.navigate('Trips')}/>
  })

}

const styles = {
  subheader: {
    fontSize: 20,
    marginTop: 10
  },
};

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideTripsScreen);