import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Axios from 'axios';
import Autocomplete from 'react-native-autocomplete-input';
import { updateCity, updateSearchResult, updateFilterCriteria } from '../Actions/searchActions.js';
import axios from '../axios';
import config from '../Config/config.js';
import DatePicker from './SearchComponents/DatePicker';
import TimePick from './SearchComponents/TimePick';
import styles from './styles.js';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      citiesPrediction: [],
      query: ''
    };
    this.checkSpecialty = this.checkSpecialty.bind(this);
    this.handleCityUpdate.bind(this);
    this.handleSearchSubmit.bind(this);
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleCityUpdate(city) {
    city = city.query;
    this.props.dispatch(updateCity(city));
    if (city.length > 3) {
      const query = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + city + '&types=(cities)&language=en_US&key=' + config.GOOGLE_PLACES_API_KEY;
      Axios.get(query)
      .then((res) => {
        const cities = res.data.predictions;
        this.setState({ citiesPrediction: cities });
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      this.setState({ citiesPrediction: [] });
    }
  }

  handleSearchSubmit() {
    this.props.dispatch(updateSearchResult([]));
    const searchProps = this.props.search;
    const criteriaList = ['sightseeing', 'food', 'sports', 'nightlife', 'music', 'museum', 'history', 'politics'];
    const criteria = criteriaList.reduce((acc, crit) => {
      if (this.props.search.filterCriteria[crit] === true) {
        return acc + 1;
      } else {
        return acc + 0;
      }
    }, '');
    
    const query = `api/guides/search/${searchProps.city}/${(new Date(searchProps.date)).getTime()}/${searchProps.fromHour}/${searchProps.toHour}/${criteria}`;
    
    axios.get(query)
      .then((res) => {
        console.log(res.data);
        this.props.dispatch(updateSearchResult(res.data));
      })
      .catch((err) => {
        console.log(err);
      });  

    this.props.navigation.navigate('Explore');
  }

  _keyboardDidShow() {
    console.log('Hey from the keyboard');
  }

  _keyboardDidHide() {
    console.log('Keyboard Hidden');
  }

  checkSpecialty(specialty) {
    this.setState({ display: 'none' });
    const criteria = {...this.props.search.filterCriteria };
    criteria[specialty] = !this.props.search.filterCriteria[specialty];
    this.props.dispatch(updateFilterCriteria(criteria));
  }

  render() {
    const showDatePicker =  this.state.display === 'date'  ? <DatePicker /> : <TextInput style={styles.timeContainer} onFocus={()=>{this.setState({ display : 'date' })}} value={'  Date: ' + new Date(this.props.search.date).toDateString()} />;
    const showTimePicker = this.state.display === 'time' ? <TimePick mode='datetime' /> : <TextInput style={styles.timeContainer} onFocus={()=>{this.setState({ display : 'time' })}} value={'  Time: ' + this.props.search.fromHour + ' - ' + this.props.search.toHour} />;
    const filterCities = this.state.citiesPrediction.length > 0 && this.state.citiesPrediction[0].description !== this.props.search.city ? this.state.citiesPrediction : [];

    return (
      <View style={styles.baseColor}>

        <View style={styles.container}>
      
          <TouchableOpacity activeOpacity={1} onPress={() => (this.setState({ display: 'none' }))}>
            <Text style={styles.header}>LOCALIZE</Text>
            <Autocomplete
              autoCapitalize='none'
              autoCorrect={false}
              containerStyle={styles.autocompleteContainer}
              data={filterCities}
              defaultValue={this.props.search.city}
              onChangeText={text => this.handleCityUpdate({ query: text })}
              placeholder='Enter Destination'
              renderItem={({ description }) => {
                return (
                <TouchableOpacity onPress={() => this.handleCityUpdate({ query: description })}>
                  <Text style={styles.itemText}>
                    {description}
                  </Text>
                </TouchableOpacity>
              )}}
            />
          <TouchableOpacity onPress={() => this.setState({ display: 'date' })} >
            {showDatePicker}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => (this.setState({ display: 'time' }))}>
            {showTimePicker}
          </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.flexSwitchContainer}>
            {Object.keys(this.props.search.filterCriteria).map((criteria, index) => {
              return (            
                <TouchableOpacity
                  key={index}
                  style={this.props.search.filterCriteria[criteria] ? styles.checkbox : styles.checkboxInactive}
                  onPress={() => this.checkSpecialty(criteria)} 
                >
                  <View >
                    <Text style={this.props.search.filterCriteria[criteria] ? styles.checkboxText : styles.checkboxTextInactive}>{criteria}</Text>             
                  </View>
                </TouchableOpacity>
            );
            })}
          </View>
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
              <Button
                large
                raised
                backgroundColor='#FF830D'
                title='EXPLORE'
                onPress={() => this.handleSearchSubmit()} 
              />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(SearchScreen); 