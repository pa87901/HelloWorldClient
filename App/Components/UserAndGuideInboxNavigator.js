import { StackNavigator } from 'react-navigation';
import InboxChoiceScreen from './InboxChoiceScreen';
import InboxScreen from './InboxScreen';
import GuideInboxScreen from './GuideInboxScreen';
import GuideChatScreen from './GuideChatScreen';
import ChatScreen from './ChatScreen';

const UserAndGuideInboxNavigator = StackNavigator({
  InboxChoice: {screen: InboxChoiceScreen,
    navigationOptions: {
      header: null
    }
  },
  UserInbox: {screen: InboxScreen},
  GuideInbox: {screen: GuideInboxScreen},
  GuideChat: {screen: GuideChatScreen},
  Chat: {screen: ChatScreen}
});

export default UserAndGuideInboxNavigator;