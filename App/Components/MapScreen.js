import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends React.Component {
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
      pointsOfInterest: [
        {
          latitude: 37.8199, 
          longitude: -122.4783
        }, 
        {
          latitude: 37.7786,
          longitude: -122.3893
        },
        {
          latitude: 37.7694,
          longitude: -122.4862
        }
      ]
    }
  }
//GG Bridge, GG Park, ATT Park??
  watchID: ?number = null

  componentDidMount () {
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
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.initialPosition}>
          <MapView.Marker
            coordinate={this.state.markerPosition}>
              <View style={styles.radius}>
                <View style={styles.marker}/>
              </View>
          </MapView.Marker>
          {this.state.pointsOfInterest.map(marker => {
            console.log('---marker---', marker)
            return (
              <MapView.Marker
                coordinate={marker}
                />
            )
          })}
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  }
});

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(MapScreen);