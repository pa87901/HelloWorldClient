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

// import OnboardingNavigator from './navigationOnboarding'
// import MainNavigator from './navigationMain'
// import SigningUpNavigator from './navigationSigning'

class Navigator extends React.Component {
  constructor(props){
    super(props)
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
    // console.log("!this.props.auth", this.props.auth.auth)
    // if(!this.props.auth.auth){
    //   lock.show({}, (err, profile, token) => {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     }
    //     // Authentication worked!
    //     this.setState({
    //       profile: profile
    //     });
    //     AsyncStorage.setItem('profile', JSON.stringify(profile));
    //     AsyncStorage.setItem('authToken', JSON.stringify(token));
    //     context.props.dispatch(authenticate(true, token));

    //     // axios.defaults.headers.common['Authorization'] = token.idToken;
    //     // axios.post('/', {
    //     //   firstName: 'Fred',
    //     //   lastName: 'Flintstone'
    //     // })
    //     // .then(function (response) {
    //     //   console.log(response);
    //     // })
    //     // .catch(function (error) {
    //     //   console.log(error);
    //     // });
    //     // console.log(this.state);
    //   });
    // }

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

export default connect(mapStateToProps)(Navigator);

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

