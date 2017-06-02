import React from 'react';
import { connect } from 'react-redux';
import { becomeGuideDate, becomeGuideStart, becomeGuideEnd } from '../Actions/BecomeAGuideActions';
import { StyleSheet, Text, Picker, View, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, } from 'react-native-elements';

class BecomeAGuideQuestions2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      startTime: '',
      endTime: '',
    };

    this.setDate = this.setDate.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
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
          <FormInput id="date" placeholder="YYYY-MM-DD" onChangeText={(date) => this.props.dispatch(becomeGuideDate(date))} />
          <FormLabel>Hours</FormLabel>
          <FormLabel>Available From</FormLabel>
          <FormInput id="startTime" placeholder="9am" onChangeText={(start) => this.props.dispatch(becomeGuideStart(start))} />
          <FormLabel>Through</FormLabel>
          <FormInput id="startTime" placeholder="5pm" onChangeText={(end) => this.props.dispatch(becomeGuideEnd(end))} />
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

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(BecomeAGuideQuestions2);