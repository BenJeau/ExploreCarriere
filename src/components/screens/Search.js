import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB } from 'react-native-paper';
import Touchable from 'react-native-platform-touchable';

class Search extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.container}
                    initialRegion={{
                        latitude: 45.422540,
                        longitude: -75.682979,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0021,
                    }} />

                <FAB style={styles.fab}
                    icon={({ size, color }) => (
                        <MaterialCommunityIcons size={size} color={color} name="filter" />
                    )}
                    onPress={() => console.log('Pressed')} />
                <View style={styles.topSearch}>
                    <Touchable background={Touchable.Ripple('#90909040', false)}
                        onPress={() => {this.props.navigation.navigate("JobDetail")}}>
                        <View style={styles.topContent} >
                            <Text style={styles.text}>Rechercher un emploi</Text>
                            <MaterialIcons size={23} color="#000000" name='search' />
                        </View>
                    </Touchable>
                </View>
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
