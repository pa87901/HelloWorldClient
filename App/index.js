import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Navigator from './Components';

class HelloWorld extends React.Component {
  constructor() {
    super();
    this.state = { store };
  }

  render() {
    // Console.log to see the store methods and initial state.
    // console.log('store', this.state.store, this.state.store.getState());
    return (
      <Provider store={this.state.store}>
        <Navigator />
      </Provider>
    );
  }
}

export default HelloWorld;
