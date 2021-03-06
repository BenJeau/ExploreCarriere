import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AppliedJob from '../AppliedJob';
import emplois from '../../data/emplois';
import availabilities from '../../data/availabilities';

class AppliedJobs extends React.PureComponent {

  render() {
    let data = [];

    // On load à partir de notre store les emplois,
    // qu'on stocke dans la variable data d'où on
    // reprend toutes les informations
    this.props.appliedJobs.forEach(i => {
      let emploi = {};

      emplois.forEach(j => {
        if (j.id === i.jobId) {
          emploi.jobTitle = j.jobTitle;
          emploi.company = j.companyTitle;
          emploi.image = j.imgSrc;
        }
      });

      emploi.date = availabilities[i.selectedAvailability].date;

      data.push(emploi);
    });

    return (
      <View style={styles.container}>
        {
          // On load l'ensemble des emplois à partir de data si != 0
          // et on les formatte de facon appropriée à l'aide du
          // custom component AppliedJob
          data.length !== 0 ? (
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.content}>
                <Text style={styles.description}>Voici les emplois que vous avez postulés</Text>
                {
                  data.map((i, key) => (
                    <AppliedJob key={key} 
                      {...i}/>
                  ))
                }
              </View>
            </ScrollView>
          ) : (
            // Sinon, on affiche un message indiquant que l'utilisateur
            // n'a pas encore postulé à un emploi
            <View style={styles.emptyContainer}>
              <Image source={require("../../assets/fogg-no-comments.png")} 
                style={styles.emptyImage}/>

              <Text style={styles.emptyText}>Il ne semble pas que vous avez postulé à des emplois</Text>

              {// Bouton pour rapidement aller à la recherche
               // si on n'a pas postulé à d'emplois
              }
              <Button mode="outlined" 
                onPress={() => this.props.navigation.navigate("Search")}
                theme={{colors: {accent: '#000000', primary: '#000000', border: '#000000'}}}>
                Recherche
              </Button>
            </View>
          )
        }
      </View>
    );
  }
}

// Connecte la variable props.appliedJobs
// à celle du store dans UserReducer
let mapState = store => {
  return {
    appliedJobs: store.UserReducer.appliedJobs
  }
};

export default connect(mapState)(AppliedJobs);

// Contient les styles de page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: "100%",
  },
  emptyContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyImage: {
    height: 300,
    width: 400,
  },
  content: {
    paddingTop: getStatusBarHeight(),
    margin: 20,
  },
  emptyText: {
    maxWidth: 300,
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    marginBottom: 10
  },
  description: {
    color: 'black',
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  }
});