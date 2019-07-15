import React from 'react';
import {StyleSheet, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {Button, Headline, Title, TextInput, HelperText} from 'react-native-paper';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state =
      {
        hidePassword: true,
        email : "",
        password : "",
        validEmail : false,
        validPassword : false,
        canProceed : false
      }
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  updateCanProceed = () => {
    this.setState({canProceed: this.state.validPassword && this.state.validEmail});
  }

  validatePassword = (password) => {
    this.setState({validPassword: password.length > 5, password: password}, this.updateCanProceed);
  };

  validateEmail = (email) => {
    this.setState({validEmail : /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email), email: email}, this.updateCanProceed);
  };

  render() {
    return (
      <View style={styles.container}>

        <Image style={styles.bannerImage}
          source={require("../../assets/fogg-waiting-2.png")}
        />

        <Headline style={styles.headlineStyling}>Exploration de carrière</Headline>
        <Title style={styles.subtitleStyle}>Découvrez votre carrière</Title>

        <View>
          <TextInput
    theme={{ colors: { primary: "#1C88E5", placeholder: '#1C88E5', background:"#ffffff", underlineColor:'#1C88E5'}}}

style={styles.input}
              label='Courriel'
              mode='outlined'
              value={this.state.email}
              error={this.state.email &&!this.state.validEmail}
              onChangeText={(input) => this.validateEmail(input)}
          />
          <HelperText
            type="error"
            visible={!this.state.validEmail && this.state.email.length !== 0}
          >Format invalide de courriel
          </HelperText>
        </View>

        <View>
          <TextInput
    theme={{ colors: { primary: "#1C88E5", placeholder: '#1C88E5', background:"#ffffff", underlineColor:'#1C88E5'}}}
              style={styles.input}
              label='Mot de passe'
              mode='outlined'
              value={this.state.password}
              secureTextEntry={this.state.hidePassword}
              error={this.state.password && !this.state.validPassword}
              onChangeText={(input) => this.validatePassword(input)}
          />
          <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = {this.managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../../assets/hide.png') : require('../../assets/view.png') } style = { styles.btnImage } />
          </TouchableOpacity>
          <HelperText
            type="error"
            visible={!this.state.validPassword && this.state.password.length !== 0}
          >
            Doit contenir 6 caractères ou plus
          </HelperText>
        </View>

        <View style={styles.buttonPanelView}>
          <Button style={styles.logIn}
            mode = 'contained'
            dark = {true}
            disabled = {!this.state.canProceed}
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
    top: 22,
    zIndex: 1
  },
  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  }
});