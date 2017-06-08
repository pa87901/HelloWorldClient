// import React, { Component } from 'react';
// import { DatePickerIOS, StyleSheet, Text, TextInput, View } from 'react-native';
// import { connect } from 'react-redux';
// import { updateSearchDate } from '../Actions/searchActions.js';

// class TimePick extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       date: new Date(Date.now())
//       // timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset()
//     }
//     // this.onTimezoneChange = this.onTimezoneChange.bind(this);
//     this.onTimeChange = this.onTimeChange.bind(this);
//   }

//   // onTimezoneChange(event) {
//   //   var offset = parseInt(event.nativeEvent.text, 10);
//   //   if (isNaN(offset)) {
//   //     return;
//   //   }
//   //   this.setState({timeZoneOffsetInHours: offset});
//   // };
//   onTimeChange(e) {
//     console.log('TIMECHANGE', e)
//   }

//   render() {
//     return (
//       <View>
//         <DatePickerIOS
//           style={styles.picker}
//           date={this.state.date}
//           mode="time"
//           // timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
//           onDateChange={(e) => {console.log('event', e); this.onTimeChange(e);
//             // this.props.dispatch(updateDate(e.toJSON().slice(0,10).replace(/-/g,'-')))
//           }}
//           minuteInterval={10}
//         />
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   picker: {
//     width: 350
//   }
// });



// import React, { Component } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import TimePicker from 'react-native-timepicker';

// class FromTimePick extends Component {
//   constructor(props) {
//     super(props);
//     this.onValueChange = this.onValueChange.bind(this);
//   }

//   onValueChange(hour, minute) {
//     console.log("Selected time:", hour, ':', minute);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <TimePicker
//         style={styles.picker}
//         selectedHour={0}
//         selectedMinute={0}
//         minuteInterval={59}
//         onValueChange={this.onValueChange}
//         loop={true} />
//         <TimePicker
//         style={styles.picker}
//         selectedHour={0}
//         selectedMinute={0}
//         minuteInterval={59}
//         onValueChange={this.onValueChange}
//         loop={true} />
//       </View>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flexWrap: 'wrap',
//     alignItems: 'flex-start',
//     flexDirection:'row',
//     backgroundColor: '#F5FCFF'
//   },

//   picker: {
//     flex: 1
//   }
// });


import React, { Component } from 'react';
import { Picker, View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { updateFromHour, updateToHour } from '../Actions/searchActions';

class FromTimePick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromHour: 1,
      fromAmPm: 'am',
      toHour: 1,
      toAmPm: 'am'
    }
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
    this.props.dispatch(updateFromHour(fromHour));
  }

  handleFromHourChange(hour) {
    // console.log('FROMPICKER HOUR', hour);
    let fromHour;
    if (this.state.fromAmPm === 'am') {
      fromHour = hour
    } else if (this.state.fromAmPm === 'pm') {
      fromHour = hour + 12;
    }
    if (this.state.fromHour === 12 && this.state.fromAmPm === 'am') {
      fromHour = 0
    }
    this.setState({
      fromHour: hour
    });
    console.log('OJDFJS', this.state)
    this.props.dispatch(updateFromHour(fromHour));
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
      fromHour = 0
    }
    this.props.dispatch(updateFromHour(fromHour));
  }

  handleToHourChange(hour) {
    // console.log('FROMPICKER HOUR', hour);
    let toHour;
    if (this.state.toAmPm === 'am') {
      toHour = hour
    } else if (this.state.toAmPm === 'pm') {
      toHour = hour + 12;
    }
    if (this.state.toHour === 12 && this.state.toAmPm === 'am') {
      toHour = 0
    }
    this.setState({
      toHour: hour
    });
    console.log('OJDFJS', this.state)
    this.props.dispatch(updateToHour(toHour));
  }

  handleToAmPmChange(amPm) {
    this.setState({
      toAmPm: amPm
    });
    console.log('FROMPICKER AMPM', this.state);
    let toHour;
    if (amPm === 'am') {
      toHour = this.state.toHour;
    } else if (amPm === 'pm') {
      toHour = this.state.toHour + 12;
    }
    if (this.state.toHour === 12 && this.state.toAmPm === 'am') {
      toHour = 0
    }
    this.props.dispatch(updateToHour(toHour));
  }  

  render() {
    let limit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.fromHour}
          onValueChange={(hour) => (this.setState({fromHour: hour}), this.handleFromHourChange(hour))}
          mode="dropdown"
          style={styles.picker}
        >
          {limit.map((hr, index) => 
            <Picker.Item label={hr.toString()} value={hr} key={index}/>)}
        </Picker>
        <Picker
        selectedValue={this.state.fromAmPm}
          onValueChange={(amPm) => (this.setState({fromAmPm: amPm}), this.handleFromAmPmChange(amPm))}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="am" value={"am"} />
          <Picker.Item label="pm" value={"pm"} />
        </Picker>
        <Picker
          selectedValue={this.state.toHour}
          onValueChange={(hour) => (this.setState({toHour: hour}), this.handleToHourChange(hour))}
          mode="dropdown"
          style={styles.picker}
        >
          {limit.map((hr, index) => 
            <Picker.Item label={hr.toString()} value={hr} key={index}/>)}
        </Picker>
        <Picker
          selectedValue={this.state.toAmPm}
          onValueChange={(amPm) => (this.setState({toAmPm: amPm}), this.handleToAmPmChange(amPm))}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="am" value={"am"} />
          <Picker.Item label="pm" value={"pm"} />
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },
  picker: {
    flex: 0.5,
  }
})

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(FromTimePick);