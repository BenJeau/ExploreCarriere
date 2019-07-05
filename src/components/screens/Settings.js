import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';

class Settings extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

export default connect()(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});