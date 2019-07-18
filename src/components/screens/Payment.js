import React from 'react';
import { StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, Image, AppState, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { RadioButton, TextInput, HelperText, Button, Snackbar } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Header } from 'react-navigation';
import Touchable from 'react-native-platform-touchable';
import { CustomTabs } from 'react-native-custom-tabs';
import { bindActionCreators } from 'redux';
import { setPaymentType, setPaymentName, setPaymentNumber, setPaymentCVV, setPaymentMonth, setPaymentYear } from '../../redux/actions';

var moment = require('moment');

const textInputTheme = {
  colors: { 
    primary: "#1C88E5", 
    background: "#ffffff", 
    underlineColor: '#1C88E5' 
  }
}

const radioButtonTheme = {
  colors: { 
    accent: "#1C88E5", 
  }
}

class Payment extends React.PureComponent {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#ffffffd0',
      marginTop: getStatusBarHeight()
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      paymentState: 'credit',
      snackBarVisible: false
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.setState({snackBarVisible: true})
    }
  }

  openPayPal = () => {
    CustomTabs.openURL('https://www.paypal.com/ca/signin', {
      enableUrlBarHiding: true,
      showPageTitle: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: true,
    });
  }

  validate = () => {
    let isfilled = true;
    let variables = [];

    if (this.state.paymentState === 'debit') {
      variables.push('nomComplet');
      variables.push('numCarte');
      variables.push('year');
      variables.push('month');
    } else if (this.state.paymentState === 'credit') {
      variables.push('nomComplet');
      variables.push('numCarte');
      variables.push('year');
      variables.push('month');
      variables.push('cvv');
    }
		variables.forEach((i) => {
		  switch (i) {
        case 'nomComplet':
          if(this.state[i] == '')
          {
            isfilled = false;
          }
          break;
        case 'numCarte':
          if (!(/^[\d]{16}$/.test(this.state[i])))
          {
            isfilled = false;
          }
          break;
        case 'cvv':
          if (!(/^[\d]{3}$/.test(this.state[i])))
          {
            isfilled = false;
          }
          break;
        case 'year':
          if (!(/^[\d]{4}$/.test(this.state[i])))
          {
            isfilled = false;
          }
          break;
        case 'month':
          if (this.state[i] < 1 || this.state[i] > 12)
          {
            isfilled = false;
          }
          else if(!(moment(this.state.year + "-" + this.state.month, 'YYYY-M')
            .isSameOrAfter(moment())))
          {
            isfilled = false;
          }
          break;
        default:
          break;
      }
		});

    if (isfilled) {
      this.props.setPaymentType(this.state.paymentState);

      if (this.state.paymentState !== "paypal") {
        this.props.setPaymentName(this.state.nomComplet);
        this.props.setPaymentNumber(this.state.numCarte);
        this.props.setPaymentMonth(this.state.month);
        this.props.setPaymentYear(this.state.year);

        if (this.state.paymentState === "credit") {
          this.props.setPaymentCVV(this.state.cvv);
        }
      }

      this.props.navigation.navigate("Summary");
    }
  }

  render() {
    const { paymentState, nomComplet, cvv, numCarte, month, year, snackBarVisible } = this.state;

    let CVV = (<View />);
    let paiementContent = (
      <View style={styles.payPalContainer}>
        <Text>Veuillez vous authentifier avec PayPal pour compléter le paiement</Text>

        <View style={styles.payPalButtonContainer}>

          <View style={styles.payPalButton}>
            <Touchable onPress={this.openPayPal}>
              <View style={styles.payPalContent}>

                <Image source={require("../../assets/paypal.png")} 
                  style={styles.payPalIcon} />
                <Text style={styles.payPalText}>Procéder avec PayPal</Text>
              </View>
            </Touchable>
          </View>
        </View>
      </View>
    );

    if (paymentState === "credit") {
      CVV = (
        <View>
          <TextInput theme={textInputTheme}
            label='CVV'
            mode='outlined'
            style={styles.textInput}
            value={cvv}
            keyboardType="number-pad"
            onChangeText={cvv => this.setState({ cvv })} />

          <HelperText
            type="error"
            visible={!(/^[\d]{3}$/.test(cvv))} >
            CVV de 3 chiffres obligatoire
          </HelperText>
        </View>
      )
    }

    if (paymentState !== 'paypal') {
      paiementContent = (
        <View>
          <Text style={styles.title}>Information de paiement</Text>

          <Text style={styles.subtitle}>Information générale</Text>

          <TextInput theme={textInputTheme}
            label='Nom complet'
            mode='outlined'
            style={styles.textInput}
            value={nomComplet}
            onChangeText={nomComplet => this.setState({ nomComplet })} />

          <HelperText
            type="error"
            visible={this.state.nomComplet === undefined || nomComplet == ''}>
            Votre nom est obligatoire
					</HelperText>

          <TextInput theme={textInputTheme}
            label='Numéro de carte'
            mode='outlined'
            style={styles.textInput}
            value={numCarte}
            keyboardType="number-pad"
            onChangeText={numCarte => this.setState({ numCarte })} />

          <HelperText
            type="error"
            visible={!(/^([\d]{16})$/.test(numCarte))}>
            Numéro de carte de 16 chiffres obligatoire
					</HelperText>

          {CVV}

          <Text style={styles.subtitle}>Date d'expiration</Text>

          <View style={styles.dateContainer}>
            <TextInput theme={textInputTheme}
              label='Mois'
              mode='outlined'
              style={styles.dateInput}
              value={month}
              keyboardType="number-pad"
              onChangeText={month => this.setState({ month })} />

            <TextInput theme={textInputTheme}
              label='Année'
              mode='outlined'
              style={styles.dateInput}
              value={year}
              keyboardType="number-pad"
              onChangeText={year => this.setState({ year })} />
          </View>
          <HelperText
            type="error"
            visible={!(month > 1 && month < 13) || !(/^([\d]{4})$/.test(year))
            || !(moment(this.state.year + "-" + this.state.month, 'YYYY-M')
              .isSameOrAfter(moment()))}>
            Date d'expiration valide obligatoire
          </HelperText>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView style={styles.content} 
            behavior="padding" 
            enabled>
            <View>
              <Text style={[styles.title, { marginTop: 0 }]}>
                Méthode de paiement
							</Text>

              <View style={styles.radioContainer}>
                <RadioButton.Group
                  onValueChange={paymentState => this.setState({ paymentState })}
                  value={paymentState}>
                  <View style={styles.radio}>
                    <RadioButton value="credit"
                      theme={radioButtonTheme}/>

                    <TouchableOpacity onPress={() => this.setState({ paymentState: "credit" })}>
                      <Text style={styles.radioText}>Crédit</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.radio}>
                    <RadioButton value="debit"
                      theme={radioButtonTheme} />

                    <TouchableOpacity onPress={() => this.setState({ paymentState: "debit" })}>
                      <Text style={styles.radioText}>Débit</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.radio}>
                    <RadioButton value="paypal"
                      theme={radioButtonTheme} />

                    <TouchableOpacity onPress={() => this.setState({ paymentState: "paypal" })}>
                      <Text style={styles.radioText}>PayPal</Text>
                    </TouchableOpacity>
                  </View>
                </RadioButton.Group>
              </View>

              {paiementContent}

              <Button mode='contained'
                style={styles.buttonContainer}
                theme={textInputTheme}
                onPress={this.validate}>
                <Text style={styles.button}>
                  Voir le sommaire
                </Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

        <Snackbar visible={snackBarVisible}
          theme={radioButtonTheme}
          onDismiss={() => this.setState({ snackBarVisible: false })}
          action={{
            label: 'Rejeter',
            onPress: () => this.setState({ snackBarVisible: false }),
          }}>
          Authentifié avec PayPal
        </Snackbar>
      </View>
    );
  }
}

const mapDispatch = dispatch => {
	return bindActionCreators({ setPaymentType, setPaymentName, setPaymentNumber, setPaymentCVV, setPaymentMonth, setPaymentYear }, dispatch);
};

const mapState = state => {
  return {
    items: state.UserReducer.items
  };
};

export default connect(mapState, mapDispatch)(Payment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10 + getStatusBarHeight() + Header.HEIGHT,
  },
  dateContainer: { 
    flexDirection: 'row', 
    flex: 1, 
    justifyContent: 'space-between' 
  },
  dateInput: { 
    flex: 0.45 
  },
  radio: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    color: 'black',
  },
  radioText: {
    color: 'black'
  },
  radioContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 15
  },
  textInput: {
    marginBottom: 10
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    marginVertical: 20,
    borderRadius: 10
  },
  subtitle: {
    marginBottom: 10
  },
  payPalContainer: {
    width: "100%"
  },
  payPalButtonContainer: {
    alignItems: 'center', 
    marginVertical: 40
  }, 
  payPalContent: { 
    flexDirection: 'row', 
    padding: 10, 
    alignItems: 'center' 
  },
  payPalButton : { 
    elevation: 4, 
    backgroundColor: '#ffffff', 
    borderRadius: 5
  },
  payPalIcon: { 
    height: 30, 
    width: 30, 
    resizeMode: 'contain' 
  },
  payPalText: {
    paddingLeft: 5,
    color: "black"
  }
});