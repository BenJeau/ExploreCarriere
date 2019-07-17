import React from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import {Button, Headline, Text, Title, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import jobInfo from '../../data/emplois';
import LinearGradient from "react-native-linear-gradient";

class JobDetail extends React.PureComponent {
  render() {
    let jobId = 1;
    let selectedJobInfo = jobInfo.find(item => item.id === jobId);

    console.log(this.props);

    const locationIcon = <Icon name="location-on" size={30} color="black" />;
    const dateIcon = <Icon name="date-range" size={30} color="black" />;
    const timeIcon = <Icon name="access-time" size={30} color="black" />;
    const timeWhiteIcon = <Icon name="access-time" size={30} color="white" />;
    const moneyIcon = <Icon name="attach-money" size={30} color="black" />;

    return (
      <View style={styles.container}>

        <View style={styles.contentPane}>
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
              title={selectedJobInfo.cost}
              style={styles.listElement}
              left={() => moneyIcon}
            />
            <ScrollView
              style={styles.scrollViewStyle}
            >
              <Text
                style={styles.jobDescription}
              >
                {selectedJobInfo.textDescription}
              </Text>
            </ScrollView>
          </View>
        </View>

        <Button
          onPress={() => this.props.navigation.navigate("Availabilities")}
          style={styles.availabilitiesButton}
          mode = 'contained'
          dark = {true}
        >
          Disponibilités
        </Button>

      </View>
    );
  }
}

export default connect(store => ({jobId : store.jobId}))(JobDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getStatusBarHeight()
  },
  availabilitiesButton: {
    width: '90%',
    backgroundColor: '#1f88e5',
    marginTop: 50,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    elevation: 3
  },
  contentPane: {
    height: '80%',
    width: '95%',
    paddingHorizontal: 10
  },
  companyBanner: {
    height: '40%',
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    marginBottom: 10,
    justifyContent: 'flex-end'
  },
  companyBannerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    borderRadius: 20,
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
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 22,
  },
  scrollViewStyle: {
    marginTop: 10,
    height: 200
  }
});