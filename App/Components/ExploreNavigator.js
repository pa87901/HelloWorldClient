import React from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import Tab1Screen from './Tab1Screen';
import Tab2Screen from './Tab2Screen';
import Tab3Screen from './Tab3Screen';
import Tab4Screen from './Tab4Screen'

const SearchNavigator = TabNavigator({
  Tab1: {screen: Tab1Screen},
  Tab2: {screen: Tab2Screen},
  Tab3: {screen: Tab3Screen},
  Tab4: {screen: Tab4Screen}
});

export default SearchNavigator;