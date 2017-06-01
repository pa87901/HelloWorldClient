//guide questions here
import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
<<<<<<< HEAD
import { Button, FormLabel, FormInput, CheckBox } from 'react-native-elements';
=======
import { Button, FormLabel, FormInput, } from 'react-native-elements';
>>>>>>> (component) Add becomeAGuide screen 3

export default class BecomeAGuideQuestions3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specialty1: false,
      specialty2: false,
      specialty3: false,
      specialty4: false
    };

    this.setSpecialty1 = this.setSpecialty1.bind(this);
    this.setSpecialty2 = this.setSpecialty2.bind(this);
    this.setSpecialty3 = this.setSpecialty3.bind(this);
    this.setSpecialty4 = this.setSpecialty4.bind(this);
  }

  setSpecialty1() {
    this.setState({
      specialty1: !this.state.specialty1
    });
  }

  setSpecialty2() {
    this.setState({
      specialty2: !this.state.specialty2
    });
  }

  setSpecialty3() {
    this.setState({
      specialty3: !this.state.specialty3
    });
  }

  setSpecialty4() {
    this.setState({
      specialty4: !this.state.specialty4
    });
  }

  render() {
    return (
      <View style={{marginTop: 100}}>
        <FormLabel>What are your specialties?</FormLabel>
        <View style={{marginTop: 10}}>
          <CheckBox
            title='Sighteeing'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.specialty1}
            onPress={this.setSpecialty1}
          />
          <CheckBox
            title='Museums'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.specialty2}
            onPress={this.setSpecialty2}
          />
          <CheckBox
            title='Food'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.specialty3}
            onPress={this.setSpecialty3}
          />
          <CheckBox
            title='Nightlife'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.specialty4}
            onPress={this.setSpecialty4}
          />
        </View>
      </View> 
    );
  }
}