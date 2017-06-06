'use strict';
import Native from 'react-native';
import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from '../App/index';
// import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import store from '../App/store';
import Navigator from '../App/Components';
import { View } from 'react-native';

import LoginScreen from '../App/Components/LoginScreen';
jest.unmock('../App/Components/ExploreScreenEntry');
import ExploreScreenEntry from '../App/Components/ExploreScreenEntry';


// HELLOWORLD INDEX COMPONENT TESTS
describe('HelloWorld', () => {
  describe('<HelloWorld />', () => {
    global.document = {
      getElementById: function() {
        return {
          on: function() {}
      }}
    }
  })

  // let wrapper = shallow(<HelloWorld />);

  test('one plus one equals two', () => {
    expect(1 + 1).toBe(2)
  });

  it('renders correctly', () => {
    const tree = renderer.create(<HelloWorld />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('is a stateful class component.', () => {
    expect(React.Component.isPrototypeOf(HelloWorld)).toBe(true);
  });

  // it('should render a Provider Component', () => {
  //   const wrapper = renderer.create(<HelloWorld />).toJSON();
  //   console.log('WRAPPER', wrapper);
  //   const store = { a: 1 };
  //   expect(wrapper).toContain(<Provider store={store} />);
  // })
  // test('contains a Provider to send global state down to downstream components.', () => {
  //   const parentAdmin = TestUtils.renderIntoDocument(<HelloWorld />);
  //   expect(wrapper.contains(<provider></provider>)).toEqual(true)
  // });
});



// LOGINSCREEN TESTS
describe('LoginScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LoginScreen store={store} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render one View component', () => {
    const wrapper = renderer.create(<LoginScreen store={store} />).toJSON();
    // console.log('LoginScreen wrapper', wrapper);
    expect(wrapper.type).toEqual('View');
  })
});



// ExploreScreenEntry TESTS

describe('ExploreScreenEntry', () => {
  const tree = renderer.create(<ExploreScreenEntry store={store} />).toJSON();

  it('renders correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('simulates click events', () => {
    console.log('ExploreScreenEntry', tree);
    const doc = TestUtils.renderIntoDocument(<ExploreScreenEntry />);
    const docNode = ReactDOM.findDOMNode(doc);
    expect(docNode.find('button')).to.equal(true);
  })
})
