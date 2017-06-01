import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import axios from '../axios.js'
import store from '../store.js'
//import axios from 'axios'

//Auth0
var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: 'Mu8OfgbOlJYH4AnyOP9Efu8sMk2Sb3sa', domain: 'lightningladles.auth0.com'});

axios.post('/specialties', {"specialty":"climbing"})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});

export default class MyApp extends Component {
  constructor() {
    super();
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
    AsyncStorage.getItem('authToken', (err, data) => {
      if (data) {
        context.setState({data: JSON.parse(data)});
        axios.defaults.headers.common['Authorization'] = JSON.parse(data).idToken;
      }
    });
    AsyncStorage.getItem('profile', (err, data) =>{
      if (data) {
        context.setState({profile: JSON.parse(data)});
      }
    });

  }
  _fbAuth() {
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      // Authentication worked!
      this.setState({
        profile: profile
      });
      AsyncStorage.setItem('profile', JSON.stringify(profile));
      AsyncStorage.setItem('authToken', JSON.stringify(token));
      axios.defaults.headers.common['Authorization'] = token.idToken;
      axios.post('/', {
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
    this.setState({
      profile: {}
    });
  }

  _test(){
    console.log(store)
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
        <Text>Welcome {this.state.profile.name ? this.state.profile.name : 'Traveler'}!</Text>
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
            Test Button
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


AppRegistry.registerComponent('MyApp', () => MyApp);

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