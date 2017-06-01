import React from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import ExploreScreen from './ExploreScreen';
import ExploreScreenEntry from './ExploreScreenEntry';
import TripsScreen from './TripsScreen';
import InboxScreen from './InboxScreen';
import ProfileScreen from './ProfileScreen';

const SearchNavigator = TabNavigator({
  Explore: {
    screen: ExploreScreenEntry,
    navigationOptions: {
        tabBarLabel: 'Explore',
        tabBarIcon: ({ tintColor }) => <Icon name="location-city" size={25} color={"dimgray"}/>
      }
    }, 
  Trips: {
    screen: TripsScreen,
    navigationOptions: {
      tabBarLabel: 'Trips',
      tabBarIcon: ({ tintColor }) => <Icon name="flight" size={25} color={'dimgray'}/>
    }
  },
  Inbox: {
    screen: InboxScreen,
    navigationOptions: {
      tabBarLabel: 'Inbox',
      tabBarIcon: ({ tintColor }) => <Icon name="mail" size={25} color={'dimgray'}/>
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="person" size={25} color={'dimgray'}/>
    }
  }
});

export default SearchNavigator;