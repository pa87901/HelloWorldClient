import React from 'react';
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import axios from '../axios';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherChatterName: null
    }
  }

  componentDidMount() {
    // Get guide name from guideId.
    axios.get(`/api/users/byUserId/${this.props.guideId.user_id}`)
    .then(response => {
      this.setState({
        otherChatterName: response.data.full_name
      })
      console.log('CONVERSATION RESPONSE', this.state.otherChatterName);
    })
  }

  render() {
    console.log('this.state in Conversation', this.state);
    const { navigate } = this.props.navigation;
    // Where this has been rendered from the UserInboxScreen...
    if (this.props.guideId) {
      // Render card with image if it exists on the guide's profile.
      if (this.props.guideId.img_url) {
        return (
          <TouchableHighlight onPress={() => navigate('Chat', {guideId: this.props.guideId})}>
            <View>
              <Image
                source={this.props.guideId.img_url}
                style={styles.image}
                />
              <Text>
                {this.state.otherChatterName}
              </Text>
            </View>
          </TouchableHighlight>
        )
      } else {
        // Otherwise use default React logo image.
        return (
          <TouchableHighlight onPress={() => navigate('Chat', {guideId: this.props.guideId})}>
            <View>
              <Image
                source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                style={styles.image}
                />
              <Text>
                {this.state.otherChatterName}
              </Text>
            </View>
          </TouchableHighlight>
        )
      }
    }
    // Where this has been rendered from the GuideInboxScreen...
    // else if (this.props.userId) {
    //   if (this.props.userId.avatar) {
    //     return (
    //       <TouchableHighlight onPress={() => navigate('GuideChat', {guideId: this.props.guideId, userId: this.props.userId.facebook_id})}>
    //         <View>
    //           <Image
    //             source={this.props.userId.avatar}
    //             style={styles.image}
    //             />
    //           <Text>
    //             {this.props.userId.full_name}
    //           </Text>
    //         </View>
    //       </TouchableHighlight>
    //     )
    //   } else {
    //     // Otherwise use default React logo image.
    //     return (
    //       <TouchableHighlight onPress={() => navigate('GuideChat', {guideId: this.props.guideId, userId: this.props.userId.facebook_id})}>
    //         <View>
    //           <Image
    //             source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
    //             style={styles.image}
    //             />
    //           <Text>
    //             Render something.
    //           </Text>
    //         </View>
    //       </TouchableHighlight>
    //     )
    //   }
    // }
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  }
});

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Conversation);