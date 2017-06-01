// First Explore Navigator

import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import ExploreScreenEntry from './ExploreScreenEntry';
import GuideProfileScreen from './GuideProfileScreen';
import BookingPolicyScreen from './BookingPolicyScreen';
import BookingConfirmationScreen from './BookingConfirmationScreen';

const GuideNavigator = DrawerNavigator({
  ExploreScreenEntry: {screen: ExploreScreenEntry},
  GuideProfile: {screen: GuideProfileScreen},
  BookingPolicy: {screen: BookingPolicyScreen},
  BookingConfirmation: {screen: BookingConfirmationScreen},
});

export default GuideNavigator;