import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

export default class BecomeAGuideQuestions6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statement: '',
    };

    this.setStatement = this.setStatement.bind(this);
    this.navigateToNext = this.navigateToNext.bind(this);
  }

  setStatement(statement) {
    this.setState({
      statement: statement
    });
  } 

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestionsPolicies');
  }

  render() {
    return (
      <View style={{marginTop: 100}}>
        <FormLabel>Any Extra Sauce?</FormLabel>
        <FormLabel>Feel free to provide any other information here!</FormLabel>
        <FormInput
          id="statement"
          placeholder="Your blogs, past tours, profiles, etc"
          onChangeText={(text) => { this.setIntro(text); }}
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