import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import { connect } from 'react-redux';
import {Button, Headline, TextInput, Title} from 'react-native-paper';

class Signup extends React.PureComponent {
  constructor() {
    super();
    this.state =
      {
        hidePassword: true
      }
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  render() {
    return (
      <View style={styles.container}>

        <Image style={styles.bannerImage}
               source={require("../../assets/fogg-welcome-2.png")}
        />
        <Headline style={styles.headlineStyling}>Enregistrement</Headline>
        <Title style={styles.subtitleStyle}>Votre nouvelle carrière, commence ici</Title>

        <TextInput
          style={styles.input}
          label='Nom'
          mode='outlined'
        />
        <TextInput
          style={styles.input}
          label='Courriel'
          mode='outlined'
        />
        <View>
          <TextInput
            style={styles.input}
            label='Mot de passe'
            mode='outlined'
            secureTextEntry={this.state.hidePassword}
          />
          <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../../assets/hide.png') : require('../../assets/view.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.input}
            label='Vérification du mot de passe'
            mode='outlined'
            secureTextEntry={this.state.hidePassword}
          />
          <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../../assets/hide.png') : require('../../assets/view.png') } style = { styles.btnImage } />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonPanelView}>
          <Button style={styles.signUp}
                  mode = 'contained'
                  dark = {true}
                  onPress={() => this.props.navigation.navigate("DashboardNavigator")}
          >
            Créer un compte
          </Button>

          <View style={styles.backgroundPane}/>

        </View>
      </View>
    );
  }
}

export default connect()(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerImage: {
    width: "80%",
    height: 200
  },
  headlineStyling: {
    fontSize: 35,
    padding: 10,
    width: "80%",
    color: 'gray',
    textAlign: 'center',
    lineHeight: 50
  },
  subtitleStyle: {
    fontSize: 20
  },
  input: {
    width: 350,
    margin: "1%",
  },
  visibilityBtn:
  {
    position: 'absolute',
    height: 30,
    width: 25,
    right: 20,
    top: 22
  },
  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
  signUp: {
    width: "70%",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: '#c74b4b'
  },
  buttonPanelView: {
    alignItems: 'center',
    width: "100%",
    height: "10%"
  },
  backgroundPane: {
    backgroundColor: '#e9baba',
    height: "100%",
    zIndex: -1,
    width: "100%",
    position: 'absolute',
    top: 50,
    bottom: Dimensions.get('window').height
  },
});