import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';

//Auth0
var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: 'Mu8OfgbOlJYH4AnyOP9Efu8sMk2Sb3sa', domain: 'lightningladles.auth0.com'});

//Axios
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export default class MyApp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      profile: {}
    };
    this._fbAuth.bind(this);
    this._logOut.bind(this);
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
      </View>
    );
  }
}


AppRegistry.registerComponent('MyApp', () => MyApp);
