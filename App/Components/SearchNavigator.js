import React from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';
import ExploreNavigator from './ExploreNavigator';
import GuideProfileScreen from './GuideProfileScreen';
import LoginScreen from './LoginScreen';
import BecomeAGuideQuestions from './BecomeAGuideQuestions';

const SearchNavigator = StackNavigator({
  //Login: {screen: LoginScreen},
  Search: {screen: SearchScreen},
  Explore: {screen: ExploreNavigator},
  GuideQuestions: {screen: BecomeAGuideQuestions}
});

export default SearchNavigator;