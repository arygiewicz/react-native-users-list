import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

describe('<App />', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('has 2 children', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});
