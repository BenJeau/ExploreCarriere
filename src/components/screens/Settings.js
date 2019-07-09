import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';
import {Button} from 'react-native-paper';

class Settings extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate("LoginNavigator")}>Log out</Button>
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