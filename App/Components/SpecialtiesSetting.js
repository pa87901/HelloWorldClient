import React from 'react';
import { connect } from 'react-redux';
import { becomeGuideSpecialties } from '../Actions/BecomeAGuideActions';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Button, FormLabel, FormInput, CheckBox } from 'react-native-elements';

class SpecialtiesSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sightseeing: false,
      museum: false,
      food: false,
      nightlife: false,
      sports: false,
      music: false,
      history: false,
      politics: false
    };

    this.setSightseeing = this.setSightseeing.bind(this);
    this.setMuseum = this.setMuseum.bind(this);
    this.setFood = this.setFood.bind(this);
    this.setNightlife = this.setNightlife.bind(this);
    this.setSports = this.setSports.bind(this);
    this.setMusic = this.setMusic.bind(this);
    this.setHistory = this.setHistory.bind(this);
    this.setPolitics = this.setPolitics.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setSightseeing() {
    this.setState({
      sightseeing: !this.state.sightseeing
    });
  }

  setMuseum() {
    this.setState({
      museum: !this.state.museum
    });
  }

  setFood() {
    this.setState({
      food: !this.state.food
    });
  }

  setNightlife() {
    this.setState({
      nightlife: !this.state.nightlife
    });
  }

  setSports() {
    this.setState({
      sports: !this.state.sports
    });
  }

  setMusic() {
    this.setState({
      music: !this.state.music
    });
  }

  setHistory() {
    this.setState({
      history: !this.state.history
    });
  }

  setPolitics() {
    this.setState({
      politics: !this.state.politics
    });
  }

  handleSubmit() {
    this.props.dispatch(becomeGuideSpecialties(this.state));
    this.props.navigation.goBack();
  }

  render() {
    console.log('PROPS', this.props);

    return (
      <View style={{marginTop: 10}}>
        <FormLabel>What are your specialties?</FormLabel>
        <View style={{marginTop: 10}}>
          <CheckBox
            title='Sightseeing'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.sightseeing}
            onPress={this.setSightseeing}
          />
          <CheckBox
            title='Museums'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.museum}
            onPress={this.setMuseum}
          />
          <CheckBox
            title='Food'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.food}
            onPress={this.setFood}
          />
          <CheckBox
            title='Nightlife'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.nightlife}
            onPress={this.setNightlife}
          />
          <CheckBox
            title='Sports'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.sports}
            onPress={this.setSports}
          />
          <CheckBox
            title='Music'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.music}
            onPress={this.setMusic}
          />
          <CheckBox
            title='History'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.history}
            onPress={this.setHistory}
          />
          <CheckBox
            title='Politics'
            checkedColor='#FF8C00'
            checkedIcon='check-square-o'
            uncheckedIcon='square-o'
            checked={this.state.politics}
            onPress={this.setPolitics}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Button
            small
            raised
            backgroundColor='#FF8C00'
            title='Submit'
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(SpecialtiesSetting);