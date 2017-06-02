import React from 'react';
import { connect } from 'react-redux';
import { becomeGuideStatement } from '../Actions/BecomeAGuideActions';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

class BecomeAGuideQuestions6 extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToNext = this.navigateToNext.bind(this);
  }

  updateStatement(statement) {
    this.props.dispatch(becomeGuideStatement(statement));
  } 

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestionsPolicies');
  }

  render() {
    console.log('PROPS', this.props);    

    return (
      <View style={{marginTop: 100}}>
        <FormLabel>Any Extra Sauce?</FormLabel>
        <FormLabel>Feel free to provide any other information here!</FormLabel>
        <FormInput
          id="statement"
          placeholder="Your blogs, past tours, profiles, etc"
          onChangeText={(statement) => this.updateStatement(statement)}
        />
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

export default connect(mapStateToProps)(BecomeAGuideQuestions6);