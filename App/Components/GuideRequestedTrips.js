import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, Button, Divider } from 'react-native-elements';

export default class GuideRequestedOptions extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <Card title="Trip Requests">
          <Card 
            title="Trip 1"
          >
            <Button
              extraSmall
              raised
              title='Accept'
              backgroundColor='#228b22'
            >
            </Button>
            <Divider/> 
            <Button
              extraSmall
              raised
              title='Decline'
              backgroundColor='#b22222'
            >   
            </Button> 
          </Card>
          <Card title="Trip 2">
            <Text>Hey</Text>
          </Card>
          <Card title="Trip 3">
            <Text>Hey</Text>
          </Card>
          <Card title="Trip 4">
            <Text>Hey</Text>
          </Card>
        </Card>
      </ScrollView>
    );
  }
}