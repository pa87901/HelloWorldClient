//guide questions here
import React from 'react';
import { TextInput, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import Axios from 'axios';
import Toolbar from 'react-native-toolbar';
import Autocomplete from 'react-native-autocomplete-input';
import { connect } from 'react-redux';
import { becomeGuideCity } from '../Actions/BecomeAGuideActions.js';
import config from '../Config/config.js';
import styles from './styles.js';
import DatePicker from './BecomeAGuideComponents/DatePicker';
import TimePick from './BecomeAGuideComponents/TimePick';
import Utils from '../Utils';
import { becomeGuideRate } from '../Actions/BecomeAGuideActions';

class BecomeAGuideQuestions1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesPrediction: [],
      display: null
    };
    this.navigateToNext = this.navigateToNext.bind(this);    
    this.navigateBack = this.navigateBack.bind(this);
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  updateRate(rate) {
    this.props.dispatch(becomeGuideRate(rate));
  }

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestions4');
  }

  updateCity(city) {
    city = city.query;
    this.props.dispatch(becomeGuideCity(city));
    if(city.length > 3){
      var query = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + city + '&types=(cities)&language=en_US&key=' + config.GOOGLE_PLACES_API_KEY;
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
  render() {
    const filterCities = this.state.citiesPrediction.length > 0 && this.state.citiesPrediction[0].description !== this.props.becomeAGuide.city ? this.state.citiesPrediction : [];
    const showDatePicker =  this.state.display === 'date'  ? <DatePicker /> : <TextInput 
      style={styles.timeContainer} 
      onFocus={()=>{this.setState({ display : 'date' })}} 
      value={'Date: ' + Utils.time.displayDate(new Date(this.props.becomeAGuide.date).toDateString())} 
    />;
    const showTimePicker = this.state.display === 'time' ? <TimePick mode='datetime' /> : <TextInput 
      style={styles.timeContainer} 
      onFocus={()=>{this.setState({ display : 'time' })}} 
      value={'Time: ' + Utils.time.convert24ToAmPm(this.props.becomeAGuide.fromHour) + ' - ' + Utils.time.convert24ToAmPm(this.props.becomeAGuide.toHour)} 
    />;

    const toolbarSetting = {
      toolbar1: {
        hover: false,
        leftButton: {
          icon: 'chevron-left',
          iconStyle: styles.toolbarIcon,
          iconFontFamily: 'FontAwesome',
          onPress: this.navigateBack,
        },
        title: {
          text: 'LOCALIZE',
          textStyle: styles.toolbarText
        }
      },
    };
    
    return (
      <View style={styles.whiteBackground}>
        <Toolbar
        backgroundColor='#FF8C00'
        toolbarHeight={35}
        ref={(toolbar) => { this.toolbar = toolbar; }}
        presets={toolbarSetting}
        />
        <View style={styles.orangeBar} />
        <TouchableOpacity activeOpacity={1} onPress={() => (this.setState({ display: 'none' }))}>
        <Text>Become a guide!</Text>
        <Autocomplete
            autoCapitalize="none"
            keyboardShouldPersistTaps={true}
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            data={filterCities}
            defaultValue={this.props.becomeAGuide.city}
            onChangeText={text => this.updateCity({ query: text })}
            placeholder="Enter Destination"
            renderItem={({ description }) => {
              return (
              <TouchableOpacity onPress={() => this.updateCity({ query: description })}>
                <Text style={styles.itemText}>
                  {description}
                </Text>
              </TouchableOpacity>
            )}}
          />
        <TouchableOpacity onPress={() => this.setState({ display: 'date' })} >
          {showDatePicker}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ display: 'time' })}>
          {showTimePicker}
        </TouchableOpacity>
        <TouchableOpacity>
          <TextInput 
            style={styles.timeContainer} 
            value={this.props.becomeAGuide.hourlyRate}
            placeholder='Enter Hourly Rate' 
            onChangeText={(rate) => this.updateRate(rate)}
          />
        </TouchableOpacity>
        <TextInput style={styles.timecontainer} id="rate" onChangeText={(rate) => this.updateRate(rate)} />

        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.fullWidthButton}
            onPress={this.navigateToNext}
          >
            <Text style={styles.goToExplore}>Next</Text>
          </TouchableHighlight>
        </View>
      </View> 
    );
  }
  
  static navigationOptions = ({ navigation }) => ({
    header: null
  })
}


const mapStateToProps = state => (state);

export default connect(mapStateToProps)(BecomeAGuideQuestions1);