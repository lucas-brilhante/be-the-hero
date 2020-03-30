import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
const logo = require('../../../assets/Logo.png');
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

const HelpIncident = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const incident = route.params.incident;

    const handleBack = () => {
        navigation.goBack();
    }

    const handleSendWhatsapp = async() =>{
        const msg = `Olá, quero ajudar no caso ${incident.title}!`;
        //const phone = '8587754780';
        const phone = '8588140116';
        const url = `whatsapp://send?text=${msg}&phone=55${phone}`;
        await Linking.openURL(url);
    }

    const handleSendMail = async() =>{
        MailComposer.composeAsync({
            recipients: [incident.email],
            subject: `Caso ${incident.title}`,
            body: `Olá, quero ajudar no caso ${incident.title}!`
        });
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <TouchableOpacity onPress={handleBack}>
                    <Feather name='arrow-left' size={18} color='red' />
                </TouchableOpacity>
            </View>
            <View style={styles.incidents}>
                <View style={styles.incidents_info_group}>
                    <View>
                        <Text style={styles.incident_info_bold}>CASO:</Text>
                        <Text style={styles.text}>{incident.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.incident_info_bold}>ONG:</Text>
                        <Text style={styles.text}>{incident.name}</Text>
                    </View>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={styles.incident_info_bold}>DESCRIÇÃO:</Text>
                    <Text style={styles.text}>{incident.description}</Text>
                </View>
                <View>
                    <Text style={styles.incident_info_bold}>VALOR:</Text>
                    <Text style={styles.text}>{
                        Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                            .format(incident.value)}
                    </Text>
                </View>
            </View>
            <View style={styles.incidents}>
                <Text style={styles.h3}>Salve o dia!</Text>
                <Text style={styles.h3}>Seja o heroi desse caso!</Text>
                <Text style={{color: '#737380', marginTop: 20}}>Entre em contato:</Text>
                <View style={styles.button_group}>
                    <TouchableOpacity onPress={handleSendWhatsapp}>
                        <View style={styles.button}>
                            <Text style={styles.button_font}>Whatsapp</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSendMail}>
                        <View style={styles.button}>
                            <Text style={styles.button_font}>Email</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
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
    h3: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 15
    },
    button_group:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop: 20
    },
    button: {
        backgroundColor:'red',
        height: 40,
        width: 100,
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8

    },
    button_font:{
        color: '#fff'
    }
})

export default HelpIncident;