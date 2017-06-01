import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import {
  Card, Button, List, ListItem
} from 'react-native-elements';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <ListItem
          title="Guide Name"
        />

        <Tile
         imageSrc={require('./JONSNOW.png')}
         title="Guide Name"
         caption="How are you feeling today?"
        />
        <Button
            small
            raised
            icon={{name: 'directions-walk'}}
            backgroundColor='#FF8C00'
            onPress={() => this.props.navigation.navigate('GuideQuestions')}
            title='Become A Guide!' 
          />
      </ScrollView> 
    );
  }
}
        // <List>
        //   {
        //     this.state.usersInfo.map((user, i) => (
        //       <ListItem
        //         key={i}
        //         title={user.title}
        //         leftIcon={{name: user.icon}}
        //       />
        //     ))
        //   }
        // </List>