import React from 'react';
import { Text, ScrollView, View, Image, TouchableHighlight } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Toolbar from 'react-native-toolbar';
import Stars from 'react-native-stars-rating';
import Utils from '../Utils';
import styles from './styles.js';

class GuideProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToPolicy = this.navigateToPolicy.bind(this);
    this.navigateToChatScreen = this.navigateToChatScreen.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  }

  navigateToPolicy() {
    this.props.navigation.navigate('BookingPolicy');
  }

  navigateToChatScreen() {
    this.props.navigation.navigate('NewChatScreen2');
  }

  navigateBack() {
    this.props.navigation.goBack();
  }
  
  render() {
    console.log('PROPS', this.props);
    
    const toolbarSetting = {
        toolbar1: {
          hover: false,
          leftButton: {
            icon: 'chevron-left',
            iconStyle: styles.toolbarIcon,
            iconFontFamily: 'FontAwesome',
            onPress: this.navigateBack,
          },
          title: {
            text: 'LOCALIZE',
            textStyle: styles.toolbarText
          }
      },
    };
    
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Toolbar
        backgroundColor='#FF8C00'
        toolbarHeight={35}
        ref={(toolbar) => { this.toolbar = toolbar; }}
        presets={toolbarSetting}
        />
        <View style={styles.orangeBar}/>
        <ScrollView style={styles.orangeTintProfileContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.profileHeaderContainer}>
              <Text style={styles.profileHeader}>{this.props.search.city}</Text>
              <Text style={styles.profileHeader}>{Utils.time.displayDate(new Date(this.props.search.date).toDateString())}, {Utils.time.convert24ToAmPm(this.props.search.fromHour)} - {Utils.time.convert24ToAmPm(this.props.search.toHour)}</Text>
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

  static navigationOptions = ({ navigation }) => ({
    header: null
  })
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideProfileScreen);

