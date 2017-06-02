import React from 'react';
import { Text, ScrollView } from 'react-native';
import {
  Card, Button, Icon, Grid, Row, Divider
} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

export default class TripScreenEntry extends React.Component {
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
          title='Your Trips!'
        >
          <Text style={styles.subheader}>
            City
          </Text>
          <Text>
            San Francisco, CA
          </Text>
          <Text style={styles.subheader}>
            Name
          </Text>
          <Text>
            Guide Name
          </Text>
          <Text style={styles.subheader}>
            Date & Time
          </Text>
          <Text>
            May 30, 2017
          </Text>
        </Card>
      </ScrollView>
    );
  }
}