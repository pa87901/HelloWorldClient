import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Dimensions } from 'react-native';
import { Card, List, ListItem, Avatar } from 'react-native-elements';

export default class TripScreenEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      
      list:[
        {
          city: 'San Francisco',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          guide: 'Amy Farha'
        },
        {
          city: 'Berkeley',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          guide: 'Chris Jackson'
        },
         {
          city: 'San Francisco',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          guide: 'Amy Farha'
        },
        {
          city: 'Berkeley',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          guide: 'Chris Jackson'
        }
      ]
    }

  }

  render() {
    return (
     <ScrollView> 
     <List containerStyle={{marginBottom: 20}}>
        {
          this.state.list.map((l, i) => (
            <ListItem
              roundAvatar
              avatar={{uri:l.avatar_url}}
              key={i}
              title={l.city}
              subtitle={l.guide}
              onPress={()=>{console.log('Button pressed!')}}
            >
            </ListItem>
          ))
        }
      </List>
      </ScrollView> 
    )
  }
}

const styles = StyleSheet.create({
  // listContainer: {
  //  flex: 1, 
  //  flexDirection: 'column', 
  //  alignSelf: 'stretch',
  // },
  // list: {
  //   width: Dimensions.get('window').width, 
  //   height: 75, 
  // },
  item: {
    height: 25,
  },
  Guide: {
    flex: 5,
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 8
  },
  GuideAvatar: {
    width: 50,
    height: 50,
    marginRight: 8,
    marginTop: 2,
  },
  TextBold: {
    fontWeight: 'bold'
  },
  TripDate: {
    justifyContent: 'space-between'
  }
});
        // <View style={styles.listContainer}>
        //   <View style={styles.list}>
        //     <Card>
        //       <ListItem
        //         style={styles.item}
        //         roundAvatar
        //         avatar={require('./JONSNOW.png')}
        //         title='San Francisco'
        //         subtitle='Jon Snow'
        //         hideChevron={true}
        //       >
        //       </ListItem>
        //     </Card>
        //   </View>
        //   <View style={styles.list}>
        //     <Card>
        //       <ListItem
        //         style={styles.item}
        //         roundAvatar
        //         avatar={require('./JONSNOW.png')}
        //         title='San Francisco'
        //         subtitle='Jon Snow'
        //         hideChevron={true}
        //       >
        //       </ListItem>
        //     </Card>
        //   </View>
        //   <View style={styles.list}>
        //     <Card>
        //       <ListItem
        //         style={styles.item}
        //         roundAvatar
        //         avatar={require('./JONSNOW.png')}
        //         title='San Francisco'
        //         subtitle='Jon Snow'
        //         hideChevron={true}
        //       >
        //       </ListItem>
        //     </Card>
        //   </View>
        // </View>
        
        // <View style={styles.Guide}>
        //   <View style={styles.GuideAvatar}>
        //     <Avatar
        //       medium
        //       rounded
        //       source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
        //     />
        //   </View>
        //   <View style={styles.GuideContainer}>
        //     <Text>
        //       <Text style={styles.TextBold}>San Francisco</Text>
        //     </Text>
        //     <Text>Guide Name</Text>
        //   </View>
        // </View>
        // <View style={styles.Guide}>
        //   <View style={styles.GuideAvatar}>
        //     <Avatar
        //       medium
        //       rounded
        //       source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
        //     />
        //   </View>
        //   <View style={styles.GuideContainer}>
        //     <Text>
        //       <Text style={styles.TextBold}>San Francisco</Text>
        //     </Text>
        //     <Text>Guide Name</Text>
        //   </View>
        // </View>
        // <View style={styles.Guide}>
        //   <View style={styles.GuideAvatar}>
        //     <Avatar
        //       medium
        //       rounded
        //       source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
        //     />
        //   </View>
        //   <View style={styles.GuideContainer}>
        //     <Text>
        //       <Text style={styles.TextBold}>San Francisco</Text>
        //     </Text>
        //     <Text>Guide Name</Text>
        //   </View>
        // </View>
