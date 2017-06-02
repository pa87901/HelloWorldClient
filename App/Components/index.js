import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import SearchNavigator from './SearchNavigator';
import { authenticate } from "../Actions/authActions";
import { setUserProfile } from "../Actions/userProfileActions"
import LoginScreen from './LoginScreen'

//Auth0
var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: 'Mu8OfgbOlJYH4AnyOP9Efu8sMk2Sb3sa', domain: 'lightningladles.auth0.com'});
import axios from 'axios';
// import OnboardingNavigator from './navigationOnboarding'
// import MainNavigator from './navigationMain'
// import SigningUpNavigator from './navigationSigning'

let serverURL = 'http://localhost:3000'

class Navigator extends React.Component {
  constructor(props) {
    super();
    this.state = {
      chats: [],
      userLoggedIn: 'preda'
    }
  }

  componentDidMount(){
    //console.log('YAY I MOUNTED')
    var context = this;
    AsyncStorage.getItem('authToken', (err, data) => {
      if (data) {
        context.props.dispatch(authenticate(true, JSON.parse(data)));
        //axios.defaults.headers.common['Authorization'] = JSON.parse(data).idToken;
      } else {
        context.props.dispatch(authenticate(true, null));
      }
    });
    AsyncStorage.getItem('profile', (err, data) =>{
      if(data){
        context.props.dispatch(setUserProfile(true, JSON.parse(data)))
      } else {
        context.props.dispatch(setUserProfile(false))
      }
    });
  }


  componentWillMount() {
    // Get messages from server using http GET request.
    let params = {
      facebookId: 'preda'
    };

    axios.get(serverURL + '/api/chats/all/' + this.state.userLoggedIn, params)
    .then(chats => {
      // Formate messages into GiftedChat friendly format.
      let formattedMessages = chats.data.map(chatObject => {
        return {
          text: chatObject.message,
          user: {
            _id: chatObject.user_id,
            guideId: chatObject.guide_id
          },
          createdAt: chatObject.created_at,
          _id: chatObject.id
        }
      });
      console.log('Received response from server and formated.', chats.data,  formattedMessages);
      this.setState({
        chats: formattedMessages
      });
      this.props.updateChats(formattedMessages);
      // this.props.dispatch({type: 'FETCH_CHATS_FULFILLED', payload: chats.data})

    })
    .catch(error => {
      console.error('Unable to receive response from server GET /chats.')
    })
  }

  render() {
    console.log('GIVE ME THE PROPS', this.props);
    if(this.props.auth.auth){
      return (
        <SearchNavigator />
      );
    } else {
      return (
        <LoginScreen />
      )
    }
  }
}

const mapStateToProps = state => (state);

function bindActions(dispatch) {
  return {
    updateChats: (chats) => dispatch({type: 'UPDATE_CHATS', payload: chats})
  }
}

export default connect(mapStateToProps, bindActions)(Navigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

