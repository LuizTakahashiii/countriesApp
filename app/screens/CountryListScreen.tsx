import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SectionList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const CountryListScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [countries, setCountries] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            setCountries(sortedData);
        };

        fetchCountries();
    }, []);

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedCountries = filteredCountries.reduce((acc, country) => {
        const continent = country.continents[0];
        if (!acc[continent]) {
            acc[continent] = [];
        }
        acc[continent].push(country);
        return acc;
    }, {});

    const sections = Object.keys(groupedCountries).map(continent => ({
        title: continent,
        data: groupedCountries[continent],
    }));

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por nome do país..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.cca3}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: '/screens/CountryDetailScreen',
                                params: { country: JSON.stringify(item) },
                            })
                        }
                    >
                        <View style={styles.countryContainer}>
                            <Image source={{ uri: item.flags.png }} style={styles.flag} />
                            <View style={styles.countryDetails}>
                                <Text style={styles.countryName}>{item.name.common}</Text>
                                <Text style={styles.countryInfo}>{item.name.official}</Text>
                                <Text style={styles.countryInfo}>{item.capital ? item.capital[0] : 'Sem Capital'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    searchContainer: {
        paddingTop: 40,
        paddingHorizontal: 10,
        backgroundColor: '#1A1A1A',
    },
    searchInput: {
        backgroundColor: '#2E2E2E',
        color: '#FFF',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    countryContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    flag: {
        width: 50,
        height: 30,
        marginRight: 10,
    },
    countryDetails: {
        justifyContent: 'center',
    },
    countryName: {
        fontSize: 16,
        color: '#4CAF50',
    },
    countryInfo: {
        fontSize: 14,
        color: '#CCCCCC',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#2E2E2E',
        color: '#4CAF50',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});

export default CountryListScreen;
