import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

class JobDetail extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate("Availabilities")}>Availabilities</Button>
      </View>
    );
  }
}

export default connect()(JobDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getStatusBarHeight()
  }
});