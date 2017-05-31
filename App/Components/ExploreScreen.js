import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import ExploreScreenEntry from './ExploreScreenEntry';
import GuideProfileScreen from './GuideProfileScreen';

// const ExploreScreen = DrawerNavigator({
//   ExploreScreenEntry: {
//     screen: ExploreScreenEntry,
//   },
//   GuideProfile: {
//     screen: GuideProfileScreen,
//     // navigationOptions: {
//     //   header: null
//     // }
//   }
// });

// export default ExploreScreen;
export default class ExploreScreen extends React.Component {
  render() {
    return (
      <View>
        <ExploreScreenEntry/>
      </View> 
    );
  }
}
