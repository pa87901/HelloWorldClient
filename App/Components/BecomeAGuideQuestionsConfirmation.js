import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import styles from './styles.js';
import Toolbar from 'react-native-toolbar';
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
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.fullWidthButton}
            onPress={this.navigateToExplore}
          >
            <Text style={styles.goToExplore}>Done</Text>
          </TouchableHighlight>
        </View>
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