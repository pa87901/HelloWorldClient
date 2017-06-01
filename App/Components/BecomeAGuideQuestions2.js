//guide questions here
import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Button, FormLabel, FormInput, } from 'react-native-elements';

export default class BecomeAGuideQuestions2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer2: '',
    };

    this.setAnswer2 = this.setAnswer2.bind(this);
  }

  setAnswer2(city) {
    this.setState({
      answer2: city
    });
  }

  render() {
    return (
      <View style={{marginTop: 100}}>
        <FormLabel>When will you be giving a tour?</FormLabel>
        <FormInput id="question1" placeholder="YYYY-MM-DD" onChangeText={(text) => { this.setAnswer1(text); }} />
        <View style={{marginTop: 10}}>
          <Button
            small
            raised
            backgroundColor='#FF8C00'
            title='Next'
          />
        </View>
      </View> 
    );
  }
}