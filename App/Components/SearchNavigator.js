import React from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';
import ExploreNavigator from './ExploreNavigator';
import LoginScreen from './LoginScreen';
import ChatScreen from './ChatScreen';

const SearchNavigator = StackNavigator({
  //Login: {screen: LoginScreen},
  Search: {screen: SearchScreen},
  Explore: {screen: ExploreNavigator},
  Chat: {screen: ChatScreen}
});

export default SearchNavigator;