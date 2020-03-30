import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

const logo = require('../../../assets/Logo.png');

var fetching = true;

const Home = () => {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total_incidents, setTotalIncidents] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    const handleNavigation = (incident) => {
        navigation.navigate('HelpIncident', { incident });
    }

    const getIncidents = async () => {
        const response = await api.get(`user_login/1`);
        setTotalIncidents(response.headers['x-incidents-count'])
        setIncidents(response.data);
    }

    const handleReach = async () => {
        const length = incidents.length;
        const page = 1 + parseInt(length / 5);
        if (length < 5) {
            console.log('menor que 5 incidents')
            return;
        }

        if (length >= total_incidents) {
            console.log('tamanho máximo')
            return;
        }
        setIsFetching(true);
        const response = await api.get(`user_login/${page}`);
        const newa = [...incidents, ...response.data];
        setIncidents(newa);
        setIsFetching(false);
    }

    useEffect(() => {
        getIncidents();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <Text>Total de {total_incidents} {total_incidents > 1 ? 'casos' : 'caso'}</Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.text}>Escolha um dos casos abaixo e salve o dia.</Text>
            <FlatList
                style={styles.incidents_list}
                data={incidents}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={() => {
                    console.log('trigge')
                    if (fetching === false) {
                        handleReach();
                        fetching = true;
                    }else
                        console.log('blocked')
                }}
                onMomentumScrollBegin={() => {
                    fetching = false;
                }}
                onEndReachedThreshold={0.2}
                renderItem={({ item }) => (
                    <View style={styles.incidents}>
                        <View style={styles.incidents_info_group}>
                            <View>
                                <Text style={styles.incident_info_bold}>CASO:</Text>
                                <Text style={styles.text}>{item.title}</Text>
                            </View>
                            <View>
                                <Text style={styles.incident_info_bold}>ONG:</Text>
                                <Text style={styles.text}>{item.name}</Text>
                            </View>
                        </View>
                        <Text style={styles.incident_info_bold}>VALOR:</Text>
                        <Text style={styles.text}>{
                            Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                .format(item.value)
                        }</Text>
                        <TouchableOpacity onPress={() => handleNavigation(item)}>
                            <View style={styles.icon_group}>
                                <Text style={{ color: 'red' }}>Ver mais detalhes</Text>
                                <Feather name='arrow-left' size={18} color='red' />
                            </View>
                        </TouchableOpacity>
                    </View>
                )
                }
            />
            {isFetching &&
                <ActivityIndicator style={{ margin: 4 }} size="small" color="#00ff00" />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 10,
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: '#F0F0F5'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20
    },
    text: {
        color: '#737380',
    },
    incidents_list: {
        marginTop: 20
    },
    incidents: {
        backgroundColor: '#fff',
        marginBottom: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    incidents_info_group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    incident_info_bold: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    icon_group: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

});

export default Home;