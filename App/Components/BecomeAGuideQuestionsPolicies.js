import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from '../axios';
import styles from './styles.js';
import Toolbar from 'react-native-toolbar';

class BecomeAGuideQuestionsPolicies extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToConfirmation = this.navigateToConfirmation.bind(this);
  }

  navigateToConfirmation() {
    const options = {
      facebookId: this.props.userProfile.profile.userId,
      city: this.props.becomeAGuide.city,
      hourlyRate: this.props.becomeAGuide.hourlyRate,
      intro: this.props.becomeAGuide.intro,
      statement: this.props.becomeAGuide.statement,
      startDateHr: `${this.props.becomeAGuide.date}, ${this.props.becomeAGuide.fromHour}:00`,
      endDateHr: `${this.props.becomeAGuide.date}, ${this.props.becomeAGuide.toHour}:00`,
      events: this.props.becomeAGuide.pointsOfInterest
    };

    // axios.post('api/availabilities', options)
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
    
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
        <ScrollView>
          <Card
            title='Terms & Conditions'
          >
            <Text style={{ marginBottom: 10 }}>
              HelloWorld enforces terms to protect both tourists and guides alike. Guide(s) or Tourist(s) may cancel and review any penalties by viewing their travel plans and then clicking ‘Cancel’ on the appropriate reservation.
            </Text>
          </Card>
        </ScrollView>
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
