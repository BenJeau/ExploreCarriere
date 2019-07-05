import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';

class AppliedJobs extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

export default connect()(AppliedJobs);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});