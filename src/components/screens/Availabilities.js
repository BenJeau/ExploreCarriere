import React from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import availabilities from '../../data/availabilities';
import Availability from '../Availability';
import { Header } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

class Availabilities extends React.PureComponent {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#ffffffd0',
      marginTop: getStatusBarHeight()
    }
  }

  componentWillMount() {
    StatusBar.setBackgroundColor("#ffffffd0");
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView>
          <View style={styles.content}>

            <Text style={styles.description}>Veuillez sélectionner un temps vous convenant</Text>
            {
              availabilities.map((i, key) => (
                <Availability key={key}
                  {...i}
                  onPress={() => this.props.navigation.navigate("Payment")} />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect()(Availabilities);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: Header.HEIGHT + getStatusBarHeight(),
  },
  description: {
    color: 'black',
    fontSize: 16,
    marginLeft: 15
  }
});