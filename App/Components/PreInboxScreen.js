import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import axios from '../axios';
import UserAndGuideInboxNavigator from './UserAndGuideInboxNavigator';
import UserInboxNavigator from './UserInboxNavigator';

class PreInboxScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    // Axios GET request to update userGuideId global state.
    axios.get('api/guides/byUserId/' + this.props.userProfile.profile.userId)
    .then(guideId => {
      console.log('GOTTEN guideId', guideId);
      this.props.updateUserGuideId(guideId.data.id);
    });
  }

  render() {
    console.log('this.props in PreInboxScreen', this.props);
    // If a userGuideId has been found for current logged in user...
    if (this.props.userProfile.userGuideId) {
      // Navigate them to BoxNavigator.
      return (
        <UserAndGuideInboxNavigator />
      )
    } else {
      // Navigate them to Inbox Screen.
      return <UserInboxNavigator />
    }

    // return (
    //   <View>
    //     <Text>PreInbox component is rendering</Text>
    //   </View>
    // )
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    updateUserGuideId: userGuideId => dispatch({type: 'UPDATE_USER_GUIDE_ID', payload: userGuideId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreInboxScreen);