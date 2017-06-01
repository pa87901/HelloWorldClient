import React from 'react';
import { Text, ScrollView } from 'react-native';
import {
  Card, Button, Icon, Grid, Row, Divider
} from 'react-native-elements';

export default class BookingConfirmationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToExplore = this.navigateToExplore.bind(this);
  }

  navigateToExplore() {
    this.props.navigation.navigate('ExploreScreenEntry');
  }

  render() {
    const styles = {
      subheader: {
        fontSize: 20,
        marginTop: 10
      },
    };

    return (
      <ScrollView>
        <Card
          title='We Contacted the Guide!'
        >
        <Text style={{marginBottom: 10}}>
          Please wait up to 24 hours for the Guide to review and acknowledge your request. We will send you a confirmation message as soon as the guide accepts or declines your request.
        </Text>
        <Divider />
          <Text style={styles.subheader}>
            Guide
          </Text>
          <Text>
            Guide Name
          </Text>
          <Text style={styles.subheader}>
            City
          </Text>
          <Text>
            San Francisco, CA
          </Text>
          <Text style={styles.subheader}>
            Date & Time
          </Text>
          <Text>
            May 30, 2017
          </Text>
          <Text style={{marginBottom: 10}}>
            9AM / 5PM
          </Text>
          <Button
            small
            raised
            backgroundColor='#FF8C00'
            title='Sounds Good! Take Me Back to Explore'
            fontSize={14}
            buttonStyle={{marginTop: 10}}
            onPress={this.navigateToExplore}
          />
        </Card>
      </ScrollView>
    );
  }
}