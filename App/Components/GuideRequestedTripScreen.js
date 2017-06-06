import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';

class GuideRequestedTripScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <Text>
          This is GuideRequestedTripScreen
        </Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideRequestedTripScreen);