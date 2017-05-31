// First Explore Navigator

import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import ExploreScreenEntry from './ExploreScreenEntry';
import GuideProfileScreen from './GuideProfileScreen';

const GuideNavigator = DrawerNavigator({
  ExploreScreenEntry: {screen: ExploreScreenEntry},
  GuideProfile: {screen: GuideProfileScreen}
});

export default GuideNavigator;