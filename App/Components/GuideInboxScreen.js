import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class GuideInboxScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      chats: []
    }
  }

  componentWillMount() {
    console.log('this.props in GuideInboxScreen', this.props);
  }

  render() {
    return (
      <View>
        <Text>GuideInboxScreen rendering OK</Text>
      </View>
    )
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GuideInboxScreen);