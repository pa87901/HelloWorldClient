import React from 'react';
import { StyleSheet, Text, View, Picker, Item, Keyboard, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      when: '',
      where: '',
      guests: 1
    };

    // this.handleWhenInput = this.handleWhenInput.bind(this);
    // this.handleWhereInput = this.handleWhereInput.bind(this);
    // this.handleGuestsInput = this.handleGuestsInput.bind(this);
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    console.log('Hey from the keyboard');
  }

  _keyboardDidHide () {
    console.log('Keyboard Hidden');
  }

  // handleWhenInput(event) {
  //   // event.preventDefault();
  //   console.log('EVENT', event);
  //   // this.setState({
  //   //   when: event.target.value
  //   // });
  // }

  // handleWhereInput(event) {
  //   // event.preventDefault();
  //   // this.setState({
  //   //   where: event.target.value
  //   // });
  // }  

  // handleGuestsInput(event) {
  //   // event.preventDefault();
  //   // this.setState({
  //     // guests: event.target.value
  //   // }); 
  // }

  render() {
    console.log('PROPS', this.props);
    const styles = StyleSheet.create({
      container: {
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      picker: {
        width: 350,
      },
      header: {
        fontSize: 25,
      }
    });

    return (
      <View style={styles.container}>
        <Text style = {styles.header}>Where are you headed?</Text>
        <FormLabel>When?</FormLabel>
        <FormInput id="when" value={this.state.when} placeholder="Where do you want to go?" onChangeText={(text) => this.setState({when: text})} />
        <FormLabel>Where?</FormLabel>
        <FormInput id="where" value={this.state.where} placeholder="When do you want to go?" onChangeText={(text) => this.setState({where: text})} />
        <FormLabel>How many travelers?</FormLabel>
        <Picker
          style={styles.picker}
          selectedValue={this.state.guests}
          onValueChange={this.onValueChange = (number) => this.setState({guests: number})}
          mode="dropdown">
          <Picker.Item label="1" value= {1} />
          <Picker.Item label="2" value= {2} />
          <Picker.Item label="3" value= {3} />
          <Picker.Item label="4" value= {4} />
        </Picker>
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
            <Button
            large
            raised
            backgroundColor='#FF8C00'
            title='EXPLORE'
            onPress={() => this.props.navigation.navigate('Explore')} 
          />
        </View>
      </View>
    );
  }
}
