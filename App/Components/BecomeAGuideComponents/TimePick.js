import React, { Component } from 'react';
import { Picker, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { becomeGuideFromHour, becomeGuideToHour } from '../../Actions/BecomeAGuideActions';

class TimePick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromHour: 1,
      fromAmPm: 'am',
      toHour: 1,
      toAmPm: 'am'
    };
    this.handleFromHourChange = this.handleFromHourChange.bind(this);
    this.handleFromAmPmChange = this.handleFromAmPmChange.bind(this);
  }

  componentDidMount() {
    let fromHour;
    if (this.state.fromAmPm === 'am') {
      fromHour = this.state.fromHour;
    } else if (this.state.fromAmPm === 'pm') {
      fromHour = this.state.fromHour + 12;
    }
    this.props.dispatch(becomeGuideFromHour(fromHour));
  }

  handleFromHourChange(hour) {
    let fromHour;
    if (this.state.fromAmPm === 'am') {
      fromHour = hour;
    } else if (this.state.fromAmPm === 'pm') {
      fromHour = hour + 12;
    }
    if (this.state.fromHour === 12 && this.state.fromAmPm === 'am') {
      fromHour = 0;
    }
    this.setState({
      fromHour: hour
    });
    this.props.dispatch(becomeGuideFromHour(fromHour));
  }

  handleFromAmPmChange(amPm) {
    this.setState({
      fromAmPm: amPm
    });
    console.log('FROMPICKER AMPM', this.state);
    let fromHour;
    if (amPm === 'am') {
      fromHour = this.state.fromHour;
    } else if (amPm === 'pm') {
      fromHour = this.state.fromHour + 12;
    }
    if (this.state.fromHour === 12 && this.state.fromAmPm === 'am') {
      fromHour = 0;
    }
    this.props.dispatch(becomeGuideFromHour(fromHour));
  }

  handleToHourChange(hour) {
    let toHour;
    if (this.state.toAmPm === 'am') {
      toHour = hour;
    } else if (this.state.toAmPm === 'pm') {
      toHour = hour + 12;
    }
    if (this.state.toHour === 12 && this.state.toAmPm === 'am') {
      toHour = 0;
    }
    this.setState({
      toHour: hour
    });
    this.props.dispatch(becomeGuideToHour(toHour));
  }

  handleToAmPmChange(amPm) {
    this.setState({
      toAmPm: amPm
    });
    let toHour;
    if (amPm === 'am') {
      toHour = this.state.toHour;
    } else if (amPm === 'pm') {
      toHour = this.state.toHour + 12;
    }
    if (this.state.toHour === 12 && this.state.toAmPm === 'am') {
      toHour = 0;
    }
    this.props.dispatch(becomeGuideToHour(toHour));
  }  

  render() {
    const limit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.fromHour}
          onValueChange={(hour) => (this.setState({ fromHour: hour }), this.handleFromHourChange(hour))}
          mode="dropdown"
          style={styles.picker}
        >
          {limit.map((hr, index) => 
            <Picker.Item label={hr.toString()} value={hr} key={index} />)}
        </Picker>
        <Picker
        selectedValue={this.state.fromAmPm}
          onValueChange={(amPm) => (this.setState({ fromAmPm: amPm }), this.handleFromAmPmChange(amPm))}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="am" value={'am'} />
          <Picker.Item label="pm" value={'pm'} />
        </Picker>
        <Picker
          selectedValue={this.state.toHour}
          onValueChange={(hour) => (this.setState({ toHour: hour }), this.handleToHourChange(hour))}
          mode="dropdown"
          style={styles.picker}
        >
          {limit.map((hr, index) => 
            <Picker.Item label={hr.toString()} value={hr} key={index} />)}
        </Picker>
        <Picker
          selectedValue={this.state.toAmPm}
          onValueChange={(amPm) => (this.setState({ toAmPm: amPm }), this.handleToAmPmChange(amPm))}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="am" value={'am'} />
          <Picker.Item label="pm" value={'pm'} />
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
