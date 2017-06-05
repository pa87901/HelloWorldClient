import { StackNavigator } from 'react-navigation';
import InboxChoiceScreen from './InboxChoiceScreen';
import InboxScreen from './InboxScreen';
import GuideInboxScreen from './GuideInboxScreen';
import ChatScreen from './ChatScreen';

const UserAndGuideInboxNavigator = StackNavigator({
  InboxChoice: {screen: InboxChoiceScreen,
    navigationOptions: {
      header: null
    }
  },
  UserInbox: {screen: InboxScreen},
  GuideInbox: {screen: GuideInboxScreen},
  Chat: {screen: ChatScreen}
});

export default UserAndGuideInboxNavigator;