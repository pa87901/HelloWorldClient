import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'

class TripsScreen extends React.Component {
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

//Waiting for db methods/trips to dynamically render
  render() {
    const styles = {
      subheader: {
        fontSize: 20,
        marginTop: 10
      },
    };
    console.log('---TRIP PROPS---', this.props)
    
    return (
      <ScrollView>
          <Text>Trips As A Tourist</Text>
        <Card>
          <Text style={styles.subheader}>
            City
          </Text>
          <Text>
            San Francisco, CA
          </Text>
          <Text style={styles.subheader}>
            Guide
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
  
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Button title='Explore' onPress={() => navigation.navigate('Explore')}/>,
    headerRight: <Button title='Guide Trips' onPress={() => navigation.navigate('GuideTrips')}/>
  })
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(TripsScreen);