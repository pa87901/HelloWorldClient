import React from 'react';
import { connect } from 'react-redux';
import { becomeGuideIntro } from '../Actions/BecomeAGuideActions';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import styles from './styles.js';
import Toolbar from 'react-native-toolbar';

class BecomeAGuideQuestions4 extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToNext = this.navigateToNext.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  updateIntro(intro) {
    this.props.dispatch(becomeGuideIntro(intro));
  } 

  updateStatement(statement) {
    this.props.dispatch(becomeGuideStatement(statement));
  } 

  navigateToNext() {
    this.props.navigation.navigate('GuideQuestionsPolicies');
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
        <FormLabel>Introduce Yourself</FormLabel>
        <FormLabel>Provide a brief introduction to our tourists!</FormLabel>
        <FormInput
          id="intro"
          placeholder="Hello, my name is Localize..."
          onChangeText={(intro) => this.updateIntro(intro)}
        />
        <View style={{marginTop: 10}}>
        </View>
        <FormLabel>Any Extra Sauce?</FormLabel>
        <FormLabel>Feel free to provide any other information here!</FormLabel>
        <FormInput
          id="statement"
          placeholder="Your blogs, past tours, profiles, etc"
          onChangeText={(statement) => this.updateStatement(statement)}
        />
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.fullWidthButton}
            onPress={this.navigateToNext}
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

export default connect(mapStateToProps)(BecomeAGuideQuestions4);