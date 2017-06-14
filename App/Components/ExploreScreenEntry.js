import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Image, Button as NativeButton, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { getProfileResult } from '../Actions/profileSelectionActions';
import styles from './styles.js';
import Toolbar from 'react-native-toolbar';
import Stars from 'react-native-stars-rating';

var navToSearch;

class ExploreScreenEntry extends React.Component {
  componentDidMount(){
    navToSearch = this.props.navigation.navigate.bind(this)
  }
  handleProfileClick(searchIndex) {
    this.props.dispatch(getProfileResult(this.props.search.result[searchIndex]));
    this.props.navigation.navigate('GuideProfile');
  }

  render() {
    return (
      <View style={{flex:1}}>
      <Toolbar
        backgroundColor = '#FF8C00' 
        ref={(toolbar) => {this.toolbar = toolbar}} presets={toolbarSetting}/>

        <View style={styles.orangeBar} />
        <View style={styles.orangeTintContainer}>
          <View style={{borderWidth:10, borderColor:'white'}}>
            <Text style={styles.orangeText}>{this.props.search.city + '\n'} 
            {new Date(this.props.search.date).toDateString()} {this.props.search.fromHour} {this.props.search.toHour}</Text>
          </View>
          <View style={{flex:1}}>
            <ScrollView>
              <View>
                {this.props.search.result.map((guide, key) => {
                  if (guide.availabilities.length > 0) {
                    return (
                      <Card
                        key={key}
                        flexDirection='column'
                      >
                      <View style={{borderWidth:25, borderColor: 'white'}}>
                        <Text style={{fontSize:25, textAlign: 'center'}} >{guide.user.full_name}</Text>
                      </View>
                      <View style={{flex:1, flexDirection:'row'}}>
                        <Image 
                        style={{height:125, width:125, marginRight: 20, marginBottom: 20, borderColor: 'white' }}
                        source={{uri: guide.user.picture}}/>
                        <Text style={{marginBottom: 10}}>
                          {guide.intro}
                        </Text>
                        <View style={{flexGrow:1}}>
                        <Text style={{marginBottom: 10}}>
                          Rating
                        </Text>
                        <Stars
                          isActive={false}
                          rateMax={5}
                          isHalfStarEnabled={false}
                          rate={guide.user.avg_rating}
                          size={36}
                        />
                        <Text>
                          Specialties:
                        </Text>
                        <View style={{flex:1, flexDirection:'row'}}>
                          {guide.guideSpecialties.map((specialtyObj, key) =>
                            <Icon
                            name='search'
                            />
                          )}

                        </View>

                        </View>

                      </View>
                      <View style={{flex:1}}>
                        <TouchableOpacity
                          icon={{name: 'group'}}
                          backgroundColor='#FF8C00'
                          onPress={() => this.handleProfileClick(key)}
                          >
                          <Text>Get to know me!</Text>
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

var toolbarSetting = {
    toolbar1: {
      hover: false,
      leftButton: {
        icon: 'search',
        iconStyle: {color: 'white', fontSize: 30},
        iconFontFamily: 'FontAwesome',
        onPress: () => {navToSearch('Search')},
      },
      title:{
        text: 'LOCALIZE',
        textStyle: styles.headerText
      }
  },
}