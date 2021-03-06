import React from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {Button, Headline, List, Text, Title, Dialog, Paragraph, Portal} from 'react-native-paper';
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import LinearGradient from "react-native-linear-gradient";
import jobInfo from '../../data/emplois';
import availabilities from '../../data/availabilities';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Header } from "react-navigation";
import { addAppliedJob } from '../../redux/actions';
import { bindActionCreators } from 'redux';

class Summary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state =
      {
        visible: false
      }
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#ffffffd0',
      marginTop: getStatusBarHeight()
    }
  };

  componentWillMount() {
    StatusBar.setBackgroundColor("#ffffffd0");
  }

  // Rétroaction après avoir confirmé la commande
  feedback() {
    this.setState({visible: true});
    StatusBar.setBackgroundColor("#00000000")
  }

  // Met à jour le store et passe
  // au prochain écran
  nextScreen = () => {
    this.props.addAppliedJob({
      jobId: this.props.jobId,
      selectedAvailability: this.props.selectedAvailability,
    });
    this.props.navigation.navigate("DashboardNavigator");
  };

  render() {
    // On accède d'abord à toutes les informations
    // nécessaires
    let jobId = this.props.jobId;
    let selectedJobInfo = jobInfo.find(item => item.id === jobId);
    let availability = availabilities[this.props.selectedAvailability];
    let selectedAvailability = availability.date;
    let selectedDuration = availability.weekdays;
    let cost = availability.numberOfDays*selectedJobInfo.cost;

    // On déclare toutes les icones nécessaires
    const locationIcon = <Icon name="location-on" size={30} color="black" />;
    const dateIcon = <Icon name="date-range" size={30} color="black" />;
    const timeIcon = <Icon name="access-time" size={30} color="black" />;
    const timeWhiteIcon = <Icon name="access-time" size={30} color="white" />;
    const moneyIcon = <Icon name="attach-money" size={30} color="black" />;
    const creditCardIcon = <Icon name="credit-card" size={30} color="black" />;

    // Affiche les options nécessaires pour
    // l'option de paiement précedemment
    // sélectionnées
    const paymentInfo = () => {
      if (this.props.paymentType === 'paypal') {
        return (
        <View>
          <List.Item
            title={'PayPal'}
            style={styles.listElement}
            left={() => creditCardIcon}
          />
          <List.Item
            title={"Benoît Jeaurond"}
            style={styles.listElement}
            left={() => timeWhiteIcon}
          />
        </View>);
      }
      else {
        let creditCard =
          <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '100%', paddingLeft: 16, paddingRight: 36}}>
            <Text style={{fontSize:16}}>Numéro de carte</Text>
            <Text style ={{fontWeight: 'bold', fontSize:16}}>{"XXXX " + this.props.cardNumber.slice(-4)}</Text>
          </View>
        return (
        <View>
          <View style={{flexDirection: "row", width: "100%"}}>
            {creditCardIcon}
            {creditCard}
          </View>
          <List.Item
            title={"Benoît Jeaurond"}
            style={styles.listElement}
            left={() => timeWhiteIcon}
          />
        </View>);
      }
    };

    return <ScrollView>
      <View style={styles.container}>
        <Text style={styles.description}>Veuillez vérifier votre commande</Text>
        <Text style={styles.title}>Information de l'emploi</Text>

        { // Affiche l'image de la compagnie
          // avec un dégradé
        }
        <LinearGradient
          colors={['rgba(255,255,255,0)', '#000000']}
          style={styles.companyBanner}>
          <Image
            style={styles.companyBannerImage}
            source={selectedJobInfo.imgSrc}
          />
          <Headline style={styles.headlineStyling}>{selectedJobInfo.jobTitle}</Headline>
          <Title style={styles.subtitleStyle}>{selectedJobInfo.companyTitle}</Title>
        </LinearGradient>

        { // Affiche les informations relatives
          // à la commande
        }
        <View>
          <List.Item
            title={selectedJobInfo.humanReadableAddress}
            style={styles.listElement}
            left={() => locationIcon}
          />
          <List.Item
            title={selectedAvailability}
            style={styles.listElement}
            left={() => dateIcon}
          />
          <List.Item
            title={selectedDuration}
            style={styles.listElement}
            left={() => timeIcon}
          />
          <List.Item
            title={cost + "$"}
            style={styles.listElement}
            left={() => moneyIcon}
          />
        </View>

        <Text style={styles.title}>Informations de paiement</Text>

        { // Affiche les options de paiement choisies
        }
        {paymentInfo()}

        { // Bouton pour passer à la prochaine étape
        }
        <Button
          onPress={() => this.feedback()}
          style={styles.confirmButton}
          mode='contained'
          dark={true}
        >
          Confirmer
        </Button>

        { // Dialogue de rétroaction affiché
          // après qu'on effectue une commande
        }
        <Portal>
          <Dialog
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}
          >
            <Dialog.Content>
              <Paragraph style={{fontSize: 16}}>Votre commande a été traitée avec succès. Merci!</Paragraph>
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={this.nextScreen}
                theme={{colors: {primary: "#1f88e5"}}}>Retour à la recherche</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </View>

    </ScrollView>;
  }
}

// Permet à la classe d'accéder aux informations
// du store
let mapToState = (store) => {
  return {
    jobId: store.UserReducer.jobId,
    paymentType : store.UserReducer.paymentType,
    cardNumber : store.UserReducer.cardNumber,
    selectedAvailability: store.UserReducer.selectedAvailability
  }
};

// Permet à la classe d'effectuer l'action d'ajouter
// un emploi à la liste des emplois appliqués au store
const mapDispatch = dispatch => {
	return bindActionCreators({ addAppliedJob }, dispatch);
};

export default connect(mapToState, mapDispatch)(Summary);

// Contient les styles de page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width - 40,
    minHeight: Dimensions.get("screen").height,
    paddingTop: getStatusBarHeight() + Header.HEIGHT,
    marginHorizontal: 20
  },
  confirmButton: {
    width: '100%',
    backgroundColor: '#1f88e5',
    marginVertical: 20,
    borderRadius: 10,
    elevation: 3
  },
  contentPane: {
    width: '95%',
    paddingHorizontal: 10
  },
  companyBanner: {
    height: '25%',
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'flex-end',
    elevation: 6,
    marginTop: 5
  },
  companyBannerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    borderRadius: 10,
    zIndex : -1
  },
  headlineStyling: {
    color: 'white',
    paddingLeft: 10
  },
  subtitleStyle: {
    color: 'white',
    paddingBottom: 20,
    paddingLeft: 10
  },
  listElement: {
    paddingTop: 0,
    paddingBottom: 0,
    width: "100%",
    flex: 1
  },
  description: {
    color: 'black',
    fontSize: 16,
    paddingTop: 10
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10
  },
});