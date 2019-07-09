import React from 'react';
import {StyleSheet, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {Button, Headline, Title, TextInput} from 'react-native-paper';

class Login extends React.PureComponent {
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
          source={require("../../assets/fogg-waiting-2.png")}
        />

        <Headline style={styles.headlineStyling}>Exploration de carrière</Headline>
        <Title style={styles.subtitleStyle}>Découvrez votre carrière</Title>

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

        <View style={styles.buttonPanelView}>
          <Button style={styles.logIn}
            mode = 'contained'
            dark = {true}
            onPress={() => this.props.navigation.navigate("DashboardNavigator")}
          >
            S'authentifier
          </Button>

          <Button style={styles.signUp}
            mode = 'contained'
            dark = {false}
            onPress={() => this.props.navigation.navigate("Signup")}
          >
            Créer un compte
          </Button>

          <View style={styles.backgroundPane}>

          </View>
        </View>
        {
          /*
          <Button onPress={() => this.props.navigation.navigate("DashboardNavigator")}>Search</Button>
          <Button onPress={() => this.props.navigation.navigate("Signup")}>Signup</Button>
          */
        }
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
  },
  bannerImage: {
    width: "80%",
    height: 200
  },
  input: {
    width: 350,
    margin: "1%",
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
  buttonPanelView: {
    alignItems: 'center',
    width: "100%",
    height: "25%"
  },
  backgroundPane: {
    backgroundColor: '#bbdbf7',
    height: "100%",
    zIndex: -1,
    width: "100%",
    position: 'absolute',
    top: 50,
    bottom: Dimensions.get('window').height
  },
  logIn: {
    width: "70%",
    backgroundColor: '#1f88e5',
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  signUp: {
    width: "50%",
    backgroundColor: 'white',
    borderRadius: 20,
    color: 'gray',
    marginTop: 20
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
  }
});