import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const CountryDetailScreen = () => {
    const { country } = useLocalSearchParams();
    const countryData = JSON.parse(country as string);

    return (
        <View style={styles.container}>
            <Image source={{ uri: countryData.flags.png }} style={styles.flag} />
            <Text style={styles.title}>{countryData.name.common}</Text>
            <Text style={styles.subTitle}>{countryData.name.official}</Text>
            <Text style={styles.detail}>Capital: {countryData.capital ? countryData.capital[0] : 'Sem Capital'}</Text>
            <Text style={styles.detail}>Região: {countryData.region}</Text>
            <Text style={styles.detail}>Sub-região: {countryData.subregion}</Text>
            <Text style={styles.detail}>População: {countryData.population.toLocaleString()}</Text>
            <Text style={styles.detail}>Área: {countryData.area.toLocaleString()} km²</Text>
            <Text style={styles.detail}>Moeda: {Object.keys(countryData.currencies).join(', ')}</Text>
            <Text style={styles.detail}>Idiomas: {Object.values(countryData.languages).join(', ')}</Text>
            <Text style={styles.detail}>Latitude: {countryData.latlng[0]}</Text>
            <Text style={styles.detail}>Longitude: {countryData.latlng[1]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flag: {
        width: 150,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 18,
        color: '#CCCCCC',
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 5,
    },
});

export default CountryDetailScreen;
