import Native from 'react-native';
import React from 'react';
import HelloWorld from '../App/index.js';
// import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
// import TestUtils from 'react-addons-test-utils';

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

  it('renders correctly', () => {
    const tree = renderer.create(
      <HelloWorld />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('is a stateful class component.', () => {
    expect(React.Component.isPrototypeOf(HelloWorld)).toBe(true);
  });

  test('one plus one equals two', () => {
    expect(1 + 1).toBe(2)
  });

  // test('contains a Provider to send global state down to downstream components.', () => {
  //   const parentAdmin = TestUtils.renderIntoDocument(<HelloWorld />);
  //   expect(wrapper.contains(<provider></provider>)).toEqual(true)
  // });
})