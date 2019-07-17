import React from 'react';
import {StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';
import {Button, Headline, Title, List, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Settings extends React.PureComponent {
  render() {

    const arrowIcon = <View style={{justifyContent: 'center'}}>
      <Icon name="keyboard-arrow-right" size={30} color="black" />
    </View>;
    const redArrowIcon = <View style={{justifyContent: 'center'}}>
      <Icon name="keyboard-arrow-right" size={30} color="#c74b4b" />
    </View>;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.welcomeMessages}>
            <Headline style={styles.headlineStyling}>Bonjour</Headline>
            <Title style={styles.subtitleStyle}>John Smith</Title>

          </View>
          <View style={styles.faceContainer}>
            <Icon name="face" size={50} color="black"/>
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
            title="Foire de questions (FAQ)"
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
    backgroundColor: 'white'
  },
  header: {
    width: '100%',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
  },
  headlineStyling: {
    fontWeight: 'bold',
    fontSize: 33, 
    marginBottom: -2
  },
  subtitleStyle: {
    fontWeight: '100',
    fontSize: 22
  },
  faceContainer: {
    height: 80, 
    width: 80, 
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 5, 
    backgroundColor: 'white', 
    borderRadius: 50
  },
  optionsStyle: {
    height: '50%',
    width: '100%'
  },
  optionStyle: {
    fontWeight: '900',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  logOutStyle: {
    fontWeight: '900',
    fontSize: 18,
    color: "#c74b4b",
    paddingHorizontal: 10,
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