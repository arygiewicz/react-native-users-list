import React, { Component } from 'react';
import { Text, SafeAreaView } from 'react-native';
import UsersList from './src/components/UsersList';
import { ScaledSheet } from 'react-native-size-matters';
import { colors } from './src/shared/styles';

interface Props {}
interface State {
  currentPage: number;
  itemsPerPage: number;
}

export default class App extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 5
    };
  }

  private handlePageChange = (currentPage: number): void => {
    this.setState({ currentPage });
  };

  render() {
    const { itemsPerPage, currentPage } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>
          You are currently on page <Text style={[styles.header, styles.bold]}>{currentPage}</Text>
        </Text>
        <UsersList itemsPerPage={itemsPerPage} onPageChange={this.handlePageChange} />
      </SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
  header: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '16@s',
    padding: '12@s',
    color: colors.secondaryColor
  },
  bold: {
    fontWeight: 'bold'
  }
});
