import React from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';
import QuestionnaireScreen from './QuestionnaireScreen';
import ExploreScreen from './ExploreScreen';
import LoginScreen from './LoginScreen';

const QuestionnaireNavigator = TabNavigator({
  Login: {screen: LoginScreen},
  Questionnaire: {screen: QuestionnaireScreen},
  Explore: {screen: ExploreScreen}
});

export default QuestionnaireNavigator;