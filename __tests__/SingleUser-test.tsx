import 'react-native';
import React from 'react';
import SingleUser from '../src/components/SingleUser';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<SingleUser />);
});
