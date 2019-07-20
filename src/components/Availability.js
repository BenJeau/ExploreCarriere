import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Button, IconButton, Surface } from 'react-native-paper';

// Décrit le format du custom component pour
// une plage de disponbilité
class Availability extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      saved: props.saved
    };
  }

  render() {
    const { hours, date, weekdays, onPress } = this.props;
    const { saved } = this.state;

    return (
      // Affiche date et actions que l'on peut effectuer
      // sur l'item
      <Surface style={styles.container}>
        <View style={styles.contentTop}>
          <View>
            <Text style={styles.title}>{date}</Text>
            <Text style={styles.weekdays}>{weekdays}</Text>
          </View>
          <IconButton size={20}
            icon={'bookmark' + (!saved ? '-border' : '')}
            onPress={() => this.setState({ saved: !saved })} />
        </View>
        <View style={styles.contentBottom}>
          <Text style={styles.hours}>{hours}</Text>
          <Button theme={{ colors: { primary: "#1C88E5" } }}
            onPress={onPress}>Sélectionner</Button>
        </View>
      </Surface>
    );
  }
}

export default Availability;

// Contient les styles du component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 5,
    backgroundColor: 'white',
    width: Dimensions.get("window").width - 30,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingLeft: 15,
    borderRadius: 5,
  },
  contentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
  },
  contentBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 8,
  },
  weekdays: {
    color: 'black',
    fontSize: 16,
  },
  hours: {
    color: 'black',
    paddingBottom: 8,
  }
})