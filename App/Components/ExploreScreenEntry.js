import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Button, Rating } from 'react-native-elements';

export default class ExploreScreenEntry extends React.Component {
  constructor(props) {
    super(props);

    //Test Data
    this.state = {
      guides: [{
        guide: 'Jon Snow',
        image: require('./JONSNOW.png'),
        msg: 'You know nothing, Jon Snow!'},
      {
        guide: 'Jon Snow',
        image: require('./JONSNOW.png'),
        msg: 'You know nothing, Jon Snow!'},
      {
        guide: 'Jon Snow',
        image: require('./JONSNOW.png'),
        msg: 'You know nothing, Jon Snow!'}]
    };

    this.seeGuideProfile = this.seeGuideProfile.bind(this);
  }

  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }

  seeGuideProfile() {
    this.props.navigation.navigate('GuideProfile');
  }

  render() {
    return (
      <ScrollView>
      {this.state.guides.map((guide, key) => {
        return (
          <Card
          key={key}
          flexDirection='column'
          title={guide.guide}
          image={guide.image}
          >
          <Rating
            type='star'
            imageSize={25}
            ratingCount={5}
            onFinishRating={this.ratingCompleted}
          />
          <Text style={{marginBottom: 10}}>
            {guide.msg}
          </Text>
          <Button
            small
            raised
            icon={{name: 'flight-takeoff'}}
            backgroundColor='#FF8C00'
            title='Book a trip with me!'
            onPress={() => this.props.navigation.navigate('GuideProfile')}
          />
        </Card>
        );
      })}
      </ScrollView> 
    );
  }
}
