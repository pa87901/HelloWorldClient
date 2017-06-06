import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Button, Text} from 'react-native';
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
    return (
      <ScrollView>
        <Text>HELLO FROM THE GUIDE TRIP SCREEN!</Text>
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