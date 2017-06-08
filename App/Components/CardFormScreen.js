import React from 'react';
import { View, Text, Stylesheet } from 'react-native';
import stripe from 'tipsi-stripe';

export default class CardFormScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      token: null
    };
  }

  render() {
    handleCardPayPress = async () => {

    };
    
    return (
      <View>
        <Text>
          This is Card Form Screen View.
        </Text>
      </View>
    );
  }
}
