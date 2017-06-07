import React, { Component } from 'react';
// import ReactNative from 'react-native';
import { DatePickerIOS, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { updateDate } from '../Actions/searchActions.js';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    // static defaultProps = {
    //   date: new Date(),
    //   timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    // };
    this.state = {
      date: new Date(),
      // timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset()
    }
    this.onDateChange = this.onDateChange.bind(this);
    // this.onTimezoneChange = this.onTimezoneChange.bind(this);
  }

  onDateChange(date) {
    this.setState({date: date});
    console.log('JJDHFSDIJJDIJOSJDF', this.props.search);
    this.props.dispatch(updateDate(this.state.date));
  };

  // onTimezoneChange(event) {
  //   var offset = parseInt(event.nativeEvent.text, 10);
  //   if (isNaN(offset)) {
  //     return;
  //   }
  //   this.setState({timeZoneOffsetInHours: offset});
  // };

  render() {
    // console.log('this.props in DatePicker', this.props)
    return (
      <View>
        {/*<WithLabel label="Value:">
          <Text>{
            this.state.date.toLocaleDateString() +
            ' ' +
            this.state.date.toLocaleTimeString()
          }</Text>
        </WithLabel>
        <WithLabel label="Timezone:">
          <TextInput
            onChange={this.onTimezoneChange}
            style={styles.textinput}
            value={this.state.timeZoneOffsetInHours.toString()}
          />
          <Text> hours from UTC</Text>
        </WithLabel>*/}
        {/*<Heading label="Date + time picker" />
        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />*/}
        {/*<Heading label="Date picker" />*/}
        <DatePickerIOS
          style={styles.picker}
          date={this.state.date}
          mode="date"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          // onDateChange={(e) => {console.log('event', e); this.onDateChange(e); this.props.dispatch(updateDate((new Date((new Date(e))-86400000)).toJSON().slice(0,10).replace(/-/g,'-')))}}
          onDateChange={(e) => {console.log('event', e); this.onDateChange(e); this.props.dispatch(updateDate(e.toJSON().slice(0,10).replace(/-/g,'-')))}}
        />
        {/*<Heading label="Time picker, 10-minute interval" />
        <DatePickerIOS
          date={this.state.date}
          mode="time"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
          minuteInterval={10}
        />*/}
      </View>
    );
  }
}

class WithLabel extends React.Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
            {this.props.label}
          </Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

class Heading extends React.Component {
  render() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
  picker: {
    width: 350
  }
});

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(DatePicker);