import React from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView } from 'react-native';
import {
  Card, Button, Icon, Grid, Row, Divider
} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

class BecomeAGuideQuestionsConfirmation extends React.Component {
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

    return (
      <ScrollView>
        <Card
          title='You have been posted!'
        >
        <Text style={{marginBottom: 10}}>
          Your profile has been posted on Localize! We will notify you when tourist(s) reach out to you via chat and/or request to have a tour with you.
        </Text>
        <Divider />
          <Text style={styles.subheader}>
            Name
          </Text>
          <Text>
            {this.props.userProfile.profile.name}
          </Text>
          <Text style={styles.subheader}>
            City
          </Text>
          <Text>
            {this.props.becomeAGuide.city}
          </Text>
          <Text style={styles.subheader}>
            Date & Time
          </Text>
          <Text>
            {this.props.becomeAGuide.date}
          </Text>
          <Text>
            {this.props.becomeAGuide.start} / {this.props.becomeAGuide.end}
          </Text>
          <Text style={styles.subheader}>
            Specialties
          </Text>
          {Object.keys(this.props.becomeAGuide.specialties).map((specialty, key) =>
            this.props.becomeAGuide.specialties[specialty] ? <Text>{specialty}</Text> : <Text style={{display: 'none'}} />
          )}
          <Text style={styles.subheader}>
            Hourly Rate
          </Text>
          <Text>
            USD  {this.props.becomeAGuide.hourlyRate}
          </Text>
          <Text style={styles.subheader}>
            Introduction
          </Text>
          <Text>
            {this.props.becomeAGuide.intro}
          </Text>
          <Text style={styles.subheader}>
            Other Info
          </Text>
          <Text style={{marginBottom: 10}}>
            {this.props.becomeAGuide.statement}
          </Text>
          <Button
            small
            raised
            backgroundColor='#FF8C00'
            title='Sounds Good! Take Me Back to Explore'
            fontSize={14}
            buttonStyle={{marginTop: 10}}
            onPress={this.navigateToExplore}
          />
        </Card>
      </ScrollView>
    );
  }
}
    
const styles = {
  subheader: {
    fontSize: 20,
    marginTop: 10
  },
};

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(BecomeAGuideQuestionsConfirmation);