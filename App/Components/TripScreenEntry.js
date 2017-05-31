import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';

export default class TripScreenEntry extends React.Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.list} />
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  list: {
    width: Dimensions.get('window').width, 
    height: 75, 
    backgroundColor: 'powderblue',
  }
});
