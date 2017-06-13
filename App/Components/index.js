import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StyleSheet } from 'react-native';
import SearchNavigator from './SearchNavigator';
import { authenticate } from '../Actions/authActions';
import LoginScreen from './LoginScreen';

//Auth0
const Auth0Lock = require('react-native-lock');
const lock = new Auth0Lock({ clientId: 'Mu8OfgbOlJYH4AnyOP9Efu8sMk2Sb3sa', domain: 'lightningladles.auth0.com' });


let serverURL = 'http://localhost:3000'

class Navigator extends React.Component {
  constructor(props) {
    super();
    this.state = {
      chats: [],
      userLoggedIn: null
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('authToken', (err, data) => {
      if (data) {
        this.props.authenticate(true, JSON.parse(data));
      } else {
        this.props.authenticate(true, null);
      }
    });
    AsyncStorage.getItem('profile', (err, data) => {
      if (data){
        this.props.setUserProfile(true, JSON.parse(data));
      } else {
        this.props.setUserProfile(false);
      }
    });
  }


  render() {
    if (this.props.auth.auth) {
      return (
        <SearchNavigator />
      );
    } else {
      return (
        <LoginScreen />
      );
    }
  }
}

const mapStateToProps = state => (state);

const mapDispatchToProps = (dispatch)=>{
  return {
    authenticate: (bool, data) =>{
      dispatch(authenticate)
    }
  }
}

function bindActions(dispatch) {
  return {
    authenticate: (authComplete, authData) => {
      if(authComplete){
        dispatch({
          type: 'AUTHORIZATION_COMPLETED',
          payload: authData
        });
      } else {
        dispatch( {
          type: 'AUTHORIZATION_FAILED',
          payload: null
        });
      }
    },
    setUserProfile: (profileLoaded, profileData) => {
      if(profileLoaded){
        dispatch({
          type: 'PROFILE_LOADED',
          payload: profileData
        });
      } else {
        dispatch({
          type: 'PROFILE_UNLOADED',
          payload: null
        });
      }
    }
  }
}

export default connect(mapStateToProps, bindActions)(Navigator);
