import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Button, FormLabel, FormInput, Divider} from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import { becomeGuidePointsOfInterest } from '../Actions/BecomeAGuideActions';
import config from '../Config/config';
import axios from '../axios';
import Swipeout from 'react-native-swipeout';

class BecomeAGuideQuestions2p1 extends React.Component {
  constructor(props){
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
  }

  updatePointOfInterest(pointOfInterest) {
    // Update local state.
    pointOfInterest = pointOfInterest.query
    this.setState({
      pointOfInterestDescription: pointOfInterest
    })
    if (pointOfInterest.length > 3) {
      let query = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${pointOfInterest}&key=${config.GOOGLE_PLACES_API_KEY}`;

      axios.get(query)
      .then(res => {
        // console.log(res);
        const pointOfInterestPredictions = res.data.predictions;
        this.setState({
          pointOfInterestPredictions: pointOfInterestPredictions
        });
        console.log('pointOfInterestPredictions', this.state.pointOfInterestPredictions);
      })
      .catch(err => {
        console.error(err);
      })
    } else {
      this.setState({
        pointOfInterestPredictions: [],
      });
      console.log('pointsOfInterestDescription', this.pointOfInterestDescription);
    }
  }

  deletePointOfInterest(pointOfDisinterest) {
    let newPOIs = this.state.pointsOfInterest.slice();
    newPOIs.splice(pointOfDisinterest, 1);
    this.setState({
      pointsOfInterest: newPOIs
    })
  }

  addPointsOfInterest(pointOfInterest) {
    let poi = this.state.pointsOfInterest;
    poi.push(pointOfInterest)
    this.setState({
      pointsOfInterest: poi
    });

    
  }

  savePointsOfInterest() {
    this.props.dispatch(becomeGuidePointsOfInterest(this.state.pointsOfInterest));
    this.props.navigation.navigate('GuideQuestions3');
  }

  render() {
    // console.log('--DREW--', this.props.becomeAGuide.pointsOfInterest);
    const filterPOIs = this.state.pointOfInterestPredictions.length > 0 ? this.state.pointOfInterestPredictions : [];

    return (
      <View style={{marginTop: 100}}>
        <Text>Random string</Text>
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
            renderItem={({ description }) => {
              return (
              <TouchableOpacity onPress={() => this.updatePointOfInterest({ query: description })}>
                <Text style={styles.itemText}>
                  {description}
                </Text>

              </TouchableOpacity>
            )}}
          />
        {/*{this.state.pointsOfInterest.map((pointOfInterest, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={(event) => this.deletePointOfInterest(index)}
            >
              <Text>- {pointOfInterest}</Text>
            </TouchableOpacity>
          )
        })}*/}

        {this.state.pointsOfInterest.map((pointOfInterest, index) => {
          let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.deletePointOfInterest(index) }
          }];
          return (
            <Swipeout
              right={swipeBtns}
              autoClose='true'
              backgroundColor='transparent'
              key={index}
            >
              <View>
                <View>
                  <Text>
                    {pointOfInterest}
                  </Text>
                  <Divider style={styles.swipeOut} />
                </View>
              </View>
            </Swipeout>
          )
        })}

        <Button
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
        </View>
      </View>
    )    
  }
}

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: '#F5FCFF',
  //   flex: 1,
  //   paddingTop: 25,
  //   paddingLeft: 10,
  //   paddingRight: 10,
  //   paddingBottom: 25,
  // },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
    height: 150
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  swipeOut: {
    height: 20,
    borderBottomColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

const mapStateToProps = state => state;
  
export default connect(mapStateToProps)(BecomeAGuideQuestions2p1);