import React, { Component } from 'react';
import { Picker, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateFromHour, updateToHour } from '../../Actions/searchActions';

const allHours = [
  '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', 
  '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', 
  '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', 
  '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];

class TimePick extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
  }

  handleFromHourChange(hour) {
    const fromHour = allHours.indexOf(hour);
    this.props.dispatch(updateFromHour(fromHour));
    if (this.props.search.fromHour >= this.props.search.toHour) {
      this.props.dispatch(updateToHour(fromHour + 1));
    }
  }


  handleToHourChange(hour) {
    const toHour = allHours.indexOf(hour);
    this.props.dispatch(updateToHour(toHour));
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={allHours[this.props.search.fromHour]}
          onValueChange={(hour) => {
            this.handleFromHourChange(hour);
          }}
          mode='dropdown'
          style={styles.picker}
        >
          {allHours.map((hr, index) => 
            <Picker.Item label={hr.toString()} value={hr} key={index} />)}
        </Picker>
        <Picker
          selectedValue={allHours[this.props.search.toHour]}
          onValueChange={(hour) => (this.handleToHourChange(hour))}
          mode='dropdown'
          style={styles.picker}
        >
          {allHours.map((hr, index) => 
            <Picker.Item label={hr.toString()} value={hr} key={index} />)}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  picker: {
    flex: 0.5,
  }
});

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(TimePick);
