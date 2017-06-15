import React, { Component } from 'react';
import { DatePickerIOS, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { becomeGuideDate } from '../../Actions/BecomeAGuideActions.js';

class DatePicker extends Component {

  render() {
    return (
      <View>
        <DatePickerIOS
          style={styles.picker}
          date={new Date(this.props.becomeAGuide.date)}
          mode='date'
          timeZoneOffsetInMinutes={0}
          onDateChange={(e) => {
             this.props.dispatch(becomeGuideDate(e));
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
