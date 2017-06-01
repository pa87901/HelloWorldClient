import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { authenticate } from "../Actions/authActions";
import { connect } from "react-redux";
import { setUserProfile } from "../Actions/userProfileActions"


import axios from '../axios.js'
//import store from '../store.js'
 

//Redux

//Auth0
var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: 'Mu8OfgbOlJYH4AnyOP9Efu8sMk2Sb3sa', domain: 'lightningladles.auth0.com'});


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      profile: {}
    };
    this._fbAuth.bind(this);
    this._logOut.bind(this);
    this._test.bind(this);
  }

  componentDidMount() {
    var context = this;
    if(!this.props.auth.auth){
      this._fbAuth()
    }

  }
  _fbAuth() {
    var context = this;
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      // Authentication worked!
      console.log('profile from insde lock', profile)
      AsyncStorage.setItem('profile', JSON.stringify(profile));
      AsyncStorage.setItem('authToken', JSON.stringify(token));
      context.props.dispatch(authenticate(true, token));
      context.props.dispatch(setUserProfile(true, profile));
      axios.defaults.headers.common['Authorization'] = token.idToken;
      axios.post('/auth', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(this.state);
    });
  }

  _logOut() {
    AsyncStorage.setItem('profile', '');
    AsyncStorage.setItem('authToken', '');
    this.props.dispatch(authenticate(false));
  }

  _test(){
    console.log('props', this.props)
  }


  render() {
    console.log('loaded');
    
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
    
    return (
      <View style={styles.container}>
        {/*<Text>Welcome {this.state.profile.name ? this.state.profile.name : 'Traveler'}!</Text>
        <Text>Your email is: {this.state.profile.email}</Text>
        <TouchableOpacity onPress = {this._fbAuth.bind(this)}>
          <Text>
            Login to Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this._logOut.bind(this)}>
          <Text>
            Logout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this._test.bind(this)}>
          <Text>
            {JSON.stringify(this.props.auth)}
          </Text>
        </TouchableOpacity>*/}
      </View>
    );
  }
}


const mapStateToProps = state =>(state);

export default connect(mapStateToProps)(LoginScreen); 

//AppRegistry.registerComponent('LoginScreen', () => LoginScreen);

// axios.post('/specialties', {"specialty":"climbing"})
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });

// axios.defaults.headers.common['Content-Type'] = 'application/json';
// //axios.defaults.headers.get['access-control-allow-origin'] = 'Access-Control-Allow-Origin';
// axios.defaults.headers.common['access-control-allow-origin'] = '*';
// //'access-control-allow-origin': '*'
// axios.defaults.headers.common['header_name'] = "API_KEY1"

// var instanceAPI = axios.create({
//   baseURL: 'http:/localhost:3000/api/',
//   timeout: 1000,
//   headers: {
//     'access-control-allow-origin': '*'
//   }
// });
//Auth0
//"X-Requested-With": "XMLHttpRequest"
//axios.get('http://ec2-35-167-135-24.us-west-2.compute.amazonaws.com:3000/', {
// axios.get('http://localhost:3000/api/', {
//   "headers" : {
//     'access-control-allow-origin': '*'
//   },
//   "specialty":"Climbing"
// })