import React from 'react';
import {StyleSheet, Image, View, ScrollView, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import {Button, Headline, Text, Title, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import jobInfo from '../../data/emplois';
import LinearGradient from "react-native-linear-gradient";
import {Header} from 'react-navigation';

class JobDetail extends React.PureComponent {

  // Réduit les problèmes
  // de display sur les téléphones avec 'notch'
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#ffffffd0',
      marginTop: getStatusBarHeight()
    }
  };

  render() {
    // On charge l'emploi sélectionné à partir du store
    let jobId = this.props.jobId;
    let selectedJobInfo = jobInfo.find(item => item.id === jobId);

    // On charge les icônes que l'on désire utiliser
    const locationIcon = <Icon name="location-on" size={30} color="black" />;
    const dateIcon = <Icon name="date-range" size={30} color="black" />;
    const timeIcon = <Icon name="access-time" size={30} color="black" />;
    const timeWhiteIcon = <Icon name="access-time" size={30} color="white" />;
    const moneyIcon = <Icon name="attach-money" size={30} color="black" />;

    return (
      <ScrollView>
      <View style={styles.container}>
        { // Le LinearGradient stylize l'image retrouvée
          // avec un dégradé foncé
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

        { // On affiche les éléments d'information
          // par rapport à l'emploi à l'aide du component
          // List
        }
          <View>
            <List.Item
              title={selectedJobInfo.humanReadableAddress}
              style={styles.listElement}
              left={() => locationIcon}
            />
            <List.Item
              title={selectedJobInfo.availabilities}
              style={styles.listElement}
              left={() => dateIcon}
            />
            <List.Item
              title={<Text><Text style={{fontWeight: "bold"}}>Max   </Text> {selectedJobInfo.maxTimeFrame}</Text>}
              style={{paddingBottom: 0, paddingTop: 0}}
              left={() => timeIcon}
            />
            <List.Item
              title={<Text><Text style={{fontWeight: "bold"}}>Min   </Text> {selectedJobInfo.minTimeFrame}</Text>}
              style={{paddingTop: 0}}
              left={() => timeWhiteIcon}
            />
            <List.Item
              title={selectedJobInfo.cost + "$ par journée"}
              style={styles.listElement}
              left={() => moneyIcon}
            />
              <Text
                style={styles.jobDescription}
              >
                {selectedJobInfo.textDescription}
              </Text>
          </View>

        { // On navigue à la prochaine page par le bouton
        }
        <Button
          onPress={() => this.props.navigation.navigate("Availabilities")}
          style={styles.availabilitiesButton}
          mode = 'contained'
          dark = {true}
        >
          Disponibilités
        </Button>

      </View>
        
        </ScrollView>
    );
  }
}

// Permet à la classe d'accéder
// au jobId, ce qui lui laisse donc
// accéder à toutes les informations
// d'emploi storées dans emplois.js
let mapToState = (store) => {
  return {
    jobId: store.UserReducer.jobId
  }
};

export default connect(mapToState)(JobDetail);

// Contient les styles de page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width - 40,
    minHeight: Dimensions.get("screen").height,
    paddingTop: getStatusBarHeight() + Header.HEIGHT,
    marginHorizontal: 20
  },
  availabilitiesButton: {
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
    height: '40%',
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
    paddingTop: 0
  },
  jobDescription: {
    fontSize: 16,
    lineHeight: 22,
  }
});