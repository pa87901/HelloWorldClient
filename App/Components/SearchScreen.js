import React from 'react';
import { connect } from 'react-redux';
import { updateCity, updateDate, updateHours, updateTravelers, updateSearchResult } from '../Actions/searchActions.js';
import { StyleSheet, Text, View, Picker, Item, Keyboard, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, Divider, CheckBox } from 'react-native-elements';
import axios from '../axios';
import DatePicker from './DatePicker';
import TimePick from './TimePick';
import { updateFilterCriteria } from '../Actions/searchActions';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
      showTimePicker: false,
      sightseeingCheck: false,
      foodCheck: false,
      sportsCheck: false,
      nightlifeCheck: false,
      musicCheck: false,
      museumCheck: false,
      historyCheck: false,
      politicsCheck: false,
    }
    this.checkSightseeing = this.checkSightseeing.bind(this);
    this.checkFood = this.checkFood.bind(this);
    this.checkSports = this.checkSports.bind(this);
    this.checkNightlife = this.checkNightlife.bind(this);
    this.checkMusic = this.checkMusic.bind(this);
    this.checkMuseum = this.checkMuseum.bind(this);
    this.checkHistory = this.checkHistory.bind(this);
    this.checkPolitics = this.checkPolitics.bind(this);
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
    

    // Axios call to call upon all guides that have the selected search criteria.
    

    this.props.navigation.navigate('Explore');
  }

  _keyboardDidShow () {
    console.log('Hey from the keyboard');
  }

  _keyboardDidHide () {
    console.log('Keyboard Hidden');
  }

  checkSightseeing() {
    this.setState({
      sightseeingCheck: !this.state.sightseeingCheck
    });
    console.log('this.state.sightSeeingCheck', this.state.sightseeingCheck)
    let criteria = {
      sightseeingCheck: this.state.sightseeingCheck,
      foodCheck: this.state.foodCheck,
      sportsCheck: this.state.sportsCheck,
      nightlifeCheck: this.state.nightlifeCheck,
      musicCheck: this.state.musicCheck,
      museumCheck: this.state.museumCheck,
      historyCheck: this.state.historyCheck,
      politicsCheck: this.state.politicsCheck,
    };
    this.props.dispatch(updateFilterCriteria(criteria));
  }

  checkFood() {
    this.setState({
      foodCheck: !this.state.foodCheck
    });
    let criteria = {
      sightseeing: this.state.sightseeingCheck,
      foodCheck: this.state.foodCheck,
      sportsCheck: this.state.sportsCheck,
      nightlifeCheck: this.state.nightlifeCheck,
      musicCheck: this.state.musicCheck,
      museumCheck: this.state.museumCheck,
      historyCheck: this.state.historyCheck,
      politicsCheck: this.state.politicsCheck,
    };
    this.props.dispatch(updateFilterCriteria(criteria));
  }

  checkSports() {
    this.setState({
      sportsCheck: !this.state.sportsCheck
    });
    let criteria = {
      sightseeingCheck: this.state.sightseeingCheck,
      foodCheck: this.state.foodCheck,
      sportsCheck: this.state.sportsCheck,
      nightlifeCheck: this.state.nightlifeCheck,
      musicCheck: this.state.musicCheck,
      museumCheck: this.state.museumCheck,
      historyCheck: this.state.historyCheck,
      politicsCheck: this.state.politicsCheck,
    };
    this.props.dispatch(updateFilterCriteria(criteria));
  }

  checkNightlife() {
    this.setState({
      nightlifeCheck: !this.state.nightlifeCheck
    });
    let criteria = {
      sightseeingCheck: this.state.sightseeingCheck,
      foodCheck: this.state.foodCheck,
      sportsCheck: this.state.sportsCheck,
      nightlifeCheck: this.state.nightlifeCheck,
      musicCheck: this.state.musicCheck,
      museumCheck: this.state.museumCheck,
      historyCheck: this.state.historyCheck,
      politicsCheck: this.state.politicsCheck,
    };
    this.props.dispatch(updateFilterCriteria(criteria));
  }

  checkMusic() {
    this.setState({
      musicCheck: !this.state.musicCheck
    });
    let criteria = {
      sightseeingCheck: this.state.sightseeingCheck,
      foodCheck: this.state.foodCheck,
      sportsCheck: this.state.sportsCheck,
      nightlifeCheck: this.state.nightlifeCheck,
      musicCheck: this.state.musicCheck,
      museumCheck: this.state.museumCheck,
      historyCheck: this.state.historyCheck,
      politicsCheck: this.state.politicsCheck,
    };
    this.props.dispatch(updateFilterCriteria(criteria));
  }

  checkMuseum() {
    this.setState({
      museumCheck: !this.state.museumCheck
    });
    let criteria = {
      sightseeingCheck: this.state.sightseeingCheck,
      foodCheck: this.state.foodCheck,
      sportsCheck: this.state.sportsCheck,
      nightlifeCheck: this.state.nightlifeCheck,
      musicCheck: this.state.musicCheck,
      museumCheck: this.state.museumCheck,
      historyCheck: this.state.historyCheck,
      politicsCheck: this.state.politicsCheck,
    };
    this.props.dispatch(updateFilterCriteria(criteria));
  }

  checkHistory() {
    this.setState({
      historyCheck: !this.state.historyCheck
    });
    let criteria = {
      sightseeingCheck: this.state.sightseeingCheck,
      foodCheck: this.state.foodCheck,
      sportsCheck: this.state.sportsCheck,
      nightlifeCheck: this.state.nightlifeCheck,
      musicCheck: this.state.musicCheck,
      museumCheck: this.state.museumCheck,
      historyCheck: this.state.historyCheck,
      politicsCheck: this.state.politicsCheck,
    };
    this.props.dispatch(updateFilterCriteria(criteria));
  }

  checkPolitics() {
    this.setState({
      politicsCheck: !this.state.politicsCheck
    });
    let criteria = {
      sightseeingCheck: this.state.sightseeingCheck,
      foodCheck: this.state.foodCheck,
      sportsCheck: this.state.sportsCheck,
      nightlifeCheck: this.state.nightlifeCheck,
      musicCheck: this.state.musicCheck,
      museumCheck: this.state.museumCheck,
      historyCheck: this.state.historyCheck,
      politicsCheck: this.state.politicsCheck,
    };
    this.props.dispatch(updateFilterCriteria(criteria));
  }

  render() {
    let fromTime;
    if (this.props.search.fromHour === 0) {
      fromTime = '12am';
    } else if (this.props.search.fromHour > 0 && this.props.search.fromHour < 12) {
      fromTime = this.props.search.fromHour + 'am';
    } else {
      fromTime = this.props.search.fromHour - 12 + 'pm';
    }

    let toTime;
    if (this.props.search.toHour === 0) {
      toTime = '12am';
    } else if (this.props.search.toHour > 0 && this.props.search.toHour < 12) {
      toTime = this.props.search.toHour + 'am';
    } else {
      toTime = this.props.search.toHour - 12 + 'pm';
    }

    // console.log('this.props.search.date', this.props.search.date);
    let showDatePicker = this.state.showDatePicker ? <DatePicker /> : <Text style={styles.date}>{this.props.search.date}</Text>;
    let showTimePicker = this.state.showTimePicker ? <TimePick /> : <Text style={styles.date}> From: {fromTime} To: {toTime}</Text>;
    return (
      <View style={styles.container}>
        <Text style = {styles.header}>Where are you headed?</Text>
        <FormLabel>When do you need a guide?</FormLabel>
        <TouchableOpacity onPress={() => this.setState({showDatePicker: !this.state.showDatePicker, showTimePicker: false})} >
        <FormLabel>Date</FormLabel>
        <Divider />
          {showDatePicker}
        <Divider />
        </TouchableOpacity>
        {/*<FormInput id="date" placeholder="YYYY-MM-DD" onChangeText={(date) => this.handleDateUpdate(date)} />*/}
        <TouchableOpacity onPress={() => (this.setState({showDatePicker: false, showTimePicker: !this.state.showTimePicker}))}>
        <FormLabel>Hours</FormLabel>
          {/*<FormInput id="hours" placeholder="9AM-5PM" onChangeText={(hours) => this.handleHoursUpdate(hours)} />*/}
          <Divider />
          {showTimePicker}
          <Divider />
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => (this.setState({showDatePicker: false, showTimePicker: false}))}>
          <FormLabel >Where?</FormLabel>
          <FormInput id="where" placeholder="Where do you want to go?" onChangeText={(city) => this.handleCityUpdate(city)} />
        </TouchableOpacity>
        {/*<FormLabel>How many travelers?</FormLabel>
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
        </Picker>*/}
        <View style={styles.switches}>
          <View style={styles.checkbox}>
            <CheckBox
            title='Sightseeing'
            checked={this.state.sightseeingCheck}
            onPress={this.checkSightseeing}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Food'
            checked={this.state.foodCheck}
            onPress={this.checkFood}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Sports'
            checked={this.state.sportsCheck}
            onPress={this.checkSports}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Nightlife'
            checked={this.state.nightlifeCheck}
            onPress={this.checkNightlife}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Music'
            checked={this.state.musicCheck}
            onPress={this.checkMusic}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Museum'
            checked={this.state.museumCheck}
            onPress={this.checkMuseum}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='History'
            checked={this.state.historyCheck}
            onPress={this.checkHistory}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Politics'
            checked={this.state.politicsCheck}
            onPress={this.checkPolitics}
            />
          </View>
        </View>
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
    top: 30,
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
  },
  date: {
    fontSize: 20,
  },
  switches: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    flexGrow: 1
  }
});

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(SearchScreen); 