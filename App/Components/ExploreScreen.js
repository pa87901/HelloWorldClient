import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements'
import ExploreScreenEntry from './ExploreScreenEntry'

export default class ExploreScreen extends React.Component {
	render() {
		return (
      <View>
        <ExploreScreenEntry/>
      </View> 
    )
	}
}
