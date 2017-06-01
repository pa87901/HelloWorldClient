import React from 'react';
import { Text, ScrollView } from 'react-native';
import {
  Card, Button, Icon, Grid, Row, Divider
} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

export default class BecomeAGuideQuestionsConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToExplore = this.navigateToExplore.bind(this);
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
          title='You have been posted!'
        >
        <Text style={{marginBottom: 10}}>
          Your profile has been posted on Localize! We will notify you when tourist(s) reach out to you via chat and/or request to have a tour with you.
        </Text>
        <Divider />
          <Text style={styles.subheader}>
            Name
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
          <Text>
            9AM / 5PM
          </Text>
          <Text style={styles.subheader}>
            Specialties
          </Text>
          <Text>
            Nightlife, Sports, Food
          </Text>
          <Text style={styles.subheader}>
            Hourly Rate
          </Text>
          <Text>
            $45.00
          </Text>
          <Text style={styles.subheader}>
            Introduction
          </Text>
          <Text>
            Hello, my name is Guide! I will be glad to show you a good time around SF.
          </Text>
          <Text style={styles.subheader}>
            Other Info
          </Text>
          <Text style={{marginBottom: 10}}>
            I like coding.
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