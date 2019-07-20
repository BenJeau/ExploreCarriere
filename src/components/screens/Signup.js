import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View, ScrollView, StatusBar, 
  Text, KeyboardAvoidingView} from 'react-native';
import { connect } from 'react-redux';
import {Headline, HelperText, TextInput, Title} from 'react-native-paper';
import Touchable from 'react-native-platform-touchable';

class Signup extends React.PureComponent {
  constructor(props) {
    super(props);

    // Permet la validation des entrées
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
      };

    StatusBar.setBackgroundColor("#FFFFFFD0");
  }

  // Change la visibilté du mot de passe
  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };

  // Vérifie si l'on peut procéder à la prochaine étape
  updateCanProceed = () => {
    this.setState({canProceed: this.state.validName && this.state.validPassword
        && this.state.validPasswordVerification && this.state.validEmail});
  };

  // Vérifie si le nom est valide
  validateName = (name) => {
    this.setState({validName: name.length > 0, name: name}, this.updateCanProceed);
  };

  // Vérifie si le mot de passe est valide
  validatePassword = (password) => {
    this.setState({validPassword: password.length > 5,
      validPasswordVerification : password === this.state.passwordVerification,
      password: password}, this.updateCanProceed);
  };

  // Vérifie si la confirmation du mot de passe
  // correspond au mot de passe précédemment entré
  validatePasswordVerification = (passwordVerification) => {
    this.setState({
      validPasswordVerification : passwordVerification === this.state.password,
      passwordVerification: passwordVerification}, this.updateCanProceed);
  };

  // Vérifie si le format du courriel est correct
  validateEmail = (email) => {
    this.setState({validEmail : /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email), email: email}, this.updateCanProceed);
  };

  render() {
    return (

      // Ajuste la vue afin que le clavier ne cache
      // pas les champs d'entrée
      <ScrollView>
      <KeyboardAvoidingView  style={styles.container}keyboardVerticalOffset={100} behavior="padding" enabled>

        <Image style={styles.bannerImage}
               source={require("../../assets/fogg-welcome-2.png")}
        />
        <Headline style={styles.headlineStyling}>Enregistrement</Headline>
        <Title style={styles.subtitleStyle}>Votre nouvelle carrière, commence ici</Title>

        <View style={styles.scrollingView}>
          { // Affiche l'entrée du nom
            // et ses messages d'erreur
          }
            <TextInput
              onSubmitEditing={() => { this.email.focus(); }}
              blurOnSubmit={false}
              returnKeyType = {'next'}
              theme={{ colors: { background: "#ffffff"} }}
              style={styles.input}
              label='Nom'
              mode='outlined'
              value={this.state.name}
              error={this.state.name && !this.state.validName}
              onChangeText={(input) => this.validateName(input)}
            />
            <HelperText
              type="error"
              visible={!this.state.validName && this.state.name.length !== 0}
            >Nom doit être non-vide
            </HelperText>

          { // Affiche l'entrée du courriel
            // et ses messages d'erreur
          }
            <TextInput
              ref={(i) => this.email = i}
              onSubmitEditing={() => { this.password.focus(); }}
              blurOnSubmit={false}
              returnKeyType = {'next'}
              theme={{ colors: { background: "#ffffff"} }}
              style={styles.input}
              label='Courriel'
              mode='outlined'
              keyboardType="email-address"
              value={this.state.email}
              error={this.state.email && !this.state.validEmail}
              onChangeText={(input) => this.validateEmail(input)}
            />
            <HelperText
              type="error"
              visible={!this.state.validEmail && this.state.email.length !== 0}
            >Format invalide de courriel
            </HelperText>

          { // Affiche l'entrée du mot de passe,
            // ses messages d'erreur et l'option
            // de changer la visibilité
          }
            <View>
              <TextInput
                ref={(i) => this.password = i}
                onSubmitEditing={() => { this.passwordVerif.focus(); }}
                blurOnSubmit={false}
                returnKeyType = {'next'}
                theme={{ colors: { background: "#ffffff"} }}
                style={styles.input}
                label='Mot de passe'
                mode='outlined'
                value={this.state.password}
                error={this.state.validPassword && !this.state.validPassword}
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
              { // Affiche la vérification du mot de passe
              }
              <TextInput
                ref={(i) => this.passwordVerif = i}
                returnKeyType = {'done'}
                theme={{ colors: { background: "#ffffff"} }}
                style={styles.input}
                label='Vérification du mot de passe'
                mode='outlined'
                value={this.state.passwordVerification}
                error={this.state.passwordVerification && !this.state.validPasswordVerification}
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

        { // Affiche le bouton pour procéder
        }
        <View style={styles.buttonPanelView}>

          <View style={[styles.signUpContainer, {elevation: this.state.canProceed ? 5 : 0}]}>
            <Touchable style={[styles.signUp, {backgroundColor: this.state.canProceed ? "transparent" : "#00000010"}]}
              disabled={!this.state.canProceed}
              onPress={() => this.props.navigation.navigate("DashboardNavigator")}>

              <Text style={[styles.signUpText, {color: this.state.canProceed ? "white" : "#00000050"}]}>

              Créer un compte
              </Text>

            </Touchable>
          </View>

          <View style={styles.backgroundPane}/>

        </View>
        
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default connect()(Signup);

// Contient les styles de page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: Dimensions.get("screen").height
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
    color: '#232323',
    textAlign: 'center',
    lineHeight: 40
  },
  subtitleStyle: {
    fontSize: 20,
    color: '#868686',
    marginBottom: 30
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
    width: "100%",
    paddingVertical: 20,
    alignItems: 'center'
  },
  signUpText: {
    textTransform: 'uppercase',
    fontWeight: "bold",
    borderRadius: 10,
    letterSpacing: 1.5
  },
  signUpContainer: {
    borderRadius: 10, 
    width: '70%',
    backgroundColor: "#c74b4b",
    marginTop: 20,
    overflow: 'hidden'
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