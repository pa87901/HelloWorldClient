import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Button, FormLabel, FormInput, Divider} from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import Swipeout from 'react-native-swipeout';
import { becomeGuidePointsOfInterest } from '../Actions/BecomeAGuideActions';
import config from '../Config/config';
import axios from '../axios';
import Toolbar from 'react-native-toolbar';
import styles from './styles';

class BecomeAGuideQuestions2p1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointsOfInterest: [],
      pointOfInterestPredictions: [],
      pointOfInterestDescription: ''
    };
    this.savePointsOfInterest = this.savePointsOfInterest.bind(this);
    this.updatePointOfInterest = this.updatePointOfInterest.bind(this);
    this.deletePointOfInterest = this.deletePointOfInterest.bind(this);
    this.addPointsOfInterest = this.addPointsOfInterest.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  }

  updatePointOfInterest(pointOfInterest) {
    // Update local state.
    pointOfInterest = pointOfInterest.query;
    this.setState({
      pointOfInterestDescription: pointOfInterest
    });
    if (pointOfInterest.length > 3) {
      const query = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${pointOfInterest}&key=${config.GOOGLE_PLACES_API_KEY}`;

      axios.get(query)
      .then(res => {
        const pointOfInterestPredictions = res.data.predictions;
        this.setState({
          pointOfInterestPredictions: pointOfInterestPredictions
        });
        console.log('pointOfInterestPredictions', this.state.pointOfInterestPredictions);
      })
      .catch(err => {
        console.error(err);
      });
    } else {
      this.setState({
        pointOfInterestPredictions: [],
      });

    }
    
  }

  deletePointOfInterest(pointOfDisinterest) {
    const newPOIs = this.state.pointsOfInterest.slice();
    newPOIs.splice(pointOfDisinterest, 1);
    this.setState({
      pointsOfInterest: newPOIs
    });
  }

  addPointsOfInterest(pointOfInterest) {
    let poi = this.state.pointsOfInterest;
    poi.push(pointOfInterest.main_text + '\n' + pointOfInterest.secondary_text)
    this.setState({
      pointsOfInterest: poi,
      pointOfInterestPredictions: [],
      pointOfInterestDescription: ''
    });
    console.log('pointsOfInterestDescription', pointOfInterest, this.state.pointOfInterestDescription);
  }

  savePointsOfInterest() {
    this.props.dispatch(becomeGuidePointsOfInterest(this.state.pointsOfInterest));
    this.props.navigation.navigate('GuideQuestions4');
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  render() {
    const filterPOIs = this.state.pointOfInterestPredictions.length > 0 ? this.state.pointOfInterestPredictions : [];

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
          <FormLabel>What events are you searching for?</FormLabel>
          <Autocomplete
            autoCapitalize="none"
            keyboardShouldPersistTaps='always'
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            data={filterPOIs}
            defaultValue={this.state.pointOfInterestDescription}
            onChangeText={text => this.updatePointOfInterest({ query: text })}
            placeholder="Enter Point Of Interest"
            renderItem={({ structured_formatting }) => {
              return (
              <TouchableOpacity
                onPress={() => (this.addPointsOfInterest(structured_formatting))}
              >
                <Text style={styles.itemText}>
                  {structured_formatting.main_text} {', '}
                  {structured_formatting.secondary_text}
                </Text>
              </TouchableOpacity>
            )}}
          />
          <View style={{ flex: 1, flexDirection: 'column', borderWidth: 10, borderColor: 'white' }}>
          {/*<View style={{borderWidth: 1, borderColor: 'grey'}}>*/}
          {this.state.pointsOfInterest.map((pointOfInterest, index) => {
            let swipeBtns = [{
              text: 'Delete',
              backgroundColor: 'red',
              underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
              onPress: () => { this.deletePointOfInterest(index) }
            }];
            return (
              <View style={{borderWidth: 1, borderColor: 'grey', margin: -0.5, padding: 4}}>
              <Swipeout
                right={swipeBtns}
                autoClose={true}
                backgroundColor='transparent'
                key={index}
              > 
                <View>
                  <Text style={{fontFamily: 'Arial', fontSize: 14, fontWeight: '900', textAlign: 'center'}}>
                    {pointOfInterest}
                  </Text>
                  <Divider style={styles.swipeOut} />
                </View>
              </Swipeout>
              </View>
            )
          })}
          </View>
          {/*</View>*/}
          {/*<Button
            onPress={() => this.addPointsOfInterest(this.state.pointOfInterestDescription)}
            title='Add'
            />
          <View style={{marginTop: 10}}>
            <Button
              small
              raised
              backgroundColor='#FF8C00'
              title='Next'
              onPress={this.savePointsOfInterest}
            />
          </View>*/}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.fullWidthButton}
              onPress={this.savePointsOfInterest}
            >
              <Text style={styles.goToExplore}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
    )    
  }
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
}

// const styles = StyleSheet.create({
//   // container: {
//   //   backgroundColor: '#F5FCFF',
//   //   flex: 1,
//   //   paddingTop: 25,
//   //   paddingLeft: 10,
//   //   paddingRight: 10,
//   //   paddingBottom: 25,
//   // },
//   autocompleteContainer: {
//     marginLeft: 10,
//     marginRight: 10,
//     height: 150
//   },
//   itemText: {
//     fontSize: 15,
//     margin: 2
//   },
//   descriptionContainer: {
//     // `backgroundColor` needs to be set otherwise the
//     // autocomplete input will disappear on text input.
//     backgroundColor: '#F5FCFF',
//     marginTop: 8
//   },
//   swipeOut: {
//     height: 20,
//     borderBottomColor: '#000',
//     borderBottomWidth: StyleSheet.hairlineWidth
//   }
// });

const mapStateToProps = state => state;
  
export default connect(mapStateToProps)(BecomeAGuideQuestions2p1);
