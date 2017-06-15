import React, { Component } from 'react';
import { DatePickerIOS, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { updateDate } from '../../Actions/searchActions.js';

class DatePicker extends Component {

  render() {
    return (
      <View>
        <DatePickerIOS
          style={styles.picker}
          date={new Date(this.props.search.date)}
          mode='date'
          timeZoneOffsetInMinutes={0}
          onDateChange={(e) => {
             this.props.dispatch(updateDate(e));
              }}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  picker: {
    width: 350
  }
});

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(DatePicker);
