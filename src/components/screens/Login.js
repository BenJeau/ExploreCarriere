import React from 'react';
import {StyleSheet, View, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, Text} from 'react-native';
import { connect } from 'react-redux';
import {Headline, Title, TextInput, HelperText} from 'react-native-paper';
import Touchable from 'react-native-platform-touchable';

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
      <KeyboardAvoidingView  style={styles.container}keyboardVerticalOffset={100} behavior="height" enabled>

        <View style={{flex: 0.3, width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center'}}>
          <Image style={styles.bannerImage}
            source={require("../../assets/fogg-waiting-2.png")} />
        </View>

        <View style={{flex: 0.1, width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center'}}>
          <Headline style={styles.headlineStyling}>Exploration de carrière</Headline>
          <Title style={styles.subtitleStyle}>Découvrez votre carrière</Title>
        </View>

        <View style={{flex: 0.3, width: "100%", height: "100%", alignItems: 'center', justifyContent: 'flex-end'}}>

          <View>

          <TextInput
              theme={{ colors: { primary: "#1C88E5",  background:"#ffffff", underlineColor:'#1C88E5'}}}
              onSubmitEditing={() => { this.passwordInput.focus(); }}
              blurOnSubmit={false}
              style={styles.input}
              label='Courriel'
              keyboardType="email-address"
              returnKeyType = {'next'}
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
              theme={{ colors: { primary: "#1C88E5", background:"#ffffff", underlineColor:'#1C88E5'}}}
              style={styles.input}
              ref={(i) => this.passwordInput = i}
              returnKeyType = {'done'}
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
          </View>

        <View style={styles.buttonPanelView}>
          <View style={[styles.logInContainer, {elevation: this.state.canProceed ? 5 : 0}]}>

          <Touchable style={[styles.logIn, {backgroundColor: this.state.canProceed ? "transparent" : "#00000010"}]}
            disabled={!this.state.canProceed}
            onPress={() => this.props.navigation.navigate("DashboardNavigator")}>

            <Text style={[styles.logInText, {color: this.state.canProceed ? "white" : "#00000050"}]}>
            S'authentifier  
            </Text>

          </Touchable>
        </View>

        <View style={styles.signUpContainer}>
          <Touchable  style={styles.signUp}             
            onPress={() => this.props.navigation.navigate("Signup")}>
            <Text style={styles.logInText}>
            Créer un compte
            </Text>
          </Touchable>
        </View>

        <View style={styles.backgroundPane} />
      </View>

      </KeyboardAvoidingView>
    );
  }
}

export default connect()(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: Dimensions.get("screen").height
  },
  bannerImage: {
    width: "80%",
    height: "100%",
    marginVertical: 10
  },
  input: {
    width: 350,
    margin: "1%",
  },
  headlineStyling: {
    fontSize: 35,
    padding: 10,
    width: "80%",
    color: '#232323',
    textAlign: 'center',
    lineHeight: 40
  },
  subtitleStyle: {
    fontSize: 20,
    color: '#868686',
  },
  buttonPanelView: {
    alignItems: 'center',
    width: "100%",
    height: "25%",
    flex: 0.25
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
    width: "100%",
    paddingVertical: 20,
    alignItems: 'center'
  },
  logInText: {
    textTransform: 'uppercase',
    fontWeight: "bold",
    borderRadius: 10,
    letterSpacing: 1.5
  },
  logInContainer: {
    borderRadius: 10, 
    width: '70%',
    backgroundColor: "#1f88e5",
    marginTop: 20,
    overflow: 'hidden'
  },
  signUpContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
    elevation: 3,
    overflow: 'hidden'
  },
  signUp: {
    color: 'gray',
    paddingHorizontal: 15,
    paddingVertical: 8
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