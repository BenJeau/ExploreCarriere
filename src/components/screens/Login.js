import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';

class Login extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate("DashboardNavigator")}>Search</Button>
        <Button onPress={() => this.props.navigation.navigate("Signup")}>Signup</Button>
      </View>
    );
  }
}

export default connect()(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});