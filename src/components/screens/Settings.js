import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';
import {Button, Headline, Title, List, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Settings extends React.PureComponent {
  render() {

    const arrowIcon = <Icon name="keyboard-arrow-right" size={30} color="black" />;
    const redArrowIcon = <Icon name="keyboard-arrow-right" size={30} color="#c74b4b" />;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.welcomeMessages}>
            <Headline style={styles.headlineStyling}>Bonjour</Headline>
            <Title style={styles.subtitleStyle}>John Smith</Title>

          </View>
          <View>
            <Icon name="face" size={100} color="black"/>
          </View>
        </View>

        <View style={styles.optionsStyle}>
          <List.Item
            title="Modifier information"
            titleStyle={styles.optionStyle}
            right={() => arrowIcon}
          />
          <List.Item
            title="Modes de paiement"
            titleStyle={styles.optionStyle}
            right={() => arrowIcon}
          />
          <List.Item
            title="Notifications"
            titleStyle={styles.optionStyle}
            right={() => arrowIcon}
          />
          <List.Item
            title="Déconnexion"
            titleStyle={styles.logOutStyle}
            right={() => redArrowIcon}
            onPress={() => this.props.navigation.navigate("LoginNavigator")}
          />
        </View>

        <View style={styles.bottomIndications}>
          <Text style={styles.bottomText}>
              Politique de confidentialité | Conditions d'utilisation
          </Text>


          <Text style={styles.boldBottomText}>Version 0.1</Text>

        </View>

      </View>
    );
  }
}

export default connect()(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  header: {
    width: '100%',
    paddingLeft: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60
  },
  headlineStyling: {
    fontWeight: 'bold',
    fontSize: 33
  },
  subtitleStyle: {
    fontWeight: '100',
    fontSize: 22
  },
  welcomeMessages: {

  },
  optionsStyle: {
    height: '50%',
    width: '100%'
  },
  optionStyle: {
    fontWeight: '900',
    fontSize: 18,
  },
  logOutStyle: {
    fontWeight: '900',
    fontSize: 18,
    color: "#c74b4b"
  },
  bottomIndications: {
    alignItems: 'center',
    paddingBottom: 15
  },
  bottomText: {
    fontSize: 14
  },
  boldBottomText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 5
  }
});