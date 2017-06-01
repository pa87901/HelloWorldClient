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
    this.navigateToNext = this.navigateToNext.bind(this);
  }

  setAnswer2(city) {
    this.setState({
      answer2: city
    });
  }

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestions3');
  }

  render() {
    return (
      <View style={{marginTop: 100}}>
        <FormLabel>When will you be giving a tour?</FormLabel>
        <FormInput id="question2" placeholder="YYYY-MM-DD" onChangeText={(text) => { this.setAnswer2(text); }} />
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