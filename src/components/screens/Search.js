import React from 'react';
import { StyleSheet, View, Dimensions, Text, Image, Platform, StatusBar, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker, Callout } from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB, Button, Dialog, Portal } from 'react-native-paper';
import Touchable from 'react-native-platform-touchable';
import Geolocation from '@react-native-community/geolocation';

const coorData = [
    {
        jobTitle: 'Wow',
        companyTitle: 'Its working now!',
        latlng: {
            latitude: 45.425871,
            longitude: -75.682337
        }
    }
]

class Popover extends React.PureComponent {
    render() {
        const { jobTitle, companyTitle } = this.props;
        return (
            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, borderWidthRadius: 1, marginBottom: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{jobTitle}</Text>
                <Text>{companyTitle}</Text>
            </View>
        )
    }
}


class Search extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            query: ""
        }
    }
    componentDidMount() {
        setTimeout(() =>
            Geolocation.getCurrentPosition(info => this.map.animateToRegion({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0021,
            }, 300)), 10)
    }

    showModal = () => {
        this.setState({ modalVisible: true });
        Keyboard.dismiss();
    }

    dismissModal = () => {
        this.setState({ modalVisible: false });
    }

    render() {
        const { modalVisible, query } = this.state;

        return (
            <View style={styles.container}>
                <MapView style={styles.container}
                    showsUserLocation
                    showsCompass={false}
                    showsMyLocationButton={false}
                    ref={i => this.map = i}
                    initialRegion={{
                        latitude: 45.422540,
                        longitude: -75.682979,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0021,
                    }}>
                    {
                        coorData.filter(i => i.jobTitle.toLowerCase().includes(query.toLowerCase()) || i.companyTitle.toLowerCase().includes(query.toLowerCase())).map((marker, key) =>
                            <Marker key={key}
                                coordinate={marker.latlng}>
                                <Callout tooltip
                                    onPress={() => { this.props.navigation.navigate("JobDetail") }}>
                                    <Popover {...marker} />
                                </Callout>
                            </Marker>
                        )
                    }
                </MapView>

                <FAB style={styles.fab}
                    icon={({ size, color }) => (
                        <MaterialCommunityIcons size={size} color={color} name="filter" />
                    )}
                    onPress={this.showModal} />

                <View style={styles.topSearch}>

                    <Touchable background={Touchable.Ripple('#90909040', false)} onPress={() => this.searchInput.isFocused() ? this.searchInput.blur() : this.searchInput.focus()}>
                        <View style={styles.topContent} >
                            <TextInput ref={i => this.searchInput = i} style={styles.text} placeholder="Rechercher un emploi" onChangeText={(query) => this.setState({ query })}
                                value={query} />
                            <MaterialIcons size={23} color="#000000" name='search' />
                        </View>
                    </Touchable>
                </View>

                <Portal>
                    <Dialog
                        visible={modalVisible}
                        onDismiss={this.dismissModal}>
                        <Dialog.Title style={{ color: '#c74b4b' }}>Filtrer les emplois</Dialog.Title>
                        <Dialog.Content>
                            <View style={{}}>
                                <Text>Domaine</Text>
                                <Text>Durée</Text>
                                <Text>Dates</Text>
                            </View>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={this.dismissModal} color="#808080">Annuler</Button>
                            <Button onPress={this.dismissModal}>Filtrer</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}

export default connect()(Search);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    text: {
        color: 'black',
    },
    topSearch: {
        margin: 15,
        position: 'absolute',
        marginTop: getStatusBarHeight() + 10,
        height: 50,
        width: Dimensions.get("screen").width - 30,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        elevation: 5,
    },
    topContent: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        height: '100%'
    }
});
