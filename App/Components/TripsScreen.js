import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import TripScreenEntry from './TripScreenEntry'

export default class TripsScreen extends React.Component {
  render() {
    return (
      <View>
        <TripScreenEntry/>
      </View> 
    );
  }
}