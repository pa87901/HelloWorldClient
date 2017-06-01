import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

export default class BecomeAGuideQuestions5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: '',
    };

    this.setIntro = this.setIntro.bind(this);
    this.navigateToNext = this.navigateToNext.bind(this);
  }

  setIntro(intro) {
    this.setState({
      intro: intro
    });
  } 

  navigateToNext() {
    // this.props.navigation.navigate('GuideQuestions3');
  }

  render() {
    return (
      <View style={{marginTop: 100, flexDirection: 'column'}}>
        <FormLabel>Introduce Yourself</FormLabel>
        <FormLabel>Provide a brief introduction to our tourists!</FormLabel>
        <FormInput
          id="intro"
          placeholder="Hello, my name is Localize..."
          onChangeText={(text) => { this.setIntro(text); }}
          inputStyle={{flexGrow: 1}}
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