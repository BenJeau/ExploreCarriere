import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AppliedJob from '../AppliedJob';

class AppliedJobs extends React.PureComponent {

  render() {
    let hasInfo = false;
    let data = [
      {
        image: require("../../assets/BioCanada.jpg"),
        jobTitle: "Nom de l'emploi",
        company: "Compagnie",
        date: "Date"
      },
      {
        image: require("../../assets/BioCanada.jpg"),
        jobTitle: "Nom de l'emploi",
        company: "Compagnie",
        date: "Date"
      },
    ];

    return (
      <View style={styles.container}>
        {
          hasInfo ? (
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
            <View style={styles.emptyContainer}>
              <Image source={require("../../assets/fogg-no-comments.png")} 
                style={styles.emptyImage}/>

              <Text style={styles.emptyText}>Il ne semble pas que vous avez postulé à des emplois</Text>

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

export default connect()(AppliedJobs);

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