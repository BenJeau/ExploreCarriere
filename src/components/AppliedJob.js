import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import { Surface } from 'react-native-paper';

class AppliedJob extends React.PureComponent {
    render() {
        const { image, jobTitle, company, date } = this.props;

        return (
            <Surface style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={image} style={styles.image} />
                </View>
                <View style={styles.left}>
                    <View>
                        <Text style={styles.jobTitle}>{jobTitle}</Text>
                        <Text style={styles.company}>{company}</Text>
                    </View>
                    <View>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                </View>
            </Surface>
        );
    }
}

export default AppliedJob;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        flexDirection: 'row',
    },
    image: {
        borderRadius: 10,
        height: 100,
        width: 100,
    },
    imageContainer: {
        elevation: 5,
        borderRadius: 10,
        marginRight: 10
    }, 
    left: {
        justifyContent: 'space-between',
        marginVertical: -5
    },
    jobTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 8,
    },
    company: {
        color: 'black',
        fontSize: 16,
    },
    date: {
        color: 'black',
        paddingBottom: 8,
    }
})