import React from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import axios from '../axios';

class BecomeAGuideQuestionsPolicies extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToConfirmation = this.navigateToConfirmation.bind(this);
  }

  navigateToConfirmation() {
    let startTime;
    let startTimeOfDay = this.props.becomeAGuide.start.slice(-2);
    let endTime;
    let endTimeOfDay = this.props.becomeAGuide.end.slice(-2);

    if (startTimeOfDay === 'am' || startTimeOfDay === 'AM') {
      startTime = parseInt(this.props.becomeAGuide.start.replace(/am/, '').replace(/AM/, ''));
    } else if (startTimeOfDay === 'pm' || startTimeOfDay === 'PM') {
      startTime = parseInt(this.props.becomeAGuide.start.replace(/pm/, '').replace(/PM/, '')) + 12;
    }

    if (endTimeOfDay === 'am' || endTimeOfDay === 'AM') {
      endTime = parseInt(this.props.becomeAGuide.end.replace(/am/, '').replace(/AM/, ''));
    } else if (endTimeOfDay === 'pm' || endTimeOfDay === 'PM') {
      endTime = parseInt(this.props.becomeAGuide.end.replace(/pm/, '').replace(/PM/, '')) + 12;
    }    

    let options = {
      facebookId: this.props.userProfile.profile.userId,
      city: this.props.becomeAGuide.city,
      hourlyRate: this.props.becomeAGuide.hourlyRate,
      intro: this.props.becomeAGuide.intro,
      statement: this.props.becomeAGuide.statement,
      startHr: startTime,
      endHr: endTime,
      date: this.props.becomeAGuide.date,
    }

    axios.post('api/availabilities', options)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    })
    
    this.props.navigation.navigate('GuideQuestionsConfirmation');
  }

  render() {
    return (
      <ScrollView>
        <Card
          title='Terms & Conditions'
        >
          <Text style={{marginBottom: 10}}>
            HelloWorld enforces terms to protect both tourists and guides alike. Guide(s) or Tourist(s) may cancel and review any penalties by viewing their travel plans and then clicking ‘Cancel’ on the appropriate reservation.
          </Text>
          <Button
            small
            raised
            icon={{name: 'check-circle'}}
            backgroundColor='#FF8C00'
            title='Confirm and Post Myself!'
            buttonStyle={{marginTop: 10}}
            onPress={this.navigateToConfirmation}
          />
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(BecomeAGuideQuestionsPolicies);