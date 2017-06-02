import React from 'react';
import { connect } from 'react-redux';
import { becomeGuideIntro } from '../Actions/BecomeAGuideActions';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

class BecomeAGuideQuestions5 extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToNext = this.navigateToNext.bind(this);
  }

  updateIntro(intro) {
    this.props.dispatch(becomeGuideIntro(intro));
  } 

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestions6');
  }

  render() {
    console.log('PROPS', this.props);

    return (
      <View style={{marginTop: 100}}>
        <FormLabel>Introduce Yourself</FormLabel>
        <FormLabel>Provide a brief introduction to our tourists!</FormLabel>
        <FormInput
          id="intro"
          placeholder="Hello, my name is Localize..."
          onChangeText={(intro) => this.updateIntro(intro)}
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

export default connect(mapStateToProps)(BecomeAGuideQuestions5);