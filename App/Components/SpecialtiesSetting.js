import React from 'react';
import { connect } from 'react-redux';
import { setSightseeing, setMuseum, setFood, setNightlife, setSports, setMusic, setHistory, setPolitics } from '../Actions/specialtyActions';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Button, FormLabel } from 'react-native-elements';
import axios from '../axios';
import styles from './styles.js'
import Toolbar from 'react-native-toolbar';

class SpecialtiesSetting extends React.Component {
  constructor(props) {
    super(props);
    this.setSightseeing = this.setSightseeing.bind(this);
    this.setMuseum = this.setMuseum.bind(this);
    this.setFood = this.setFood.bind(this);
    this.setNightlife = this.setNightlife.bind(this);
    this.setSports = this.setSports.bind(this);
    this.setMusic = this.setMusic.bind(this);
    this.setHistory = this.setHistory.bind(this);
    this.setPolitics = this.setPolitics.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSpecialty = this.setSpecialty.bind(this);
  }
  setSpecialty(spec) {
    const setSpec = 'set' + spec.charAt(0).toUpperCase() + spec.slice(1);
    this[setSpec]();
  }

  setSightseeing() {
    this.props.dispatch(setSightseeing(!this.props.specialty.sightseeing));
  }

  setMuseum() {
    this.props.dispatch(setMuseum(!this.props.specialty.museum));
  }

  setFood() {
    this.props.dispatch(setFood(!this.props.specialty.food));
  }

  setNightlife() {
    this.props.dispatch(setNightlife(!this.props.specialty.nightlife));
  }

  setSports() {
    this.props.dispatch(setSports(!this.props.specialty.sports));
  }

  setMusic() {
    this.props.dispatch(setMusic(!this.props.specialty.music));
  }

  setHistory() {
    this.props.dispatch(setHistory(!this.props.specialty.history));
  }

  setPolitics() {
    this.props.dispatch(setPolitics(!this.props.specialty.politics));
  }

  handleSubmit() {
    
    Object.keys(this.props.specialty).forEach(key => {
      let options = {
        facebookId: this.props.userProfile.profile.userId,
        specialty: key
      }

      if (this.props.specialty[key]) {
        axios.post('api/specialties', options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        axios.delete(`api/specialties/delete/${options.facebookId.slice(9)}/${options.specialty}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    })

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
          onPress: this.props.navigation.goBack,
        },
        title: {
          text: 'Profile',
          textStyle: styles.toolbarText
        }
      },
    };

    return (
      <View style={{flex:1}}>
        <View style={styles.whiteBackground}>
          <Toolbar
            backgroundColor='#FF8C00'
            toolbarHeight={35}
            ref={(toolbar) => { this.toolbar = toolbar; }}
            presets={toolbarSetting}
          />
        <View style={styles.orangeBar}/>
        <Text style={styles.specialtySubheader}>Highlight your specialties!</Text>
          <View style={styles.flexSwitchContainer}>
            {Object.keys(this.props.specialty).map((spec, index) => {
              return (            
                <TouchableOpacity
                  key={index}
                  style={this.props.specialty[spec] ? styles.checkbox : styles.checkboxInactive}
                  onPress={() => this.setSpecialty(spec)} 
                >
                  <View >
                    <Text style={this.props.specialty[spec] ? styles.checkboxText : styles.checkboxTextInactive}>{spec}</Text>             
                  </View>
                </TouchableOpacity>
            );
            })}
          </View>
          <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={styles.fullWidthButton}
                onPress={() => this.handleSubmit()}
              >
                <Text style={styles.fullWidthButtonText}>Submit</Text>
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

export default connect(mapStateToProps)(SpecialtiesSetting);
