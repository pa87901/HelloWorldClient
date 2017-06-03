import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import SearchNavigator from './SearchNavigator';
import { authenticate } from "../Actions/authActions";
import { setUserProfile } from "../Actions/userProfileActions"
import LoginScreen from './LoginScreen';
import axios from '../axios';

//Auth0
var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: 'Mu8OfgbOlJYH4AnyOP9Efu8sMk2Sb3sa', domain: 'lightningladles.auth0.com'});


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
    var context = this;
    AsyncStorage.getItem('authToken', (err, data) => {
      if (data) {
        context.props.authenticate(true, JSON.parse(data));
      } else {
        context.props.authenticate(true, null);
      }
    });
    AsyncStorage.getItem('profile', (err, data) =>{
      if(data){
        context.props.setUserProfile(true, JSON.parse(data))
      } else {
        context.props.setUserProfile(false)
      }
    });
  }


  render() {
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

