import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Button, Text} from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
// import {} from 'react-native-elements';

class GuideTripsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.navigateToExplore = this.navigateToExplore.bind(this);
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
     const styles = {
      subheader: {
        fontSize: 20,
        marginTop: 10
      },
    };

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
    headerRight: <Button title='Tourist Trips' onPress={() => navigation.navigate('Trips')}/>
  })

}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideTripsScreen);