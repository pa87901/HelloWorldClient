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
    return (
      <Provider store={this.state.store}>
        <Navigator />
      </Provider>
    );
  }
}

export default HelloWorld;
