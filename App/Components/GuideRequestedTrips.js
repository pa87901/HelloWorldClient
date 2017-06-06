import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class GuideRequestedTrips extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.props.booking.requestedGuideBookings.map((booking, key) => {
              bookingDate = new Date(booking.date);

              return (
                <ListItem
                  key={key}
                  title={`${booking.user.full_name} (${booking.user.avg_rating})`}
                  subtitle={
                    `Requested Date: ${bookingDate.getMonth()}/${bookingDate.getDate()}/${bookingDate.getFullYear()}`}
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