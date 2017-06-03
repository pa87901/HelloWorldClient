import React from 'react';
import { connect } from 'react-redux';
import { becomeGuideRate } from '../Actions/BecomeAGuideActions';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

class BecomeAGuideQuestions3 extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToNext = this.navigateToNext.bind(this);
  }

  updateRate(rate) {
    this.props.dispatch(becomeGuideRate(rate));
  }

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestions4');
  }

  render() {
    console.log('PROPS', this.props);

    return (
      <View style={{marginTop: 100}}>
        <FormLabel>How much is your time worth?</FormLabel>
        <FormLabel>Hourly Rate (USD)</FormLabel>
        <FormInput id="rate" placeholder="example: input '10' for $10 / hour" onChangeText={(rate) => this.updateRate(rate)} />
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

export default connect(mapStateToProps)(BecomeAGuideQuestions3);