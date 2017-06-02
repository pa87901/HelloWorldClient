import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Button, Rating } from 'react-native-elements';
import { getProfileResult } from '../Actions/profileSelectionActions';

class ExploreScreenEntry extends React.Component {
  constructor(props) {
    super(props);

    //Test Data
    this.state = {
      guides: [{
        guideId: 'Jon Snow',
        image: require('./JONSNOW.png'),
        msg: 'You know nothing, Jon Snow!'},
      {
        guideId: 'Jon Snow',
        image: require('./JONSNOW.png'),
        msg: 'You know nothing, Jon Snow!'},
      {
        guideId: 'Jon Snow',
        image: require('./JONSNOW.png'),
        msg: 'You know nothing, Jon Snow!'}]
    };
  }

  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }

  handleProfileClick(guideId) {
    // axios call using guideId to retrieve guide profile needed

    const testData = {
  "id": 1,
  "user_id": 1,
  "city": "SF",
  "hourly_rate": "45.00",
  "intro": "Hello, my name is Charles",
  "statement": "I like food",
  "avg_rating": "0.00",
  "img_url": null,
  "created_at": "2017-05-30T23:09:54.534Z",
  "updated_at": "2017-05-30T23:09:54.534Z"
};

    this.props.dispatch(getProfileResult(testData));

    this.props.navigation.navigate('GuideProfile');
  }

  render() {
    console.log('PROPS', this.props);


    return (
      <ScrollView>
      {this.props.search.result.map((guide, key) => {
        return (
          <Card
          key={key}
          flexDirection='column'
          title={guide.user.facebook_id}
          image={guide.img_url || require('./JONSNOW.png')}
          >
          <Text style={{marginBottom: 10}}>
            {guide.intro}
          </Text>
          <Text style={{marginBottom: 10}}>
            Avg Rating: {guide.avg_rating}
          </Text>
          <Text>
            Specialties:
          </Text>
          {guide.guideSpecialties.map((specialtyObj) =>
            <Text>
              {`${specialtyObj.specialty.specialty} `}
            </Text>
          )}
          <Button
            small
            raised
            icon={{name: 'group'}}
            backgroundColor='#FF8C00'
            onPress={() => this.handleProfileClick(guide.guideId)}
            title='Get to know me!' 
          />
        </Card>
        );
      })}
      </ScrollView> 
    );
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(ExploreScreenEntry);