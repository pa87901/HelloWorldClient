import React from 'react';
import { StackNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';
import ExploreNavigator from './ExploreNavigator';
import GuideProfileScreen from './GuideProfileScreen';
import LoginScreen from './LoginScreen';
import BookingPolicyScreen from './BookingPolicyScreen';
import BookingConfirmationScreen from './BookingConfirmationScreen';
import BecomeAGuideQuestions1 from './BecomeAGuideQuestions1';
import BecomeAGuideQuestions2 from './BecomeAGuideQuestions2';
import BecomeAGuideQuestions3 from './BecomeAGuideQuestions3';
import BecomeAGuideQuestions4 from './BecomeAGuideQuestions4';
import BecomeAGuideQuestions5 from './BecomeAGuideQuestions5';
import BecomeAGuideQuestions6 from './BecomeAGuideQuestions6';
import BecomeAGuideQuestionsPolicies from './BecomeAGuideQuestionsPolicies';
import BecomeAGuideQuestionsConfirmation from './BecomeAGuideQuestionsConfirmation';
import ChatScreen from './ChatScreen';

const SearchNavigator = StackNavigator({
  // Login: {screen: LoginScreen},
  Search: {screen: SearchScreen},
  Explore: {screen: ExploreNavigator},
  GuideProfile: {screen: GuideProfileScreen},
  BookingPolicy: {screen: BookingPolicyScreen},
  BookingConfirmation: {screen: BookingConfirmationScreen},
  GuideQuestions1: {screen: BecomeAGuideQuestions1},
  GuideQuestions2: {screen: BecomeAGuideQuestions2},
  GuideQuestions3: {screen: BecomeAGuideQuestions3},
  GuideQuestions4: {screen: BecomeAGuideQuestions4},
  GuideQuestions5: {screen: BecomeAGuideQuestions5},
  GuideQuestions6: {screen: BecomeAGuideQuestions6},
  GuideQuestionsPolicies: {screen: BecomeAGuideQuestionsPolicies},
  GuideQuestionsConfirmation: {screen: BecomeAGuideQuestionsConfirmation},
  Chat: {screen: ChatScreen},
});

export default SearchNavigator;