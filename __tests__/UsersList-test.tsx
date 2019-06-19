import 'react-native';
import React from 'react';
import UsersList from '../src/components/UsersList';
import renderer from 'react-test-renderer';

describe('<UsersList />', () => {
  it('renders correctly', () => {
    renderer.create(<UsersList itemsPerPage={3} onPageChange={jest.fn()} />);
  });
});
