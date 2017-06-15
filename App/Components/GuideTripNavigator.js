import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import ExploreScreenEntry from './ExploreScreenEntry';
import TripsScreen from './TripsScreen';
import InboxScreen from './InboxScreen';
import ProfileScreen from './ProfileScreen';
import PreInboxScreen from './PreInboxScreen';
import NewInboxScreen from './NewInboxScreen';
import GuideTripsScreen from './GuideTripsScreen';

const GuideTripNavigator = TabNavigator({
  Trips: {
    screen: GuideTripsScreen,
    navigationOptions: {
      tabBarLabel: 'Trips',
      tabBarIcon: ({ tintColor }) => <Icon name="flight" size={25} color={'dimgray'}/>
      //headerRight: <Button title='See Guide Trips' onPress={console.log('show me the guide page!')}/>
    }
  },
  Explore: {
    screen: ExploreScreenEntry,
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: ({ tintColor }) => <Icon name="location-city" size={25} color={'dimgray'}/>
    }
  }, 
  Inbox: {
    screen: NewInboxScreen,
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

export default GuideTripNavigator;