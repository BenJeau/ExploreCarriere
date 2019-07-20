import React from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import availabilities from '../../data/availabilities';
import Availability from '../Availability';
import { Header } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { bindActionCreators } from 'redux';
import { setAvailability } from '../../redux/actions';

class Availabilities extends React.PureComponent {

  // Ces deux méthodes réduisent les problèmes
  // de display sur les téléphones avec 'notch'
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#ffffffd0',
      marginTop: getStatusBarHeight()
    }
  };

  componentWillMount() {
    StatusBar.setBackgroundColor("#ffffffd0");
  };

  // Cette méthode met à jour la variable
  // concernant quelle disponibilité on a
  // choisi, puis nous dirige vers la prochaine
  // page
  nextPage = (index) => {
    this.props.setAvailability(index);
    this.props.navigation.navigate("Payment");
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>

            <Text style={styles.description}>Veuillez sélectionner un temps vous convenant</Text>
            {
              // On va afficher toutes les disponibiltés à
              // partir du fichier availabilities.js puis les
              // formatter à l'aide du custom component
              // Availability
              availabilities.map((i, key) => (
                <Availability key={key}
                  {...i}
                  onPress={() => this.nextPage(key)} />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

// Permet à la classe de faire l'action
// 'setAvailability' qui s'exécutera sur
// le store
const mapDispatch = dispatch => {
	return bindActionCreators({ setAvailability }, dispatch);
};

export default connect(null, mapDispatch)(Availabilities);

// Contient les styles de page
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