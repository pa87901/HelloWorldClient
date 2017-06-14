import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import Toolbar from 'react-native-toolbar';
import Stars from 'react-native-stars-rating';
import { getProfileResult } from '../Actions/profileSelectionActions';
import styles from './styles.js';
import Utils from '../Utils';

//var navToSearch;

class ExploreScreenEntry extends React.Component {
  // componentDidMount(){
  //   //navToSearch = this.props.navigation.navigate.bind(this)
  // }
  handleProfileClick(searchIndex) {
    this.props.dispatch(getProfileResult(this.props.search.result[searchIndex]));
    this.props.navigation.navigate('GuideProfile');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <Toolbar
        backgroundColor='#FF8C00' 
        ref={(toolbar) => { this.toolbar = toolbar; }} presets={toolbarSetting} />

        <View style={styles.orangeBar} />
        <View style={styles.orangeTintContainer}>
          <View style={{ borderWidth: 10, borderColor: 'white' }}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Search')}}>
              <Text style={styles.orangeText}>
                {this.props.search.city + '\n'} 
                {Utils.time.displayDate(new Date(this.props.search.date).toDateString())}, {Utils.time.convert24ToAmPm(this.props.search.fromHour)} - {Utils.time.convert24ToAmPm(this.props.search.toHour)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View>
                {this.props.search.result.map((guide, key) => {
                  if (guide.availabilities.length > 0) {
                    return (
                      <Card
                        key={key}
                        flexDirection='column'
                      >
                      <View style={styles.searchCardContainer}>
                        <Text style={styles.searchCardName} >{guide.user.full_name}</Text>
                      </View>
                      <View style={styles.flexRow}>
                        <Image 
                        style={styles.searchResultImage}
                        source={{ uri: guide.user.picture }} />
                        {/*<Text style={{ marginBottom: 10 }}>
                          {guide.intro}
                        </Text>*/}
                        <View style={{ flexGrow: 1 }}>
                        <Text style={styles.searchCardFont}>
                          Rating:
                        </Text>
                        <Stars
                          isActive={false}
                          isHalfStarEnabled={true}
                          rateMax={5}
                          isHalfStarEnabled={false}
                          rate={Math.ceil(guide.avg_rating)}
                          size={35}
                        />
                        <Text style={styles.searchCardFont}>
                          Specialties:
                        </Text>
                        <View style={styles.specialtiesContainer}>
                          {guide.guideSpecialties.map((specialtyObj, key) =>
                          {
                            return (
                              <View 
                                key={key}
                                style={{alignItems: 'stretch'}}>
                                  <Icon
                                  name='search'
                                  size={35}
                                  />
                              </View>
                            );
                          }
                          )}
                        </View>
                        </View>
                      </View>
                      <View style={styles.goButtonTO}>
                        <TouchableOpacity
                          backgroundColor='#FF8C00'
                          onPress={() => this.handleProfileClick(key)}
                        >
                          <View style={styles.goButtonTextView}>

                            <Text style={styles.goButtonText}>Get to know me!</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </Card>
                    );
                  }
                })}
              </View>
            </ScrollView> 
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

export default connect(mapStateToProps)(ExploreScreenEntry);

const toolbarSetting = {
    toolbar1: {
      hover: false,
      // leftButton: {
      //   icon: 'search',
      //   iconStyle: {color: 'white', fontSize: 30},
      //   iconFontFamily: 'FontAwesome',
      //   onPress: () => {navToSearch('Search')},
      // },
      title:{
        text: 'LOCALIZE',
        textStyle: styles.toolbarText
      }
  },
}