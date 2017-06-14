import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Button as NativeButton, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { getProfileResult } from '../Actions/profileSelectionActions';
import styles from './styles.js';
import Toolbar from 'react-native-toolbar';

class ExploreScreenEntry extends React.Component {

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
          <ScrollView>
            <View>
              {this.props.search.result.map((guide, key) => {
                if (guide.availabilities.length > 0) {
                  return (
                    <Card
                    key={key}
                    flexDirection='column'
                    title={guide.user.full_name}
                    
                    >
                    <Text style={{marginBottom: 10}}>
                      {guide.intro}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                      Avg Rating: {guide.avg_rating} ({guide.rating_count}) 
                    </Text>
                    <Text>
                      Specialties:
                    </Text>
                    {guide.guideSpecialties.map((specialtyObj, key) =>
                      <Text key={key}>
                        {`${specialtyObj.specialty.specialty} `}
                      </Text>
                    )}
                    <Button
                      small
                      raised
                      icon={{name: 'group'}}
                      backgroundColor='#FF8C00'
                      onPress={() => this.handleProfileClick(key)}
                      title='Get to know me!' 
                    />
                  </Card>
                  );
                }
              })}
            </View>
          </ScrollView> 
        </View>
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => ({
    //headerLeft: <NativeButton title='Search' onPress={() => navigation.navigate('Search')}/>,
    title: 'Localize',
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
        onPress: () => {this.props.navigation.navigate('Search');},
      },
      title:{
        text: 'LOCALIZE',
        textStyle: styles.headerText
      }
  },
}