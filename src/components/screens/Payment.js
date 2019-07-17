import React from 'react';
import { StyleSheet, View, ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { RadioButton, TextInput, HelperText } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Header } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import Touchable from 'react-native-platform-touchable';

class Payment extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {

      paymentState: 'first',
      months: [
        { value: 'Janvier', },
        { value: 'Février', },
        { value: 'Mars', },
        { value: 'Avril', },
        { value: 'Mai', },
        { value: 'Juin', },
        { value: 'Juillet', },
        { value: 'Août', },
        { value: 'Septembre', },
        { value: 'Octobre', },
        { value: 'Novembre', },
        { value: 'Décembre', }
      ],
      years: [
        { value: '2019' },
        { value: '2020' },
        { value: '2021' },
        { value: '2022' },
        { value: '2023' },
        { value: '2024' },
        { value: '2025' },
        { value: '2026' },
        { value: '2027' },
        { value: '2028' },
        { value: '2029' },
        { value: '2030' },
      ]
    };
  }


  validate = (paymentState) => {

    let isfilled = true;
    let variables = ['ville', 'numRue', 'nomRue', 'codePostal', 'pays'];
    if (paymentState == 'second') {
      variables.push('nomComplet')
      variables.push('numCarte')

    }
    else if (paymentState == 'first') {
      variables.push('nomComplet')
      variables.push('numCarte')
      variables.push('cvv')
    }
    variables.forEach((i) => {

      if (this.state[i] == null || this.state[i] == '') {
        this.setState({ [i]: '' })
        isfilled = false
      }
    });
    if (isfilled) {
      this.props.navigation.navigate("Summary")


    }
  }

  render() {
    const { paymentState } = this.state;


    let paiementContent = (
      <View>
        <Text>Faite certain d'emporter votre argent lors de la commande</Text>
      </View>
    )

    let CVV = (<View />);


    switch (paymentState) {
      case 'first':
        CVV = (
          <View>
            <TextInput
              label='CVV'
              mode='outlined'
              style={styles.textInput}
              value={this.state.cvv}
              keyboardType="number-pad"
              onChangeText={cvv => this.setState({ cvv })} />

            <HelperText
              type="error"
              visible={this.state.cvv == ""}
            >
              Le cvv est necessaire
					</HelperText>
          </View>
        )
        break;
      case 'second':
        break;
    }

    if (paymentState != 'third') {

      paiementContent = (
        <View>

          <Text style={styles.title}>
            Information de paiement
							</Text>

          <Text style={styles.subtitle}>
            Information générale
							</Text>
          <TextInput
            label='Nom complet'
            mode='outlined'
            style={styles.textInput}
            value={this.state.nomComplet}
            onChangeText={nomComplet => this.setState({ nomComplet })} />
          <HelperText
            type="error"
            visible={this.state.nomComplet == ""}
          >
            Le Nom au complet est necessaire
					</HelperText>

          <TextInput
            label='Numéro de carte'
            mode='outlined'
            style={styles.textInput}
            value={this.state.numCarte}
            keyboardType="number-pad"
            onChangeText={numCarte => this.setState({ numCarte })} />
          <HelperText
            type="error"
            visible={this.state.numCarte == ""}
          >
            Le numero de la carte est necessaire
					</HelperText>
          {CVV}


          <Text style={styles.subtitle}>
            Date d'expiration
							</Text>
          <Dropdown
            label='Mois'
            selectedItem={(selectedMonth) => this.setState({ selectedMonth })}
            data={this.state.months} />

          <Dropdown
            label='Année'
            selectedItem={(selectedYear) => this.setState({ selectedYear })}
            data={this.state.years}
          />
        </View>
      )
    }


    return (
      <View style={styles.container}>
        <ScrollView>

          <KeyboardAvoidingView style={styles.content} behavior="padding" enabled>
            <View>
              <Text style={[styles.title, { marginTop: 0 }]}>
                Méthode de paiement
							</Text>
              <View style={styles.radioContainer}>
                <RadioButton.Group
                  onValueChange={paymentState => this.setState({ paymentState })}
                  value={this.state.paymentState}>
                  <View style={styles.radio}>
                    <RadioButton value="first" />
                    <Text>Crédit</Text>
                  </View>
                  <View style={styles.radio}>
                    <RadioButton value="second" />
                    <Text>Débit</Text>
                  </View>
                  <View style={styles.radio}>
                    <RadioButton value="third" />
                    <Text>Paypal</Text>
                  </View>
                </RadioButton.Group>
              </View>

              {paiementContent}

              <View style={styles.buttonContainer}>

                <Touchable style={styles.button}
                  onPress={() => this.validate(paymentState)}>

                  <Text style={styles.buttonText}>
                    Voir le sommaire
  </Text>

                </Touchable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}
const mapState = state => {
  return {
    items: state.UserReducer.items
  };
};


export default connect(mapState)(Payment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10 + getStatusBarHeight() + Header.HEIGHT,
  },
  radio: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    color: 'black',
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
    alignItems: 'center'
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: "bold",
    borderRadius: 10,
    letterSpacing: 1.5,
    color: 'white'
  },
  buttonContainer: {
    borderRadius: 10, 
    width: '100%',
    backgroundColor: "#1f88e5",
    marginVertical: 20,
    overflow: 'hidden',
    elevation: 5
  },
});