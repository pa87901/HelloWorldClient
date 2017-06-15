import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from '../axios';
import styles from './styles.js';
import Toolbar from 'react-native-toolbar';
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
        <View style={styles.orangeTintContainer}>
          <View style={{flexGrow:1}}>
            <ScrollView>
              <Card title='Terms & Conditions'>
                <Text style={{ marginBottom: 10 }}>
                  HelloWorld enforces terms to protect both tourists and guides alike. Guide(s) or Tourist(s) may cancel and review any penalties by viewing their travel plans and then clicking ‘Cancel’ on the appropriate reservation.
                </Text>
              </Card>
              <Card title='You have been posted!'>
                <Text style={{marginBottom: 10}}>
                  Your profile has been posted on Localize! We will notify you when tourist(s) reach out to you via chat and/or request to have a tour with you.
                </Text>
                <Text style={styles.subheader}>Name</Text>
                <Text>{this.props.userProfile.profile.name}</Text>
                <Text style={styles.subheader}>City</Text>
                <Text>{this.props.becomeAGuide.city}</Text>
                <Text style={styles.subheader}>Date & Time</Text>
                <Text>{Utils.time.displayDate(new Date(this.props.becomeAGuide.date).toDateString())}</Text>
                <Text>{this.props.becomeAGuide.start} / {this.props.becomeAGuide.end}</Text>
                <Text style={styles.subheader}>Hourly Rate</Text>
                <Text>USD  {this.props.becomeAGuide.hourlyRate}</Text>
                <Text style={styles.subheader}>Introduction</Text>
                <Text>{this.props.becomeAGuide.intro}</Text>
                <Text style={styles.subheader}>Other Info</Text>
                <Text style={{marginBottom: 10}}>]{this.props.becomeAGuide.statement}</Text>
              </Card>
            </ScrollView>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.fullWidthButton}
            onPress={this.navigateToConfirmation}
          >
            <Text style={styles.goToExplore}>Next</Text>
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
