import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { colors } from '../shared/styles';
import { UserProps } from '../shared/interfaces';

export default class SingleUser extends Component {
  constructor(props: UserProps) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.avatar }} style={styles.avatar} />
        <View>
          <Text style={[styles.text, styles.name]}>{`${this.props.first_name} ${this.props.last_name}`}</Text>
          <Text style={styles.text}>{this.props.email}</Text>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '12@s',
    paddingVertical: '34@s',
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    height: '50@s',
    width: '50@s',
    borderRadius: '25@s'
  },
  text: {
    marginLeft: '12@s',
    fontSize: '16@s',
    color: colors.primaryColor
  },
  name: {
    fontWeight: 'bold'
  }
});
