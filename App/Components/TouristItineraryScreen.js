import React, { Component } from 'react';
import { Card, Text, ScrollView, StyleSheet, View, Dimensions, Modal, TouchableHighlight } from 'react-native';
import { Button, Divider, FormLabel, FormInput} from 'react-native-elements';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import config from '../Config/config';
import Autocomplete from 'react-native-autocomplete-input';
import axios from '../axios';

Geocoder.setApiKey(config.GOOGLE_MAPS_API_KEY)

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

class TouristItineraryScreen extends Component {
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

    this.initialisePosition = this.initialisePosition.bind(this);
    this.fitAllMarkers = this.fitAllMarkers.bind(this);
    this.getCoordsFromLocation = this.getCoordsFromLocation.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.updatePointOfInterest = this.updatePointOfInterest.bind(this); //working
    this.addPointsOfInterest = this.addPointsOfInterest.bind(this); //working
    this.setAutocompleteModalVisible = this.setAutocompleteModalVisible.bind(this);

  }

  watchID: ?number = null

  componentDidMount() {
    axios.get(`/api/events/booking/${this.props.navigation.state.params.bookingId}`)
    .then(pointsOfInterest => {
      let pointsOfInterestNames = pointsOfInterest.data.map(pointOfInterest => {
        return pointOfInterest.event_name
      });
      let pointsOfInterestCoordinates = pointsOfInterest.data.map(pointOfInterest => {
        return {
          longitude: Number(pointOfInterest.latitude),
          latitude: Number(pointOfInterest.longitude),
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

  setModalVisible(boolean) {
    this.setState({
      modalVisible: boolean
    });
    this.getCoordsFromLocation();
  }

  setAutocompleteModalVisible(boolean) {
    this.setState({
      autocompleteModalVisible: boolean
    });
  }

  updatePointOfInterest(pointOfInterest) {
    // Update local state.
    pointOfInterest = pointOfInterest.query
    this.setState({
      pointOfInterestDescription: pointOfInterest
    });
    if (pointOfInterest.length > 3) {
      let query = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${pointOfInterest}&key=${config.GOOGLE_PLACES_API_KEY}`;

      axios.get(query)
      .then(res => {
        const pointOfInterestPredictions = res.data.predictions;
        this.setState({
          pointOfInterestPredictions: pointOfInterestPredictions
        });
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

  addPointsOfInterest(pointOfInterest) {
    let poi = this.state.pointsOfInterestNames;
    poi.push(pointOfInterest)
    this.setState({
      pointsOfInterestNames: poi
    });
  }


  render() {
    const filterPOIs = this.state.pointOfInterestPredictions.length > 0 ? this.state.pointOfInterestPredictions : [];
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Itinerary</Text>
        </View>

        <View style={styles.list}>
          <Divider style={styles.swipeOut} />
          {this.state.pointsOfInterestNames.map((event, index) => {
            return (
            <View
              key={index}
            >
              <Text>{event}</Text>
              <Divider
                style={styles.swipeOut}
              />
            </View>
            )
          })}
        </View>

        <View style={{marginTop: 22}}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.autocompleteModalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
          >
            <FormLabel>Event to add</FormLabel>
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
                <TouchableHighlight
                  onPress={() => this.updatePointOfInterest({ query: description })}
                >
                  <Text style={styles.itemText}>
                    {description}
                  </Text>
                </TouchableHighlight>
              )}}
            />
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 70}}>
              <Button
                small
                raised
                backgroundColor='#4B0082'
                title='Add'
                onPress={() => this.addPointsOfInterest(this.state.pointOfInterestDescription)}
              />
            </View>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 10}}>
              <Button
                small
                raised
                backgroundColor='#32CD32'
                title='Back to Itinerary'
                onPress={() => this.setAutocompleteModalVisible(!this.state.autocompleteModalVisible)}
              />
            </View>
          </Modal>
        </View>



        <View style={styles.container}>
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
                  // console.log('---point---', point)
                  return (
                    <MapView.Marker
                      ref={ref=> {this.marker = ref}}
                      coordinate={point}
                      title={this.state.pointsOfInterestNames[index]}
                      />
                  );
                })}
            </MapView>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
              <Button
                small
                raised
                backgroundColor='#FF8C00'
                title='Points of Interest'
                onPress={()=>this.fitAllMarkers()}
                // onPress={()=>this.getCoordsFromLocation()}
              />
              <Button
                small
                raised
                backgroundColor='#32CD32'
                title='Back to Itinerary'
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              />
            </View>
          </Modal>
          <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
            <Button
              large
              raised
              backgroundColor='#FF8C00'
              title='Map'
              onPress={() => this.setModalVisible(true)}
            />
          </View>
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center'
  },
  title: {
    fontSize: 15
  },
  list: {
    height: 475
  },
  swipeOut: {
    height: 20,
    borderBottomColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  radius: {
    height: 40,
    width: 40,
    borderRadius: 40/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.3)'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute' 
  },
  button: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0
  }
});

const mapStateToProps = state => state;

export default connect(mapStateToProps)(TouristItineraryScreen);