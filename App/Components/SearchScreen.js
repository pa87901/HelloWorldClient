import React from 'react';
import { connect } from 'react-redux';
import { updateCity, updateDate, updateHours, updateTravelers, updateSearchResult } from '../Actions/searchActions.js';
import { StyleSheet, Text, View, Picker, Item, Keyboard, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, Divider, CheckBox } from 'react-native-elements';
import axios from '../axios';
import Axios from 'axios';
import DatePicker from './DatePicker';
import TimePick from './TimePick';
import { updateFilterCriteria } from '../Actions/searchActions';
import Autocomplete from 'react-native-autocomplete-input';
import config from '../Config/config.js';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
      showTimePicker: false,
      criteria: {
        sightseeing: false,
        food: false,
        sports: false,
        nightlife: false,
        music: false,
        museum: false,
        history: false,
        politics: false,
      },
      citiesPrediction: [],
      query: ''
    };
    this.checkSpecialty = this.checkSpecialty.bind(this);
    this.handleCityUpdate.bind(this);
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
    console.log('GOOGLE_PLACES_API_KEY', config.GOOGLE_PLACES_API_KEY)
    console.log(this)
    city = city.query;
    this.props.dispatch(updateCity(city));
    if(city.length > 3){
      var query = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + city + '&types=(cities)&language=en_US&key=' + config.GOOGLE_PLACES_API_KEY;
      Axios.get(query)
      .then((res) => {
        let cities = res.data.predictions;
        // console.log('google search data', this.state)
        this.setState({ citiesPrediction: cities });
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      this.setState({ citiesPrediction: [] });
    }

  }

  handleTravelerUpdate(number) {
    this.props.dispatch(updateTravelers(number));
  }

  handleSearchSubmit() {
    // if(this.state.citiesPrediction.length > 0 && this.state.citiesPrediction[0].description == this.props.search.city){
    // }
      var query = 'api/guides/search/' + this.props.search.city + '/' + this.props.search.date;
      console.log('QUERY', this.props.search.filterCriteria);
      axios.get(query, {headers: this.props.search.filterCriteria})
        .then((res)=>{
          console.log('search screen axios props', this)
          console.log(res.data);
          this.props.dispatch(updateSearchResult(res.data));
        })
        .catch((err)=>{
          console.log(err);
        })
      this.props.navigation.navigate('Explore');
  }

  _keyboardDidShow () {
    console.log('Hey from the keyboard');
  }

  _keyboardDidHide () {
    console.log('Keyboard Hidden');
  }

  checkSpecialty(specialty) {
    let criteria = {...this.props.search.filterCriteria }
    criteria[specialty] = !this.state.criteria[specialty];
    this.props.dispatch(updateFilterCriteria(criteria));
    this.setState({criteria: criteria});
  }

  render() {
    console.log('Props in SearchScreen', this.props, this.state.criteria);
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
    let filterCities = this.state.citiesPrediction.length > 0 && this.state.citiesPrediction[0].description !== this.props.search.city ? this.state.citiesPrediction : [];
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
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            data={filterCities}
            defaultValue={this.props.search.city}
            onChangeText={text => this.handleCityUpdate({ query: text })}
            placeholder="Enter Destination"
            renderItem={({ description }) => {
              return (
              <TouchableOpacity onPress={() =>this.handleCityUpdate({ query: description })}>
                <Text style={styles.itemText}>
                  {description}
                </Text>
              </TouchableOpacity>
            )}}
          />
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
            checked={this.props.search.filterCriteria.sightseeing}
            onPress={() => this.checkSpecialty('sightseeing')}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Food'
            checked={this.props.search.filterCriteria.food}
            onPress={() => this.checkSpecialty('food')}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Sports'
            checked={this.props.search.filterCriteria.sports}
            onPress={() => this.checkSpecialty('sports')}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Nightlife'
            checked={this.props.search.filterCriteria.nightlife}
            onPress={() => this.checkSpecialty('nightlife')}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Music'
            checked={this.props.search.filterCriteria.music}
            onPress={() => this.checkSpecialty('music')}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Museum'
            checked={this.props.search.filterCriteria.museum}
            onPress={() => this.checkSpecialty('museum')}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='History'
            checked={this.props.search.filterCriteria.history}
            onPress={() => this.checkSpecialty('history')}
            />
          </View>
          <View style={styles.checkbox}>
            <CheckBox
            title='Politics'
            checked={this.props.search.filterCriteria.politics}
            onPress={() => this.checkSpecialty('politics')}
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
    height: 50,
    width: 150,
    flexGrow: 1,
    zIndex: 0
  },
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
    height: 150
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(SearchScreen); 
//     const sampleData = [
//   {
//     "id": 1,
//     "user_id": 1,
//     "city": "SF",
//     "hourly_rate": "45.00",
//     "intro": "Hello, my name is Charles",
//     "statement": "I like food",
//     "avg_rating": "0.00",
//     "img_url": null,
//     "created_at": "2017-05-30T23:09:54.534Z",
//     "updated_at": "2017-05-30T23:09:54.534Z",
//     "user": {
//       "id": 1,
//       "facebook_id": "charles",
//       "full_name": "Charles Kim",
//       "guide": false,
//       "email": "charles@example.com",
//       "phone": "1111111111",
//       "avg_rating": "0.00",
//       "created_at": "2017-05-30T23:08:03.089Z",
//       "updated_at": "2017-05-30T23:08:03.089Z"
//     },
//     "availabilities": [
//       {
//         "id": 1,
//         "guide_id": 1,
//         "start_hr": 9,
//         "end_hr": 17,
//         "date": "2017-05-24T07:00:00.000Z",
//         "created_at": "2017-05-30T23:34:59.547Z",
//         "updated_at": "2017-05-30T23:34:59.547Z"
//       }
//     ],
//     "guideSpecialties": [
//       {
//         "id": 3,
//         "guide_id": 1,
//         "specialty_id": 3,
//         "created_at": "2017-05-30T23:20:42.645Z",
//         "updated_at": "2017-05-30T23:20:42.645Z",
//         "specialty": {
//           "id": 3,
//           "specialty": "nightlife",
//           "created_at": "2017-05-30T23:12:48.482Z",
//           "updated_at": "2017-05-30T23:12:48.482Z"
//         }
//       },
//       {
//         "id": 4,
//         "guide_id": 1,
//         "specialty_id": 5,
//         "created_at": "2017-05-30T23:20:46.861Z",
//         "updated_at": "2017-05-30T23:20:46.861Z",
//         "specialty": {
//           "id": 5,
//           "specialty": "food",
//           "created_at": "2017-05-30T23:12:55.335Z",
//           "updated_at": "2017-05-30T23:12:55.335Z"
//         }
//       }
//     ]
//   }
// ]