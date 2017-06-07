import React, { Component } from 'react';
import { DatePickerIOS, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { updateSearchDate } from '../Actions/searchActions.js';

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset()
    }
    this.onTimezoneChange = this.onTimezoneChange.bind(this);
  }

  onTimezoneChange(event) {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset});
  };


}