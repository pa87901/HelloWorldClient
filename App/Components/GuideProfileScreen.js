import React from 'react';
import { Text, ScrollView } from 'react-native';
import {
  Card, List, ListItem, Button, Rating, Divider, Icon
} from 'react-native-elements';

export default class GuideProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      subheader: {
        fontSize: 20,
        marginTop: 10
      },
      intro: {
        marginTop: 10,
        marginBottom: 10,
      },
      list: {
        borderBottomWidth: 0,
        borderTopWidth: 0
      },
      listItem: {
        borderBottomWidth: 0,
        marginTop: 5,
        marginBottom: 0
      },
      specialityTitle: {
        marginLeft: 40
      }
    };

    return (
      <ScrollView>
        <Card
          title='Guide Name'
        >
          <ListItem 
            roundAvatar
            avatar={require('./JONSNOW.png')}
            hideChevron={true}
            title='City: SF'
            subtitle='Rating: 4.5/5.0'
          />
          <Text style={styles.subheader}>
            Who am I?
          </Text>
          <Text style={styles.intro}>
            Hello my name is Guide (Intro)
          </Text>
          <Text style={styles.intro}>
            I like ... (Description)
          </Text>
          <Divider />
          <Text style={styles.subheader}>
            Specialties
          </Text>
          <List style={styles.list}>
            <ListItem
              leftIcon={<Icon name="local-drink" />}
              hideChevron={true}
              containerStyle={styles.listItem}
              titleStyle={styles.specialityTitle}
              title='nightlife'
            />
            <ListItem
              leftIcon={<Icon name="local-drink" />}
              hideChevron={true}
              containerStyle={styles.listItem}
              titleStyle={styles.specialityTitle}
              title='nightlife'
            /><ListItem
              leftIcon={<Icon name="local-drink" />}
              hideChevron={true}
              containerStyle={styles.listItem}
              titleStyle={styles.specialityTitle}
              title='nightlife'
            />
          </List>
          <Divider />
          <Text style={styles.subheader}>
            Reviews
          </Text>
          <List style={styles.list}>
            <ListItem
              roundAvatar
              avatar={require('./JONSNOW.png')}
              hideChevron={true}
              containerStyle={styles.listItem}
              title='user1'
              subtitle='Rating: 4. The Guide was great! I highly suggest him.'
            />
            <ListItem
              roundAvatar
              avatar={require('./JONSNOW.png')}
              hideChevron={true}
              containerStyle={styles.listItem}
              title='user2'
              subtitle='Rating: 3. Meh'
            /><ListItem
              roundAvatar
              avatar={require('./JONSNOW.png')}
              hideChevron={true}
              containerStyle={styles.listItem}
              title='user3'
              subtitle='Rating: 1. I hated the experience.'
            />
          </List>
          <Button
            small
            raised
            icon={{name: 'check-circle'}}
            backgroundColor='#FF8C00'
            title='Book a trip with me!'
            buttonStyle={{marginTop: 10}}
          />
        </Card>
      </ScrollView>
    );
  }
}