import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View, ScrollView, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import {Button, Headline, HelperText, TextInput, Title} from 'react-native-paper';

class Signup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state =
      {
        hidePassword: true,
        name : "",
        email : "",
        password : "",
        passwordVerification : "",
        validName : false,
        validEmail : false,
        validPassword : false,
        validPasswordVerification : false,
        canProceed : false
      }

    StatusBar.setBackgroundColor("#FFFFFFD0");
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  updateCanProceed = () => {
    this.setState({canProceed: this.state.validName && this.state.validPassword
        && this.state.validPasswordVerification && this.state.validEmail});
  }

  validateName = (name) => {
    this.setState({validName: name.length > 0, name: name}, this.updateCanProceed);
  };

  validatePassword = (password) => {
    this.setState({validPassword: password.length > 5,
      validPasswordVerification : password === this.state.passwordVerification,
      password: password}, this.updateCanProceed);
  };

  validatePasswordVerification = (passwordVerification) => {
    this.setState({
      validPasswordVerification : passwordVerification === this.state.password,
      passwordVerification: passwordVerification}, this.updateCanProceed);
  }

  validateEmail = (email) => {
    this.setState({validEmail : /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email), email: email}, this.updateCanProceed);
  };

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>

        <Image style={styles.bannerImage}
               source={require("../../assets/fogg-welcome-2.png")}
        />
        <Headline style={styles.headlineStyling}>Enregistrement</Headline>
        <Title style={styles.subtitleStyle}>Votre nouvelle carrière, commence ici</Title>

        <View style={styles.scrollingView}>
            <TextInput
              theme={{ colors: { background: "#ffffff"} }}
              style={styles.input}
              label='Nom'
              mode='outlined'
              value={this.state.name}
              error={!this.state.validName}
              onChangeText={(input) => this.validateName(input)}
            />
            <HelperText
              type="error"
              visible={!this.state.validName && this.state.name.length !== 0}
            >Nom doit être non-vide
            </HelperText>


            <TextInput
              theme={{ colors: { background: "#ffffff"} }}
              style={styles.input}
              label='Courriel'
              mode='outlined'
              value={this.state.email}
              error={!this.state.validEmail}
              onChangeText={(input) => this.validateEmail(input)}
            />
            <HelperText
              type="error"
              visible={!this.state.validEmail && this.state.email.length !== 0}
            >Format invalide de courriel
            </HelperText>


            <View>
              <TextInput
                theme={{ colors: { background: "#ffffff"} }}
                style={styles.input}
                label='Mot de passe'
                mode='outlined'
                value={this.state.password}
                error={!this.state.validPassword}
                onChangeText={(input) => this.validatePassword(input)}
                secureTextEntry={this.state.hidePassword}
              />
              <HelperText
                type="error"
                visible={!this.state.validPassword && this.state.password.length !== 0}
              >Doit contenir 6 caractères ou plus
              </HelperText>


              <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                <Image source = { ( this.state.hidePassword ) ? require('../../assets/hide.png') : require('../../assets/view.png') } style = { styles.btnImage } />
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                theme={{ colors: { background: "#ffffff"} }}
                style={styles.input}
                label='Vérification du mot de passe'
                mode='outlined'
                value={this.state.passwordVerification}
                error={!this.state.validPasswordVerification}
                onChangeText={(input) => this.validatePasswordVerification(input)}
                secureTextEntry={this.state.hidePassword}
              />
              <HelperText
                type="error"
                visible={!this.state.validPasswordVerification && this.state.passwordVerification.length !== 0}
              >Doit correspondre au mot de passe entré
              </HelperText>


              <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                <Image source = { ( this.state.hidePassword ) ? require('../../assets/hide.png') : require('../../assets/view.png') } style = { styles.btnImage } />
              </TouchableOpacity>
            </View>
        </View>

        <View style={styles.buttonPanelView}>
          <Button style={styles.signUp}
                  mode = 'contained'
                  dark = {true}
                  disabled = {!this.state.canProceed}
                  onPress={() => this.props.navigation.navigate("DashboardNavigator")}
          >
            Créer un compte
          </Button>

          <View style={styles.backgroundPane}/>

        </View>
      </View>
        
        </ScrollView>
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
    width: "70%",
    height: 125,
    marginTop: 100
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
    top: 22,
    zIndex: 1
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
    height: "20%"
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
  scrollingView: {
    height: 400
  }
});