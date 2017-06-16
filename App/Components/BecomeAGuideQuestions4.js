import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableHighlight, TextInput } from 'react-native';
import Toolbar from 'react-native-toolbar';
import styles from './styles.js';
import { becomeGuideIntro, becomeGuideStatement } from '../Actions/BecomeAGuideActions';

class BecomeAGuideQuestions4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: '',
      statement: ''
    };
    this.navigateToNext = this.navigateToNext.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.updateIntro = this.updateIntro.bind(this);
    this.updateStatement = this.updateStatement.bind(this);
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  updateIntro(intro) {
    this.props.dispatch(becomeGuideIntro(intro));
    this.setState({
      intro: intro
    });
    console.log('INTRO', intro);
    console.log(this.state.intro)
  } 

  updateStatement(statement) {
    this.props.dispatch(becomeGuideStatement(statement));
    this.setState({
      statement: statement
    });
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
        <View>
          <Text style={styles.specialtySubheader}>Introduce Yourself</Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          <Text style={styles.becomeAGuideSubtitle}>Provide a brief introduction to our tourists!</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ height: 50, fontFamily: 'Arial', fontSize: 14, textAlign: 'justify' }}
            multiline={true}
            value={this.state.intro}
            onChangeText={(intro) => this.updateIntro(intro)}
            placeholder={'\n Hello, my name is Localize...'}
            placeholderTextColor='grey'
          />
        </View>
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          <Text style={styles.becomeAGuideSubtitle}>Any extra sauce?</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ height: 50, fontFamily: 'Arial', fontSize: 14, textAlign: 'justify' }}
            multiline={true}
            value={this.state.statement}
            onChangeText={(statement) => this.updateStatement(statement)}
            placeholder={'\n Your blogs, past tours, profiles, etc.'}
            placeholderTextColor='grey'
          />
        </View>
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
