import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import stripe from 'tipsi-stripe';
import testID from '../Utils/testID';
import { STRIPE_PUBLISHABLE_KEY } from '../Config/config';

// stripe.init({
//   publishableKey: STRIPE_PUBLISHABLE_KEY
// });


export default class CardFormScreen extends PureComponent {
  
  static title = 'Card Form';

  state = {
    loading: false,
    token: null
  };

  handleCardPayPress = async () => {
    try {
      this.setState({
        loading: true,
        token: null
      });
      const token = await stripe.paymentRequestWithCardForm({
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        managedAccountCurrency: 'usd',
      });

      console.log('RESULT', token);
      this.setState({
        loading: false,
        token,
      });
    } catch (error) {
      console.log('ERROR', error);
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { loading, token } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Card Form
        </Text>
        <Text style={styles.instruction}>
          Click
        </Text>
        <Button
          small
          raised
          backgroundColor='#FF8C00'
          title='Enter your card and pay'
          loading={loading}
          onPress={this.handleCardPayPress}
          {...testID('cardFormButton')}
        />
        <View
          style={styles.token}
          {...testID('cardFormToken')}
        >
          {token &&
            <Text style={styles.instruction}>
              Token: {token.tokenId}
            </Text>
          }
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
};
