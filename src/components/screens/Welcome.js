import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// contient le contenu de chacune des pages d'introduction
const slides = [
  {
    key: 'prep',
    title: 'Préparation',
    text: 'Nous allons donnez tout les outils nécessaire pour vous guider à choisir le meilleur emploi et à profiter de votre mieux de vos expériences',
    image: require('../../assets/fogg-premium-upgrade-1.png'),
    backgroundColor: '#ffffff',
  },
  {
    key: 'exp',
    title: 'Expérience',
    text: `Obtenez de l'expérience dans divers emplois à court terme, pour que vous puissiez faire le bon choix de carrière`,
    image: require('../../assets/fogg-payment-processed-1.png'),
    backgroundColor: '#ffffff',
  },
  {
    key: 'carr',
    title: 'Carrière',
    text: `L'application vous recommendera des carrières suites à vos essaies de carrières et vous allez trouver la carrière de vos rêves`,
    image: require('../../assets/fogg-success-1.png'),
    backgroundColor: '#ffffff',
  }
];

class Welcome extends React.PureComponent {
  // Permet d'aller à la prochaine page
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialIcons
          name="keyboard-arrow-right"
          color="rgba(255, 255, 255, .9)"
          size={30}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  // Permet de passer à la prochaine étape
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialIcons
          name="check"
          color="rgba(255, 255, 255, .9)"
          size={30}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  // Formatte chacun des items
  _renderItem = (item) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style= {styles.image} transform={[{scale: 1.2}]}/>
        <View style={{flex: 0.3, marginTop: -120}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  render() {
    // Affiche le tout
    return (
      <AppIntroSlider slides={slides}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        activeDotStyle={{backgroundColor: '#565656', elevation: 3}}
        onDone={() => this.props.navigation.navigate("LoginNavigator")} />
    );
  }
}

export default connect()(Welcome);

// Contient les styles de page
const styles = StyleSheet.create({
  buttonCircle: {
    width: 48,
    height: 48,
    backgroundColor: '#565656',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 0.63, 
    width: "100%", 
    height: 300, 
    resizeMode: 'contain'
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: 'black',
    marginBottom: 10
  },
  text:{
    textAlign: 'center',
    width: Dimensions.get('screen').width - 80,
    color: 'black',
    fontSize: 15,
  },
  slide: {
    alignItems: 'center',
    flex: 1
  }
});