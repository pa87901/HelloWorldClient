//guide questions here
import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Button, FormLabel, FormInput, } from 'react-native-elements';

export default class BecomeAGuideQuestions1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
    };

    this.setCity = this.setCity.bind(this);
    this.navigateToNext = this.navigateToNext.bind(this);
  }

  setCity(city) {
    this.setState({
      city: city
    });
  }

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestions2');
  }

  render() {
    return (
      <View style={{marginTop: 100}}>
        <FormLabel>What city will you be giving a tour at?</FormLabel>
        <FormInput id="question1" placeholder="City" onChangeText={(text) => { this.setCity(text); }} />
        <View style={{marginTop: 10}}>
          <Button
            small
            raised
            backgroundColor='#FF8C00'
            title='Next'
            onPress={this.navigateToNext}
          />
        </View>
      </View> 
    );
  }
}