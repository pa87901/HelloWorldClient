//guide questions here
import React from 'react';
import { StyleSheet, Text, Picker, View, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, } from 'react-native-elements';

export default class BecomeAGuideQuestions2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      startTime: '',
      endTime: '',
    };

    this.setDate = this.setDate.bind(this);
    this.navigateToNext = this.navigateToNext.bind(this);
  }

  setDate(date) {
    this.setState({
      date: date
    });
  }

  setStartTime(time) {
    this.setState({
      startTime: time
    });
  }

  setEndTime(time) {
    this.setState({
      endTime: time
    });
  }

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestions3');
  }

  render() {
    return (
      <ScrollView>
        <View style={{marginTop: 10}}>
          <FormLabel>When will you be giving a tour?</FormLabel>
          <FormLabel>Date</FormLabel>
          <FormInput id="date" placeholder="YYYY-MM-DD" onChangeText={(text) => { this.setDate(text); }} />
          <FormLabel>Hours</FormLabel>
          <FormLabel>Available From</FormLabel>
          <FormInput id="startTime" placeholder="9am" onChangeText={(text) => { this.setStartTime(text); }} />
          <FormLabel>Through</FormLabel>
          <FormInput id="startTime" placeholder="5pm" onChangeText={(text) => { this.setEndTime(text); }} />
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
      </ScrollView> 
    );
  }
}