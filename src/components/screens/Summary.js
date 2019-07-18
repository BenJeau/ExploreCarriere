import React from 'react';
import {Dimensions, Image, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import { connect } from 'react-redux';
import {Button, Headline, List, Text, Title, Dialog, Paragraph, Portal} from 'react-native-paper';
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import LinearGradient from "react-native-linear-gradient";
import jobInfo from '../../data/emplois';
import availabilities from '../../data/availabilities';
import Icon from "react-native-vector-icons/MaterialIcons";
import {Header} from "react-navigation";

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

  feedback() {
    this.setState({visible: true});
  }

  render() {
    let jobId = this.props.jobId;
    let selectedJobInfo = jobInfo.find(item => item.id === jobId);
    let selectedAvailability = availabilities[this.props.selectedAvailability].date;
    let selectedDuration = availabilities[this.props.selectedAvailability].weekdays;

    console.log(this.props);

    const locationIcon = <Icon name="location-on" size={30} color="black" />;
    const dateIcon = <Icon name="date-range" size={30} color="black" />;
    const timeIcon = <Icon name="access-time" size={30} color="black" />;
    const timeWhiteIcon = <Icon name="access-time" size={30} color="white" />;
    const moneyIcon = <Icon name="attach-money" size={30} color="black" />;
    const creditCardIcon = <Icon name="credit-card" size={30} color="black" />;

    const paymentInfo = () => {
      if (this.props.paymentType === 'paypal') {
        return (
        <View>
          <List.Item
            title={'Paypal'}
            style={styles.listElement}
            left={() => creditCardIcon}
          />
          <List.Item
            title={"John Smith"}
            style={styles.listElement}
            left={() => timeWhiteIcon}
          />
        </View>);
      }
      else {
        return (
        <View>
          <List.Item
            title={this.props.cardNumber}
            style={styles.listElement}
            left={() => creditCardIcon}
          />
          <List.Item
            title={"John Smith"}
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
            title={selectedJobInfo.cost}
            style={styles.listElement}
            left={() => moneyIcon}
          />
        </View>

        <Text style={styles.title}>Informations de paiement</Text>

        {paymentInfo()}

        <Button
          onPress={() => this.feedback()}
          style={styles.confirmButton}
          mode='contained'
          dark={true}
        >
          Confirmer
        </Button>

        <Portal>
          <Dialog
            visible={this.state.visible}
            onDismiss={() => this.setState({ visible: false })}
          >
            <Dialog.Content>
              <Paragraph>Votre commande a été traitée avec succès. Merci!</Paragraph>
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={() => this.props.navigation.navigate("DashboardNavigator")}>Retour à la recherche</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </View>

    </ScrollView>;
  }
}

let mapToState = (store) => {
  return {
    jobId: store.UserReducer.jobId,
    paymentType : store.UserReducer.paymentType,
    cardNumber : store.UserReducer.cardNumber,
    selectedAvailability: store.UserReducer.selectedAvailability
  }
};

export default connect(mapToState)(Summary);

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
    paddingBottom: 0
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