import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Headline, Title, List, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CustomTabs } from 'react-native-custom-tabs';

class Settings extends React.PureComponent {

  // Permet d'ouvrir une page externe
  openLink = (url) => {
    CustomTabs.openURL(url, {
      enableUrlBarHiding: true,
      showPageTitle: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: true,
    });
  }

  render() {

    // Initialise les icones que l'on désire utiliser
    const arrowIcon = <View style={{justifyContent: 'center'}}>
      <Icon name="keyboard-arrow-right" size={30} color="black" />
    </View>;
    const redArrowIcon = <View style={{justifyContent: 'center'}}>
      <Icon name="keyboard-arrow-right" size={30} color="#c74b4b" />
    </View>;

    return (
      <View style={styles.container}>

        { // Affiche les messages d'acceuil et l'icone
          // de profil de l'utilisateur
        }
        <View style={styles.header}>
          <View style={styles.welcomeMessages}>
            <Headline style={styles.headlineStyling}>Bonjour</Headline>
            <Title style={styles.subtitleStyle}>Benoît Jeaurond</Title>

          </View>
          <View style={styles.faceContainer}>
            <Icon name="face" size={50} color="black"/>
          </View>
        </View>

        { // Affiche les diverses options de changement
          // de paramètres et d'aide
        }
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
            onPress={() => this.openLink("https://github.com/BenJeau/SEG3525-ProjetUI/wiki/Foire-de-questions-(FAQ)")}
          />
          <List.Item
            title="Déconnexion"
            titleStyle={styles.logOutStyle}
            right={() => redArrowIcon}
            onPress={() => this.props.navigation.navigate("LoginNavigator")}
          />
        </View>

        { // Liens externes pour en savoir plus sur l'application
        }
        <View style={styles.bottomIndications}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.openLink("https://github.com/BenJeau/SEG3525-ProjetUI/wiki/Politique-de-confidentialit%C3%A9")}>
              <Text>Politique de confidentialité</Text>
            </TouchableOpacity>
            <Text> | </Text>

            <TouchableOpacity onPress={() => this.openLink("https://github.com/BenJeau/SEG3525-ProjetUI/wiki/Conditions-d'utilisation")}>
              <Text>Conditions d'utilisation</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.boldBottomText}>Version 0.1</Text>
        </View>
      </View>
    );
  }
}

export default connect()(Settings);

// Contient les styles de page
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