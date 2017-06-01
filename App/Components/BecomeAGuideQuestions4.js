import React from 'react';
import { StyleSheet, Text, Picker, View } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

export default class BecomeAGuideQuestions4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hourlyRate: '',
    };

    this.setHourlyRate = this.setHourlyRate.bind(this);
    this.navigateToNext = this.navigateToNext.bind(this);
  }

  setHourlyRate(rate) {
    this.setState({
      hourlyRate: rate
    });
  } 

  navigateToNext() {
    // this.props.navigation.navigate('GuideQuestions3');
  }

  render() {
    return (
      <View style={{marginTop: 100}}>
        <FormLabel>How much is your time worth?</FormLabel>
        <FormLabel>Hourly Rate (USD)</FormLabel>
        <FormInput id="rate" placeholder="example: input '10' for $10 / hour" onChangeText={(text) => { this.setHourlyRate(text); }} />
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