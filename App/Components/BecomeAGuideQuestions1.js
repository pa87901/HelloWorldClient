//guide questions here
import React from 'react';
import { connect } from 'react-redux';
import { becomeGuideCity } from '../Actions/BecomeAGuideActions.js';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Button, FormLabel, FormInput, } from 'react-native-elements';

class BecomeAGuideQuestions1 extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToNext = this.navigateToNext.bind(this);
  }

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestions2');
  }

  updateCity(city) {
    this.props.dispatch(becomeGuideCity(city));
  }

  render() {
    console.log('PROPS', this.props);

    return (
      <View style={{marginTop: 100}}>
        <FormLabel>What city will you be giving a tour in?</FormLabel>
        <FormInput id="question1" placeholder="City" onChangeText={(city) => this.updateCity(city)} />
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

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(BecomeAGuideQuestions1);