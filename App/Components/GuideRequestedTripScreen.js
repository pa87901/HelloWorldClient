import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Modal } from 'react-native';
import { Button, Card, Divider, List, ListItem } from 'react-native-elements';
import axios from '../axios';

class GuideRequestedTripScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptModalVisible: false,
      declineModalVisible: false
    }
    this.handleAcceptButton = this.handleAcceptButton.bind(this);
    this.handleAcceptConfirm = this.handleAcceptConfirm.bind(this);
    this.handleDeclineButton = this.handleDeclineButton.bind(this);
    this.handleDeclineConfirm = this.handleDeclineConfirm.bind(this);
  }

  handleAcceptButton() {
    this.setState({
      acceptModalVisible: !this.state.acceptModalVisible
    })
  }

  handleAcceptConfirm() {
    let selectedIndex = this.props.booking.selectedRequestedBooking;
    let selectedBooking = this.props.booking.requestedGuideBookings[selectedIndex];
    let bookingId = selectedBooking.id;

    axios.put('api/bookings', {bookingId: bookingId, status: 'confirmed'})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })

    this.handleAcceptButton();
  }

  handleDeclineButton() {
    this.setState({
      declineModalVisible: !this.state.declineModalVisible
    })
  }

  handleDeclineConfirm() {
    let selectedIndex = this.props.booking.selectedRequestedBooking;
    let selectedBooking = this.props.booking.requestedGuideBookings[selectedIndex];
    let bookingId = selectedBooking.id;

    axios.put('api/bookings', {bookingId: bookingId, status: 'declined'})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })

    this.handleDeclineButton();
  }

  render() {
    let selectedIndex = this.props.booking.selectedRequestedBooking;
    let selectedBooking = this.props.booking.requestedGuideBookings[selectedIndex];
    let reqDate = new Date(selectedBooking.date);
    let reqDateFormatted = `${reqDate.getMonth() + 1}/${reqDate.getDate()}/${reqDate.getFullYear()}`

    return (
      <ScrollView>
        <Card
          title={`${selectedBooking.user.full_name} (${selectedBooking.user.avg_rating})`}
          image={{uri: selectedBooking.user.picture}}
        >
          <Text>
            Requested Date: {reqDateFormatted}
          </Text>
          <Text>
            Requested Start / End Time: 9am / 5pm
          </Text>
          <Text style={{marginBottom: 10}}>
            Requested City: San Francisco
          </Text>
          <Divider />
          <Text style={styles.subheader}>
            Reviews
          </Text>
          <List style={styles.list}>
            <ListItem
              roundAvatar
              avatar={require('./JONSNOW.png')}
              hideChevron={true}
              containerStyle={styles.listItem}
              title='guide1'
              subtitle='Rating: 4. The User was great!'
            />
            <ListItem
              roundAvatar
              avatar={require('./JONSNOW.png')}
              hideChevron={true}
              containerStyle={styles.listItem}
              title='guide2'
              subtitle='Rating: 3. Meh'
            /><ListItem
              roundAvatar
              avatar={require('./JONSNOW.png')}
              hideChevron={true}
              containerStyle={styles.listItem}
              title='guide3'
              subtitle='Rating: 1. I hated the experience.'
            />
          </List>
          <Button
            small
            raised
            icon={{name: 'thumb-up'}}
            backgroundColor='#5AAF5A'
            title='Accept Request'
            buttonStyle={{marginTop: 10}}
            onPress={this.handleAcceptButton}
          />
          <Button
            small
            raised
            icon={{name: 'thumb-down'}}
            backgroundColor='#D1686D'
            title='Decline Request'
            buttonStyle={{marginTop: 10}}
            onPress={this.handleDeclineButton}
          />
        </Card>
        <Modal
          animationType={'none'}
          transparent={true}
          visible={this.state.acceptModalVisible}
          onRequestClose={this.handleAcceptButton}
        >
          <View style={styles.modal}>
            <Card
              title='Confirmation'
            >
              <Text>
                We are excited you are about to accept the request! In order to protect both you and customer's experiences, we are offering allowance of up to two weeks prior to scheduled trip during which you can cancel / decline the trip without any penalties. Thereafter, you will be charged per Localize's late cancelation fee schedule set forth in our policies.
              </Text>
              <Button
                small
                raised
                icon={{name: 'sentiment-very-satisfied'}}
                backgroundColor='#5AAF5A'
                title='Confirm and Accept'
                buttonStyle={{marginTop: 10}}
                onPress={this.handleAcceptConfirm}
              />
              <Button
                small
                raised
                icon={{name: 'exit-to-app'}}
                backgroundColor='#787D7F'
                title='Go Back'
                buttonStyle={{marginTop: 10}}
                onPress={this.handleAcceptButton}
              />
            </Card>
          </View>
        </Modal>
        <Modal
          animationType={'none'}
          transparent={true}
          visible={this.state.declineModalVisible}
          onRequestClose={this.handleDeclineButton}
        >
          <View style={styles.modal}>
            <Card
              title='Are You Sure?'
            >
              <Text>
                We are sad to see that you are about to decline this request :( Are you sure you would like to decline this request? You will not be able to view this request any further.
              </Text>
              <Button
                small
                raised
                icon={{name: 'sentiment-very-dissatisfied'}}
                backgroundColor='#D1686D'
                title='Confirm and Decline'
                buttonStyle={{marginTop: 10}}
                onPress={this.handleDeclineConfirm}
              />
              <Button
                small
                raised
                icon={{name: 'exit-to-app'}}
                backgroundColor='#787D7F'
                title='Go Back'
                buttonStyle={{marginTop: 10}}
                onPress={this.handleDeclineButton}
              />
            </Card>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

const styles = {
  subheader: {
    fontSize: 20,
    marginTop: 10
  },
  list: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(120, 125, 127, 0.4)',
    flexDirection: 'row',
    alignItems: 'center'
  },
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideRequestedTripScreen);