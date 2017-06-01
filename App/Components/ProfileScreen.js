import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Divider, Icon, List, ListItem, Button } from 'react-native-elements';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
      usersInfo:
        {
          name: 'GuideName Here',
        } 
    } 
 
  }

  render() {
    return (
      <View>
        <Card
          title={this.state.usersInfo.name}
          image={require('./JONSNOW.png')}
        >
        <Button
            small
            raised
            icon={{name:'directions-walk'}}
            backgroundColor='#FF8C00'
            onPress={() => this.props.navigation.navigate('GuideQuestions')}
            title='Become A Guide!' 
          />
        </Card>
      </View> 
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