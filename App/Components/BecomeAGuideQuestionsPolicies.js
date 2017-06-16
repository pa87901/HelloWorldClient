import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableHighlight, Image, Dimensions } from 'react-native';
import Toolbar from 'react-native-toolbar';
import axios from '../axios';
import styles from './styles.js';
import Utils from '../Utils';

class BecomeAGuideQuestionsPolicies extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToConfirmation = this.navigateToConfirmation.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  }

  navigateBack() {
    this.props.navigation.goBack();
  }
  navigateToConfirmation() {
    const options = {
      facebookId: this.props.userProfile.profile.userId,
      city: this.props.becomeAGuide.city,
      hourlyRate: this.props.becomeAGuide.hourlyRate,
      intro: this.props.becomeAGuide.intro,
      statement: this.props.becomeAGuide.statement,
      startDateHr: `${(new Date(this.props.becomeAGuide.date)).getTime() + this.props.becomeAGuide.fromHour * 3600000 }`,
      endDateHr: `${(new Date(this.props.becomeAGuide.date)).getTime() + this.props.becomeAGuide.toHour * 3600000 }`,
      events: this.props.becomeAGuide.pointsOfInterest
    };

    axios.post('api/availabilities', options)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
    
    this.props.navigation.navigate('GuideQuestionsConfirmation');
  }

  render() {
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
      <View style={styles.whiteBackground}>
        <Toolbar
        backgroundColor='#FF8C00'
        toolbarHeight={35}
        ref={(toolbar) => { this.toolbar = toolbar; }}
        presets={toolbarSetting}
        />
        <View style={styles.orangeBar} />
        <ScrollView style={styles.orangeTintProfileContainer}>
          <View style={{ flex: 1, height: 210 }}>
            <Image
              source={require('../Utils/sanfrancisco.jpg')}
              style={{ height: 210, width: Dimensions.get('window').width, resizeMode: 'contain' }}
            />
          </View>
          <View style={styles.bookingConfirmDetails}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.profileSubheader}>Tour in {this.props.becomeAGuide.city.replace(/,.*/, '')}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.bookingConfirmDates}>{Utils.time.displayDate(new Date(this.props.becomeAGuide.date).toDateString())}, {Utils.time.convert24ToAmPm(this.props.becomeAGuide.fromHour)} - {Utils.time.convert24ToAmPm(this.props.becomeAGuide.toHour)}</Text>
            </View>
            <View>
              <Text style={styles.profileSubheader}>{`$${this.props.becomeAGuide.hourlyRate} Per Hour`}</Text>
            </View>
          </View>
          <View style={styles.termsConditions}>
            <View style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontFamily: 'Arial', fontSize: 14, fontWeight: 'bold' }}>Terms & Conditions</Text>
            </View>
            <View>
              <Text style={{ fontFamily: 'Arial', fontSize: 12 }}>Localize enforces terms to protect both tourists and guides alike. Guide(s) or Tourist(s) may cancel and review any penalties by viewing their travel plans and then clicking ‘Cancel’ on the appropriate reservation.</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.fullWidthButton}
            onPress={this.navigateToConfirmation}
          >
            <Text style={styles.goToExplore}>Create Posting</Text>
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

export default connect(mapStateToProps)(BecomeAGuideQuestionsPolicies);
