import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { setSelectedRequestedBooking } from '../Actions/bookingActions';

class GuideRequestedTrips extends React.Component {
  constructor(props){
    super(props);
    this.navigateToGuideRequestedTrip = this.navigateToGuideRequestedTrip.bind(this);
  }

  navigateToGuideRequestedTrip(index) {
    this.props.navigation.navigate('GuideRequestedTripScreen');
    this.props.dispatch(setSelectedRequestedBooking(index));
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.props.booking.requestedGuideBookings.map((booking, key) => {
              let bookingDate = new Date(booking.date);

              return (
                <ListItem
                  key={key}
                  roundAvatar
                  title={`${booking.user.full_name} (${booking.user.avg_rating})`}
                  subtitle={
                    `Requested Date: ${bookingDate.getMonth() + 1}/${bookingDate.getDate()}/${bookingDate.getFullYear()}`
                  }
                  avatar={booking.user.avatar}
                  onPress={() => this.navigateToGuideRequestedTrip(key)}
                />
              )
            }
          )}
        </List>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideRequestedTrips);