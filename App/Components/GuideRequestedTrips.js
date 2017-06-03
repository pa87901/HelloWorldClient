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
            title="San Francisco on 08/31/17"
          >
            <Button
              extraSmall
              raised
              title='Accept'
              backgroundColor='#228b22'
            >
            </Button>
            <Divider style={{width: 0 }}/> 
            <Button
              extraSmall
              raised
              title='Decline'
              backgroundColor='#b22222'
            >   
            </Button> 
          </Card>
          <Card 
            title="Berkeley on 07/23/17"
          >
            <Button
              extraSmall
              raised
              title='Accept'
              backgroundColor='#228b22'
            >
            </Button>
            <Divider style={{width: 0 }}/> 
            <Button
              extraSmall
              raised
              title='Decline'
              backgroundColor='#b22222'
            >   
            </Button> 
          </Card>
          <Card 
            title="London on 06/13/17"
          > 
            <Button
              extraSmall
              raised
              title='Accept'
              backgroundColor='#228b22'
            >
            </Button>
            <Divider style={{width: 0 }}/> 
            <Button
              extraSmall
              raised
              title='Decline'
              backgroundColor='#b22222'
            >   
            </Button> 
          </Card>
          <Card 
            title="Seoul on 12/25/17"
          >
            <Button
              extraSmall
              raised
              title='Accept'
              backgroundColor='#228b22'
            >
            </Button>
            <Divider style={{width: 0 }}/> 
            <Button
              extraSmall
              raised
              title='Decline'
              backgroundColor='#b22222'
            >   
            </Button> 
          </Card>
        </Card>
      </ScrollView>
    );
  }
}