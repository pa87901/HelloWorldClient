import React from 'react';
import { connect } from 'react-redux';
import { updateCity, updateDate, updateTravelers } from '../Actions/searchActions.js';
import { StyleSheet, Text, View, Picker, Item, Keyboard, TextInput } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleDateUpdate(date) {
    this.props.dispatch(updateDate(date));
  }

  handleCityUpdate(city) {
    this.props.dispatch(updateCity(city));
  }

  handleTravelerUpdate(number) {
    this.props.dispatch(updateTravelers(number));
  }

  _keyboardDidShow () {
    console.log('Hey from the keyboard');
  }

  _keyboardDidHide () {
    console.log('Keyboard Hidden');
  }

  render() {
    console.log('PROPS', this.props);

    return (
      <View style={styles.container}>
        <Text style = {styles.header}>Where are you headed?</Text>
        <FormLabel>When?</FormLabel>
        <FormInput id="when" placeholder="Where do you want to go?" onChangeText={(date) => this.handleDateUpdate(date)} />
        <FormLabel>Where?</FormLabel>
        <FormInput id="where" placeholder="When do you want to go?" onChangeText={(city) => this.handleCityUpdate(city)} />
        <FormLabel>How many travelers?</FormLabel>
        <Picker
          style={styles.picker}
          selectedValue={this.props.search.numTravelers}
          onValueChange={(number) => this.handleTravelerUpdate(number)}
          mode="dropdown"
        >
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
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

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(SearchScreen); 