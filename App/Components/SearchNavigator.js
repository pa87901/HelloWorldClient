import { StackNavigator } from 'react-navigation';
import SearchScreen from './SearchScreen';
import ExploreNavigator from './ExploreNavigator';
import GuideProfileScreen from './GuideProfileScreen';
import BookingPolicyScreen from './BookingPolicyScreen';
import BookingConfirmationScreen from './BookingConfirmationScreen';
import BecomeAGuideOptions from './BecomeAGuideOptions';
import BecomeAGuideQuestions1 from './BecomeAGuideQuestions1';
import BecomeAGuideQuestions2p1 from './BecomeAGuideQuestions2p1';
import BecomeAGuideQuestions4 from './BecomeAGuideQuestions4';
import BecomeAGuideQuestionsPolicies from './BecomeAGuideQuestionsPolicies';
import BecomeAGuideQuestionsConfirmation from './BecomeAGuideQuestionsConfirmation';
import SpecialtiesSetting from './SpecialtiesSetting';
import ChatScreen from './ChatScreen';
import GuideRequestedTripScreen from './GuideRequestedTripScreen';
import GuideTripsScreen from './GuideTripsScreen';
import ProfileScreen from './ProfileScreen';
import GuideInboxScreen from './GuideInboxScreen';
import GuideItineraryScreen from './GuideItineraryScreen';
import MapScreen from './MapScreen';
import GuideChatScreen from './GuideChatScreen';
import NewChatScreen from './NewChatScreen';
import NewChatScreen2 from './NewChatScreen2';
import TouristItineraryScreen from './TouristItineraryScreen';


const SearchNavigator = StackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      headerMode: 'float',
      header: null,
      card: 'modal',
      headerTintColor: '#000',
      headerStyle: { styles }
    }
  },
  Explore: { screen: ExploreNavigator },
  GuideProfile: { screen: GuideProfileScreen },
  BookingPolicy: { screen: BookingPolicyScreen },
  BookingConfirmation: { screen: BookingConfirmationScreen },
  GuideOptions: { screen: BecomeAGuideOptions },
  SpecialtiesSetting: { screen: SpecialtiesSetting },
  GuideQuestions1: { screen: BecomeAGuideQuestions1 },
  GuideQuestions2p1: { screen: BecomeAGuideQuestions2p1 },
  GuideRequestedTripScreen: { screen: GuideRequestedTripScreen },
  GuideQuestions4: { screen: BecomeAGuideQuestions4 },
  GuideQuestionsPolicies: { screen: BecomeAGuideQuestionsPolicies },
  GuideQuestionsConfirmation: { screen: BecomeAGuideQuestionsConfirmation },
  Chat: { screen: ChatScreen },
  GuideTrips: { screen: GuideTripsScreen },
  ProfileScreen: { screen: ProfileScreen },
  GuideInbox: { screen: GuideInboxScreen },
  GuideItineraryScreen: { screen: GuideItineraryScreen },
  MapScreen: { screen: MapScreen },
  GuideChat: { screen: GuideChatScreen },
  NewChatScreen: { screen: NewChatScreen },
  NewChatScreen2: { screen: NewChatScreen2 },
  TouristItinerary: { screen: TouristItineraryScreen }
});

const styles = {
  headerStyle: {
    fontSize: 30,
    marginTop: 10
  },
  intro: {
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  listItem: {
    borderBottomWidth: 0,
    marginTop: 5,
    marginBottom: 0
  },
  specialityTitle: {
    marginLeft: 40
  }
};

export default SearchNavigator;
