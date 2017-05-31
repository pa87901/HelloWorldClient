import React from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import ExploreScreen from './ExploreScreen';
import Tab2Screen from './Tab2Screen';
import Tab3Screen from './Tab3Screen';
import Tab4Screen from './Tab4Screen';
import { Icon } from 'react-native-elements';

const SearchNavigator = TabNavigator({
  Explore: {
    screen: ExploreScreen,
    navigationOptions: {
        tabBarLabel: 'Explore',
        tabBarIcon: ({ tintColor }) => <Icon name="explore" size={35}/>
      }
    },
  Trips: {
    screen: Tab2Screen,
    navigationOptions: {
        tabBarLabel: 'Trips',
        tabBarIcon: ({ tintColor }) => <Icon name="flight" size={35}/>
      }
  },
  Inbox: {
    screen: Tab3Screen,
    navigationOptions: {
        tabBarLabel: 'Inbox',
        tabBarIcon: ({ tintColor }) => <Icon name="email" size={35}/>
      }
    },
  Profile: {
    screen: Tab4Screen,
    navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => <Icon name="person" size={35}/>
      }
    }
});

export default SearchNavigator;