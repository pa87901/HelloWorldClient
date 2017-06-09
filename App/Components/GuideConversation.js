import React from 'react';
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

class GuideConversation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.props.userId.avatar) {
      return (
        <TouchableHighlight onPress={() => navigate('GuideChat', {guideId: this.props.guideId, userId: this.props.userId.facebook_id})}>
          <View>
            <Image
              source={this.props.userId.avatar}
              style={styles.image}
              />
            <Text>
              {this.props.userId.full_name}
            </Text>
          </View>
        </TouchableHighlight>
      )
    } else {
      // Otherwise use default React logo image.
      return (
        <TouchableHighlight onPress={() => navigate('GuideChat', {guideId: this.props.guideId, userId: this.props.userId.facebook_id})}>
          <View>
            <Image
              source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
              style={styles.image}
              />
            <Text>
              Render something.
            </Text>
          </View>
        </TouchableHighlight>
      )
    }
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  }
});

const mapStateToProps = state => (state);

export default connect(mapStateToProps)(GuideConversation);