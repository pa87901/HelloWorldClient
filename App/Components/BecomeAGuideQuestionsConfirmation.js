import React from 'react';
import { connect } from 'react-redux';
import {
  Text, ScrollView, View, TouchableHighlight, Dimensions, Image
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Toolbar from 'react-native-toolbar';
import styles from './styles.js';
import Utils from '../Utils';

class BecomeAGuideQuestionsConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToExplore = this.navigateToExplore.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  }

  navigateBack() {
    this.props.navigation.goBack();
  }
  navigateToExplore() {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Search' }),
        NavigationActions.navigate({ routeName: 'Explore' }),
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const toolbarSetting = {
      toolbar1: {
        hover: false,
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
              style={{ height: 210, width: Dimensions.get('window').width, resizeMode: 'contain', verticalAlign: 'text-top' }}
            />
          </View>
          <View style={styles.bookingConfirmDetails}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.profileSubheader}>You have been posted!</Text>
            </View>
            <View>
              <Text style={styles.bookingConfirmSubtext}>Your profile has been posted on Localize! We will notify you when tourist(s) reach out to you via chat and/or request to have a tour with you.</Text>
            </View>
          </View>
          <View style={styles.termsConditions}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.profileSubheader}>Tour in {this.props.becomeAGuide.city.replace(/,.*/, '')}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.bookingConfirmDates}>{Utils.time.displayDate(new Date(this.props.becomeAGuide.date).toDateString())}, {Utils.time.convert24ToAmPm(this.props.becomeAGuide.fromHour)} - {Utils.time.convert24ToAmPm(this.props.becomeAGuide.toHour)}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.profileSubheader}>{`$${this.props.becomeAGuide.hourlyRate} Per Hour`}</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.profileSubheader}>Intro and Statement</Text>
            </View>
            <View>
              <Text style={styles.bookingConfirmSubtext}>{this.props.becomeAGuide.intro}</Text>
              <Text style={styles.bookingConfirmSubtext}>{this.props.becomeAGuide.statement}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.fullWidthButton}
            onPress={this.navigateToExplore}
          >
            <Text style={styles.goToExplore}>Done</Text>
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

export default connect(mapStateToProps)(BecomeAGuideQuestionsConfirmation);
