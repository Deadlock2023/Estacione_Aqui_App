// src/components/TelaPrincipal.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Coloque sua chave de API aqui
const API_KEY = 'ba605efc18f1572f61892fe426f18a1a';


const TelaPrincipal = () => {
    const [login, setUsuario] = useState('');
const [email, setEmail] = useState('');



  useEffect(() => {
    const fetchUserData = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const userData = JSON.parse(data);
        console.log(userData); 
        setUsuario(userData.login); 
       
      }
    };

    fetchUserData();
}, []);

    const navigation = useNavigation();
    
    // Estado para o horário atual
    const [horario, setHorario] = useState('');
    // Estado para a temperatura atual
    const [temperatura, setTemperatura] = useState(null);

    // Função para atualizar o horário
    const updateTime = () => {
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        const seconds = String(currentTime.getSeconds()).padStart(2, '0');
        setHorario(`${hours}:${minutes}:${seconds}`);
    };

    // Função para obter a temperatura atual
    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Presidente%20Prudente,br&units=metric&appid=${API_KEY}`);
            const data = await response.json();
            if (response.ok) {
                setTemperatura(data.main.temp);
            } else {
                Alert.alert("Erro", "Não foi possível obter a temperatura.");
            }
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao buscar a temperatura.");
        }
    };

    useEffect(() => {
        updateTime(); // Atualiza a hora inicial
        const intervalId = setInterval(updateTime, 1000); // Atualiza a cada segundo
        
        fetchWeather(); // Busca a temperatura ao montar o componente
        
        // Função de limpeza para limpar o intervalo quando o componente desmonta
        return () => clearInterval(intervalId);
    }, []);

    // Variáveis de animação
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    // Função de animação e navegação
    const handlePress = () => {
        scale.value = withTiming(2, { duration: 500 });
        opacity.value = withTiming(0, { duration: 500 });

        setTimeout(() => {
            navigation.navigate('MainApp'); // Navega para o layout principal (App.js)
        }, 500);
    };

    return (
        <View style={styles.container}>
            {/* Saudação */}
            <Text style={styles.greeting}>BOM DIA,{login ? login : 'Carregando...'}</Text>

            {/* Localização e Hora */}
            <View style={styles.locationContainer}>
                <Text style={styles.locationText}>Presidente Prudente</Text>
                <Text style={styles.timeText}>{horario}</Text>

            </View>

            {/* Mapa com comportamento de clique */}
            <TouchableWithoutFeedback onPress={handlePress}>
                <Animated.View style={[styles.mapContainer, animatedStyle]}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: -22.1256,
                            longitude: -51.3889,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: -22.1256, longitude: -51.3889 }}
                            title="Presidente Prudente"
                            description="Clique para abrir o app"
                        />
                    </MapView>
                </Animated.View>
            </TouchableWithoutFeedback>

            {/* Informações Climáticas */}
            <View style={styles.weatherInfo}>
                <Text style={styles.largeTemperatureText}>{temperatura !== null ? `${temperatura}°C` : 'Carregando...'}</Text>
                <View style={styles.forecast}>
                    
                    
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#012943', // Fundo azul
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    greeting: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 50,
    },
    locationContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    locationText: {
        color: 'white',
        fontSize: 24,
    },
    timeText: {
        color: 'white',
        fontSize: 20,
        marginTop: 10,
    },
    temperatureText: {
        color: 'white',
        fontSize: 20,
        marginTop: 5,
    },
    mapContainer: {
        width: '100%',
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    weatherInfo: {
        marginTop: 30,
        alignItems: 'center',
    },
    largeTemperatureText: {
        fontSize: 48,
        color: 'white',
        fontWeight: 'bold',
    },
    forecast: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    forecastText: {
        color: 'white',
        fontSize: 18,
    },
});

export default TelaPrincipal;
