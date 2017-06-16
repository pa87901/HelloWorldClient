import React, { Component } from 'react';
import { Card, Text, ScrollView, StyleSheet, View, Dimensions, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button, Divider, FormLabel, FormInput} from 'react-native-elements';
import { connect } from 'react-redux';
import SwipeOut from 'react-native-swipeout';
import axios from '../axios';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import config from '../Config/config';
import Autocomplete from 'react-native-autocomplete-input';
import Toolbar from 'react-native-toolbar';
import styles from './styles.js';

Geocoder.setApiKey(config.GOOGLE_MAPS_API_KEY)

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

class GuideItineraryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      pointsOfInterestNames: [],
      pointsOfInterest: [],
      modalVisible: false,
      pointOfInterestPredictions: [],
      pointOfInterestDescription: '',
      autocompleteModalVisible: false
    }

    this.deleteEvent = this.deleteEvent.bind(this);
    this.initialisePosition = this.initialisePosition.bind(this);
    this.fitAllMarkers = this.fitAllMarkers.bind(this);
    this.getCoordsFromLocation = this.getCoordsFromLocation.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.updatePointOfInterest = this.updatePointOfInterest.bind(this); //working
    this.addPointsOfInterest = this.addPointsOfInterest.bind(this); //working
    this.setAutocompleteModalVisible = this.setAutocompleteModalVisible.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  
  }

  static navigationOptions = ({ navigation }) => ({
      header: null
  })

  watchID: ?number = null

  componentDidMount() {
    axios.get(`/api/events/booking/${this.props.navigation.state.params.bookingId}`)
    .then(pointsOfInterest => {
      // Get names of events
      let pointsOfInterestNames = pointsOfInterest.data.map(pointOfInterest => {
        return pointOfInterest.event_name
      });
      // Get coordinates of events
      let pointsOfInterestCoordinates = pointsOfInterest.data.map(pointOfInterest => {
        console.log('pointOfInterest', Number(pointOfInterest.latitude), Number(pointOfInterest.longitude));
        return {
          // coordinates: {
            latitude: Number(pointOfInterest.longitude),
            longitude: Number(pointOfInterest.latitude),
          // },
          // eventName: pointOfInterest.event_name
        }
      });
      this.setState({
        pointsOfInterestNames: pointsOfInterestNames,
        pointsOfInterest: pointsOfInterestCoordinates,
      });
      this.initialisePosition();
    })
    .catch(error => {
      console.error('error', error)
    })
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  initialisePosition() {
    navigator.geolocation.getCurrentPosition((position) =>{
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      let initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({initialPosition: initialRegion});
      this.setState({markerPosition: initialRegion});
    }, 
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

    this.watchID = navigator.geolocation.watchPosition((position) => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat (position.coords.longitude);

      let lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({initialPosition: lastRegion});
      this.setState({markerPosition: lastRegion});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  fitAllMarkers() {
    this.map.fitToCoordinates(this.state.pointsOfInterest, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  getCoordsFromLocation() {
    let poiList = [];
    
    this.state.pointsOfInterestNames.forEach(point => {
      Geocoder.getFromLocation(point).then(
        json => {
          let poiLocation = {
            latitude: json.results[0].geometry.location.lat,
            longitude: json.results[0].geometry.location.lng
          };
          
          poiList.push(poiLocation);
          this.setState({
            pointsOfInterest: poiList
          });
        },
        error => {
          alert(error);
        }
      );      
    });
  }



  deleteEvent(index) {
    let newPointsOfInterestNames = this.state.pointsOfInterestNames.slice();
    newPointsOfInterestNames.splice(index, 1);
    this.setState({
      pointsOfInterestNames: newPointsOfInterestNames
    });
    // Axios put method to update booking in database.
    let nameOfPOIToDelete = this.state.pointsOfInterestNames[index];
    axios.delete(`/api/events/remove/${this.props.navigation.state.params.bookingId}/${nameOfPOIToDelete}`)
    .then(response => {
      console.log('deleted event ', nameOfPOIToDelete,' for booking ', this.props.navigation.state.params.bookingId)
    })
    .catch(error => {
      console.error('Error deleting event ', nameOfPOIToDelete, ' for booking ', this.props.navigation.state.params.bookingId)
    })

  }

  setModalVisible(boolean) {
    this.setState({
      modalVisible: boolean
    })
    this.getCoordsFromLocation();
  }

  setAutocompleteModalVisible(boolean) {
    this.setState({
      autocompleteModalVisible: boolean
    })
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

  addPointsOfInterest(pointOfInterest) {
    console.log('pointOfInterest', pointOfInterest.main_text + '\n' + pointOfInterest.secondary_text);
    let poi = this.state.pointsOfInterestNames;
    poi.push(pointOfInterest.main_text + '\n' + pointOfInterest.secondary_text);
    this.setState({
      pointsOfInterestNames: poi,
      pointOfInterestPredictions: [],
      pointOfInterestDescription: ''
    });
    // Axios post method to include event for booking.
    let options = {
        bookingId: this.props.navigation.state.params.bookingId,
        eventName: pointOfInterest.main_text + '\n' + pointOfInterest.secondary_text
      };
    axios.post('/api/events/add', options)
    .then(response => {
      console.log('Saved point of interest successfully.');
    })
    .catch(err => {
      console.error('Error adding event.');
    });
    // if(pointOfInterest.length > 0) {
    //   let poi = this.state.pointsOfInterestNames;
    //   poi.push(pointOfInterest)
    //   this.setState({
    //     pointsOfInterestNames: poi
    //   });
    //   console.log('this.state.pointsOfInterestNames', this.state.pointsOfInterestNames);
    //   // Axios post method to include event for booking.
    //   let options = {
    //     bookingId: this.props.navigation.state.params.bookingId,
    //     eventName: pointOfInterest
    //   }
    //   axios.post('/api/events/add', options)
    //   .then(response => {
    //     console.log('Saved point of interest successfully.');
    //   })
    //   .catch(err => {
    //     console.error('Error adding event.');
    //   });
    // } else {
    //   alert('Please add a point of interest!');
    // }
  }


  render() {
    // console.log('this.props ITINERARY SCREEN', this.props.navigation.state.params);
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
            text: 'Itinerary',
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
        <View style={styles.orangeBar}/>
        <View style={styles.orangeTintProfileContainer}>
        <View style={{marginTop: 22}} />
          <Autocomplete
            autoCapitalize="none"
            keyboardShouldPersistTaps='always'
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            data={filterPOIs}
            defaultValue={this.state.pointOfInterestDescription}
            onChangeText={text => this.updatePointOfInterest({ query: text })}
            placeholder="Add Point Of Interest"
            renderItem={({ structured_formatting }) => {
              return (
                <TouchableOpacity
                  onPress={() => this.addPointsOfInterest(structured_formatting)}
                >
                <Text style={styles.itemText}>
                  {structured_formatting.main_text} {', '}
                  {structured_formatting.secondary_text}
                </Text>
              </TouchableOpacity>
              )}}
            />
        <View style={{ flex: 1, flexDirection: 'column', borderWidth: 10, borderColor: 'white' }}>
          {this.state.pointsOfInterestNames.map((event, index) => {
            let swipeButtons = [{
              text: 'Delete',
              backgroundColor: 'red',
              underlayColor: 'rgba(0, 0, 0, 1.6)',
              onPress: () => this.deleteEvent(index)
            }];
            return (
              <View style={{borderWidth: 1, borderColor: 'grey', margin: -0.5, padding: 4}}>
              <SwipeOut
                right={swipeButtons}
                autoClose={true}
                backgroundColor='transparent'
                key={index}
              >
                <View>
                  <View>
                    <Text style={{fontFamily: 'Arial', fontSize: 14, fontWeight: '900', textAlign: 'center'}}>{event}</Text>
                    <Divider style={styles.swipeOut} />
                  </View>
                </View>
              </SwipeOut>
              </View>
            )
          })}
        </View>

          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
          >
            <MapView
              ref={ref => { this.map = ref; }}
              style={styles.map}
              region={this.state.initialPosition}>
              <MapView.Marker
                coordinate={this.state.markerPosition}>
                  <View style={styles.radius}>
                    <View style={styles.marker}/>
                  </View>
              </MapView.Marker>
                {this.state.pointsOfInterest.map((point, index) => {
                  // console.log('---point---', point.coordinates)
                  return (
                    <MapView.Marker
                      key={index}
                      ref={ref=> {this.marker = ref}}
                      coordinate={point}
                      title={this.state.pointsOfInterestNames[index]}
                      />
                  );
                })}
            </MapView>
            <View style={styles.doubleButtonContainer}>
              <TouchableOpacity
                style={styles.affirmativeButton}
                onPress={()=>this.setModalVisible(!this.state.modalVisible)}
              >
                <Text style={styles.mapDoubleButtonText}>  View Itinerary  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.negativeButton}
                onPress={()=>this.fitAllMarkers()}
              >
                <Text style={styles.mapDoubleButtonText}>Points of Interest</Text>
              </TouchableOpacity>
            </View>
          </Modal>
            </View>
          <View style={styles.doubleButtonContainer}>
              <TouchableOpacity
                style={styles.affirmativeButton}
                onPress={()=>this.setModalVisible(!this.state.modalVisible)}
              >
                <Text style={styles.mapDoubleButtonText}>Map</Text>
              </TouchableOpacity>
              {/*<TouchableOpacity
                style={styles.negativeButton}
               onPress={() => this.addPointsOfInterest(this.state.pointOfInterestDescription)}
              >
                <Text style={styles.mapDoubleButtonText}>Add</Text>
              </TouchableOpacity>*/}
            </View>
        </View>
    )
  }
}

// const styles = StyleSheet.create({
//   header: {
//     alignItems: 'center'
//   },
//   title: {
//     fontSize: 15
//   },
//   list: {
//     height: 475
//   },
//   swipeOut: {
//     height: 20,
//     borderBottomColor: '#000',
//     borderBottomWidth: StyleSheet.hairlineWidth
//   },
//   radius: {
//     height: 40,
//     width: 40,
//     borderRadius: 40/2,
//     overflow: 'hidden',
//     backgroundColor: 'rgba(0, 122, 255, 0.1)',
//     borderWidth: 1,
//     borderColor: 'rgba(0, 122, 255, 0.3)',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   marker: {
//     height: 15,
//     width: 15,
//     borderWidth: 1,
//     borderColor: 'white',
//     borderRadius: 15/2,
//     overflow: 'hidden',
//     backgroundColor: 'rgba(0, 122, 255, 0.3)'
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   map: {
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     position: 'absolute' 
//   },
//   button: {
//     position: 'absolute',
//     right: 0,
//     left: 0,
//     bottom: 0
//   }
// });

const mapStateToProps = state => state;

export default connect(mapStateToProps)(GuideItineraryScreen);