import React, { Component } from 'react';
import { View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { config } from '../shared/config';
import { colors } from '../shared/styles';
import SingleUser from './SingleUser';
import { ScaledSheet } from 'react-native-size-matters';
import { UserProps } from '../shared/interfaces';

interface Props {
  itemsPerPage: number;
  onPageChange: (data: number) => void;
}
interface State {
  users: UserProps[];
  page: number;
  loading: boolean;
  error: any;
  total_pages: number;
}

export default class UsersList extends Component<Props> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      users: [],
      page: 1,
      loading: false,
      error: null,
      total_pages: 0
    };
  }

  private fetchUsers = (): void => {
    this.setState({ loading: true });
    axios
      .get(`${config.apiUrl}?per_page=${this.props.itemsPerPage}&page=${this.state.page}`)
      .then(response => {
        setTimeout(() => {
          this.setState((state: State) => ({
            users: this.state.page === 1 ? response.data.data : [...state.users, ...response.data.data],
            total_pages: response.data.total_pages,
            loading: false
          }));
        }, 1000);
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  private handleListEnd = (): void => {
    if (this.state.page < this.state.total_pages) {
      this.setState(
        (state: State) => ({ page: state.page + 1 }),
        () => {
          this.fetchUsers();
        }
      );
    }
  };

  private handleViewableItemsChanged = (data: any): void => {
    const { viewableItems } = data;
    const viewableItem = viewableItems[0].index;
    const pageNumber = Math.ceil((viewableItem + 1) / this.props.itemsPerPage);
    this.props.onPageChange(pageNumber);
  };

  private renderFooter = (): JSX.Element => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator color={colors.secondaryColor} />
      </View>
    );
  };

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <FlatList
            data={this.state.users}
            renderItem={({ item, index }: any) => <SingleUser {...this.state.users[index]} />}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => this.handleListEnd()}
            onEndReachedThreshold={0}
            initialNumToRender={this.props.itemsPerPage}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={() => (this.state.loading ? this.renderFooter() : null)}
            onViewableItemsChanged={this.handleViewableItemsChanged}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  separator: {
    borderBottomColor: colors.listItemBorderColor,
    borderBottomWidth: '1@s'
  },
  footer: {
    alignItems: 'center',
    marginVertical: '20@s'
  }
});
