import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';

class Summary extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate("Search")}>Search</Button>
      </View>
    );
  }
}

export default connect()(Summary);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});