import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class SearchScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>The Search screen</Text>
        <Button 
          onPress={() => this.props.navigation.navigate('Explore')}
          title='Explore'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});