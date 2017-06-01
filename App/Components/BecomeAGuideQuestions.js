//guide questions here
import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Button, FormLabel, FormInput, } from 'react-native-elements'

export default class BecomeAGuideQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      question6: ''
    };

  }

  render() {
    return (
      <View>
        <View>
        <Text>Tell us a little bit about yourself!</Text>
        <FormLabel>question1?</FormLabel>
        <FormInput id="question1" value={this.state.question1} placeholder="Some information here." onChangeText={(text) => this.setState({question1: text})} />
        <FormLabel>question2?</FormLabel>
        <FormInput id="question2" value={this.state.question2} placeholder="Some information here." onChangeText={(text) => this.setState({question2: text})} />
        <FormLabel>question3?</FormLabel>
        <FormInput id="question3" value={this.state.question3} placeholder="Some information here." onChangeText={(text) => this.setState({question3: text})} />
        <FormLabel>question4?</FormLabel>
        <FormInput id="question4" value={this.state.question4} placeholder="Some information here." onChangeText={(text) => this.setState({question4: text})} />
        <FormLabel>question5?</FormLabel>
        <FormInput id="question5" value={this.state.question5} placeholder="Some information here." onChangeText={(text) => this.setState({question5: text})} />
        <FormLabel>question6?</FormLabel>
        <FormInput id="question6" value={this.state.question6} placeholder="Some information here." onChangeText={(text) => this.setState({question6: text})} />
        </View>
      </View> 
    );
  }
}