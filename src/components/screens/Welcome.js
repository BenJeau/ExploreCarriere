import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const slides = [
  {
    key: 'somethun',
    title: 'Préparation',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac elementum risus. Mauris in elementum eros, mattis consectetur nunc.',
    image: require('../../assets/fogg-premium-upgrade-1.png'),
    backgroundColor: '#ffffff',
  },
  {
    key: 'somethun-dos',
    title: 'Expérience',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac elementum risus. Mauris in elementum eros, mattis consectetur nunc.',
    image: require('../../assets/fogg-payment-processed-1.png'),
    backgroundColor: '#ffffff',
  },
  {
    key: 'somethun1',
    title: 'Carrière',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac elementum risus. Mauris in elementum eros, mattis consectetur nunc.',
    image: require('../../assets/fogg-success-1.png'),
    backgroundColor: '#ffffff',
  }
];

class Welcome extends React.PureComponent {
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialIcons
          name="keyboard-arrow-right"
          color="rgba(255, 255, 255, .9)"
          size={30}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialIcons
          name="check"
          color="rgba(255, 255, 255, .9)"
          size={30}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  _renderItem = (item) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style= {styles.image} transform={[{scale: 1.2}]}/>
        <View style={{flex: 0.3, marginTop: -120}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <AppIntroSlider slides={slides}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        activeDotStyle={{backgroundColor: '#565656'}}
        onDone={() => this.props.navigation.navigate("LoginNavigator")} />
    );
  }
}

export default connect()(Welcome);

const styles = StyleSheet.create({
  buttonCircle: {
    width: 48,
    height: 48,
    backgroundColor: '#565656',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.63, 
    width: "100%", 
    height: 300, 
    resizeMode: 'contain'
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: 'black',
    marginBottom: 10
  },
  text:{
    textAlign: 'center',
    width: Dimensions.get('screen').width - 80,
    color: 'black',
    fontSize: 15,
  },
  slide: {
    alignItems: 'center',
    flex: 1
  }
});