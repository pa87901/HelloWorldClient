import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import { Button, Card, Divider, List, ListItem } from 'react-native-elements';

class GuideRequestedTripScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <Card
          title={'User Name (4.50)'}
          image={require('./JONSNOW.png')}
        >
          <Text>
            Requested Date: 2017-10-10
          </Text>
          <Text>
            Requested Start / End Time: 9am / 5pm
          </Text>
          <Text style={{marginBottom: 10}}>
            Requested City: San Francisco
          </Text>
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
              title='guide1'
              subtitle='Rating: 4. The User was great!'
            />
            <ListItem
              roundAvatar
              avatar={require('./JONSNOW.png')}
              hideChevron={true}
              containerStyle={styles.listItem}
              title='guide2'
              subtitle='Rating: 3. Meh'
            /><ListItem
              roundAvatar
              avatar={require('./JONSNOW.png')}
              hideChevron={true}
              containerStyle={styles.listItem}
              title='guide3'
              subtitle='Rating: 1. I hated the experience.'
            />
          </List>
          <Button
            small
            raised
            icon={{name: 'thumb-up'}}
            backgroundColor='#5AAF5A'
            title='Accept Request'
            buttonStyle={{marginTop: 10}}
          />
          <Button
            small
            raised
            icon={{name: 'thumb-down'}}
            backgroundColor='#D1686D'
            title='Decline Request'
            buttonStyle={{marginTop: 10}}
          />
        </Card>
      </ScrollView>
    )
  }
}

const styles = {
  subheader: {
    fontSize: 20,
    marginTop: 10
  },
  list: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideRequestedTripScreen);