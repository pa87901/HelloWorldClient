import React from 'react';
import { Text, ScrollView, View, TouchableHighlight, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Divider } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Toolbar from 'react-native-toolbar';
import Utils from '../Utils';
import styles from './styles';


class BookingConfirmationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToExplore = this.navigateToExplore.bind(this);
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
    console.log('PROPS', this.props);

    const toolbarSetting = {
        toolbar1: {
          hover: false,
          title: {
            text: 'LOCALIZE',
            textStyle: styles.toolbarText
          }
      },
    };

    const hourlyRate = this.props.profileSelection.selectedProfile.availabilities[0].hourly_rate;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
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
              <Text style={styles.profileSubheader}>We contacted the Guide!</Text>
            </View>
            <View>
              <Text style={{ fontFamily: 'Arial', fontSize: 12 }}>Please wait up to 24 hours for the Guide to review and acknowledge your request. We will send you a confirmation message as soon as the guide accepts or declines your request.</Text>
            </View>
          </View>
          <View style={styles.termsConditions}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.profileSubheader}>Tour in {this.props.search.city.replace(/,.*/, '')}</Text>
              <Text style={styles.profileSubheader}>with {this.props.profileSelection.selectedProfile.user.full_name}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.bookingConfirmDates}>{Utils.time.displayDate(new Date(this.props.search.date).toDateString())}, {Utils.time.convert24ToAmPm(this.props.search.fromHour)} - {Utils.time.convert24ToAmPm(this.props.search.toHour)}</Text>
            </View>
            <View>
              <Text style={styles.profileSubheader}>{`$${hourlyRate * (this.props.search.toHour - this.props.search.fromHour)}`}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.fullWidthButton}
            onPress={this.navigateToExplore}
          >
            <Text style={styles.goToExplore}>Sounds Good! Take Me Back to Explore</Text>
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

export default connect(mapStateToProps)(BookingConfirmationScreen);
