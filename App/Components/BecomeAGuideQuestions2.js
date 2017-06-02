import React from 'react';
import { connect } from 'react-redux';
import { becomeGuideDate, becomeGuideStart, becomeGuideEnd } from '../Actions/BecomeAGuideActions';
import { StyleSheet, Text, Picker, View, ScrollView } from 'react-native';
import { Button, FormLabel, FormInput, } from 'react-native-elements';

class BecomeAGuideQuestions2 extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToNext = this.navigateToNext.bind(this);
  }

  updateDate(date) {
    this.props.dispatch(becomeGuideDate(date));
  }

  updateStartTime(time) {
    this.props.dispatch(becomeGuideStart(time));
  }

  updateEndTime(time) {
    this.props.dispatch(becomeGuideEnd(time));    
  }

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestions3');
  }

  render() {
    console.log('PROPS', this.props);

    return (
      <ScrollView>
        <View style={{marginTop: 10}}>
          <FormLabel>When will you be giving a tour?</FormLabel>
          <FormLabel>Date</FormLabel>
          <FormInput id="date" placeholder="YYYY-MM-DD" onChangeText={(date) => this.updateDate(date)} />
          <FormLabel>Hours</FormLabel>
          <FormLabel>Available From</FormLabel>
          <FormInput id="startTime" placeholder="9am" onChangeText={(time) => this.updateStartTime(time)} />
          <FormLabel>Through</FormLabel>
          <FormInput id="startTime" placeholder="5pm" onChangeText={(time) => this.updateEndTime(time)} />
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