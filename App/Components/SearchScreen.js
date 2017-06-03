import React from 'react';
import { connect } from 'react-redux';
import {
  updateCity, updateDate, updateHours, updateTravelers, updateSearchResult
} from '../Actions/searchActions.js';
import {
  StyleSheet, Text, View, Picker, Item, Keyboard, TextInput
} from 'react-native';
import {
  FormLabel, FormInput, FormValidationMessage, Button
} from 'react-native-elements';
import axios from '../axios';

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

  handleHoursUpdate(hours) {
    this.props.dispatch(updateHours(hours));
  }  

  handleCityUpdate(city) {
    this.props.dispatch(updateCity(city));
  }

  handleTravelerUpdate(number) {
    this.props.dispatch(updateTravelers(number));
  }

  handleSearchSubmit() {
    var query = 'api/guides/search/' + this.props.search.city + '/' + this.props.search.date;

    axios.get(query)
      .then((res)=>{
        console.log('search screen axios props', this)
        console.log(res.data);
        this.props.dispatch(updateSearchResult(res.data));
      })
      .catch((err)=>{
        console.log(err);
      })

    const sampleData = [
  {
    "id": 1,
    "user_id": 1,
    "city": "SF",
    "hourly_rate": "45.00",
    "intro": "Hello, my name is Charles",
    "statement": "I like food",
    "avg_rating": "0.00",
    "img_url": null,
    "created_at": "2017-05-30T23:09:54.534Z",
    "updated_at": "2017-05-30T23:09:54.534Z",
    "user": {
      "id": 1,
      "facebook_id": "charles",
      "full_name": "Charles Kim",
      "guide": false,
      "email": "charles@example.com",
      "phone": "1111111111",
      "avg_rating": "0.00",
      "created_at": "2017-05-30T23:08:03.089Z",
      "updated_at": "2017-05-30T23:08:03.089Z"
    },
    "availabilities": [
      {
        "id": 1,
        "guide_id": 1,
        "start_hr": 9,
        "end_hr": 17,
        "date": "2017-05-24T07:00:00.000Z",
        "created_at": "2017-05-30T23:34:59.547Z",
        "updated_at": "2017-05-30T23:34:59.547Z"
      }
    ],
    "guideSpecialties": [
      {
        "id": 3,
        "guide_id": 1,
        "specialty_id": 3,
        "created_at": "2017-05-30T23:20:42.645Z",
        "updated_at": "2017-05-30T23:20:42.645Z",
        "specialty": {
          "id": 3,
          "specialty": "nightlife",
          "created_at": "2017-05-30T23:12:48.482Z",
          "updated_at": "2017-05-30T23:12:48.482Z"
        }
      },
      {
        "id": 4,
        "guide_id": 1,
        "specialty_id": 5,
        "created_at": "2017-05-30T23:20:46.861Z",
        "updated_at": "2017-05-30T23:20:46.861Z",
        "specialty": {
          "id": 5,
          "specialty": "food",
          "created_at": "2017-05-30T23:12:55.335Z",
          "updated_at": "2017-05-30T23:12:55.335Z"
        }
      }
    ]
  }
]

    // Need to replace below with axios call
    //sthis.props.dispatch(updateSearchResult(sampleData));
    

    this.props.navigation.navigate('Explore');
  }

  _keyboardDidShow () {
    console.log('Hey from the keyboard');
  }

  _keyboardDidHide () {
    console.log('Keyboard Hidden');
  }

  render() {
    //console.log('PROPS', this.props);

    return (
      <View style={styles.container}>
        <Text style = {styles.header}>Where are you headed?</Text>
        <FormLabel>When do you need a guide?</FormLabel>
        <FormLabel>Date</FormLabel>
        <FormInput id="date" placeholder="YYYY-MM-DD" onChangeText={(date) => this.handleDateUpdate(date)} />
        <FormLabel>Hours</FormLabel>
        <FormInput id="hours" placeholder="9AM-5PM" onChangeText={(hours) => this.handleHoursUpdate(hours)} />
        <FormLabel>Where?</FormLabel>
        <FormInput id="where" placeholder="Where do you want to go?" onChangeText={(city) => this.handleCityUpdate(city)} />
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
            onPress={() => this.handleSearchSubmit()} 
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