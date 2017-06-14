import React from 'react';
import { Text, ScrollView, View, Image, TouchableHighlight } from 'react-native';
import {
  Card, List, ListItem, Button, Divider, Icon
} from 'react-native-elements';
import { connect } from 'react-redux';
import Stars from 'react-native-stars-rating';
import styles from './styles.js';

class GuideProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToPolicy = this.navigateToPolicy.bind(this);
    this.navigateToChatScreen = this.navigateToChatScreen.bind(this);
  }

  navigateToPolicy() {
    this.props.navigation.navigate('BookingPolicy');
  }

  navigateToChatScreen() {
    this.props.navigation.navigate('NewChatScreen2');
  }
  
  render() {
    console.log('PROPS', this.props);
    
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView style={styles.orangeTintProfileContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.profileHeaderContainer}>
              <Text style={styles.profileHeader}>{this.props.search.city}</Text>
              <Text style={styles.profileHeader}>{`${this.props.search.date}  ${this.props.search.fromHour}-${this.props.search.toHour}`}</Text>
            </View>
            <View style={styles.profileCard}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.profileName}>{this.props.profileSelection.selectedProfile.user.full_name}</Text>
              </View>
              <View style={{ flex: 1, marginTop: 8, marginBottom: 6, alignItems: 'center' }}>
                <Stars
                  rateMax={5}
                  rate={this.props.profileSelection.selectedProfile.avg_rating}
                  size={25}
                />
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image
                  source={{ uri: this.props.profileSelection.selectedProfile.user.picture }}
                  style={styles.profileImage}
                />
              </View>
              <View style={{ marginTop: 20, paddingLeft: 20 }}>
                <Text>{this.props.profileSelection.selectedProfile.availabilities[0].intro}</Text>
                <Text>{this.props.profileSelection.selectedProfile.availabilities[0].statement}</Text>
              </View>
              <View style={{ flex: 1, paddingLeft: 20, marginTop: 10 }}>
                <Text style={styles.profileSubheader}>Specialties</Text>
              </View>
              <View>
                <View style={styles.profileFlexRow}>
                  {this.props.profileSelection.selectedProfile.guideSpecialties.map((specialty, i) =>
                    <View style={{ marginRight: 10 }}>
                      <Icon
                        key={i}
                        name='search'
                        size={22}
                      />
                    </View>
                  )}
                </View>
              </View>
              <View style={{ flex: 1, paddingLeft: 20, marginTop: 10 }}>
                <Text style={styles.profileSubheader}>Reviews</Text>
              </View>
              <View>
                <List style={styles.reviewList}>
                  {this.props.profileSelection.selectedProfile.bookings.map((review, i) =>
                      <ListItem
                        key={i}
                        roundAvatar
                        avatar={{ uri: review.userAvatar }}
                        hideChevron={true}
                        containerStyle={styles.listItem}
                        title={review.userFullName}
                        subtitle={`Rating: ${Math.floor(review.rating)}. ${review.review}`}
                      />
                  )}
                </List>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.doubleButtonContainer}>
          <TouchableHighlight
            style={styles.affirmativeButton}
            onPress={this.navigateToPolicy}
          >
            <Text style={styles.doubleButtonText}>Book</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.negativeButton}
            onPress={this.navigateToChatScreen}
          >
            <Text style={styles.doubleButtonText}>Chat</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
        /*
        <Card>
          <ListItem 
            roundAvatar
            avatar={{uri : this.props.profileSelection.selectedProfile.user.avatar}}
            hideChevron={true}
            title={`Rating: ${this.props.profileSelection.selectedProfile.avg_rating}/5.0 (${this.props.profileSelection.selectedProfile.rating_count})`}
          />
          <Text style={styles.subheader}>
            Introduction
          </Text>
          <Text style={styles.intro}>
            {this.props.profileSelection.selectedProfile.availabilities[0].intro}
          </Text>
          <Text style={styles.intro}>
            {this.props.profileSelection.selectedProfile.availabilities[0].statement}
          </Text>
          <Divider />
          <Text style={styles.subheader}>
            Specialties
          </Text>
          <List style={styles.list}>
            {this.props.profileSelection.selectedProfile.guideSpecialties.map((specialtyObj, i) =>
              <ListItem
                key = {i}
                leftIcon={<Icon name="local-drink" />}
                hideChevron={true}
                containerStyle={styles.listItem}
                titleStyle={styles.specialityTitle}
                title={specialtyObj.specialty.specialty}
              />
            )}
          </List>
          <Divider />
          <Text style={styles.subheader}>
            Reviews
          </Text>
          <List style={styles.list}>
            {this.props.profileSelection.selectedProfile.bookings.map((review, i)=>{
              return (
                <ListItem
                  key={i}
                  roundAvatar
                  avatar={{uri:review.userAvatar}}
                  hideChevron={true}
                  containerStyle={styles.listItem}
                  title={review.userFullName}
                  subtitle={'Rating: ' + review.rating + '. ' + review.review}
                />
              ) 
            })}


          </List>
          <Button
            small
            raised
            icon={{name: 'check-circle'}}
            backgroundColor='#FF8C00'
            title='Book a trip with me!'
            buttonStyle={{marginTop: 10}}
            onPress={this.navigateToPolicy}
          />
          <Button
            small
            raised
            icon={{name: 'chat'}}
            backgroundColor='#25EDC0'
            title='Chat with me!'
            buttonStyle={{marginTop: 10}}
            onPress={this.navigateToChatScreen}
          />
        </Card>
*/

// const styles = {
//   subheader: {
//     fontSize: 20,
//     marginTop: 10
//   },
//   intro: {
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   list: {
//     borderBottomWidth: 0,
//     borderTopWidth: 0
//   },
//   listItem: {
//     borderBottomWidth: 0,
//     marginTop: 5,
//     marginBottom: 0
//   },
//   specialityTitle: {
//     marginLeft: 40
//   }
// };

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideProfileScreen);