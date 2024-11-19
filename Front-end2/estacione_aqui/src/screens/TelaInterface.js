// TelaPrincipal.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './TelaMapa';
import SettingsScreen from './TelaPerfil';
import locaisCards from './TelaLocais';

const largura = Dimensions.get('screen').width;

const Tab = createBottomTabNavigator();  

const TabBarIcon = ({ focused, source }) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  
  useEffect(() => {
    scale.value = withSpring(focused ? 2 : 1, {
      damping: 2,
      stiffness: 150,
    });
    translateY.value = withSpring(focused ? -10 : 0, {
      damping: 2,
      stiffness: 150,
    });
  }, [focused]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Animated.Image
      source={source}
      style={[{ width: 30, height: 30 }, animatedStyle]}
      resizeMode="contain"
    />
  );
};

const TelaPrincipal = () => {
  const [login, setUsuario] = useState('');
  const [horario, setHorario] = useState('');
  const [temperatura, setTemperatura] = useState(null);
  const navigation = useNavigation();
  const API_KEY = 'ba605efc18f1572f61892fe426f18a1a';

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const userData = JSON.parse(data);
        setUsuario(userData.login); 
      }
    };
    fetchUserData();
  }, []);

  const updateTime = () => {
    const currentTime = new Date();
    setHorario(`${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`);
  };

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
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    fetchWeather();
    return () => clearInterval(intervalId);
  }, []);

  const saudacao = () => {
    const horaAtual = new Date().getHours();
    if (horaAtual >= 6 && horaAtual < 12) return 'Bom Dia';
    else if (horaAtual >= 12 && horaAtual < 18) return 'Boa Tarde';
    else return 'Boa Noite';
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewcima}>
        <Text style={styles.textcima}>Estacione Aqui</Text>
      </View>
      <View style={styles.viewsaudacao}>
        <Text style={styles.saudacaotext}> {`${saudacao()}, ${login ? login : 'Carregando...'}`}!</Text>
      </View>
      <View style={styles.localhorarioview}>
        <Text style={styles.locationText}>Presidente Prudente, </Text>
        <Text style={styles.timeText}>{horario}</Text>
      </View>
      <View style={styles.weatherInfo}>
        <Text style={styles.largeTemperatureText}>{temperatura !== null ? `${temperatura}°C` : 'Carregando...'}</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b31d1d',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 70,
  },
  saudacaotext: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 50,
  },
  localhorarioview: {
    alignItems: 'center',
    flexDirection: 'row',
    top: -150,
  },
  locationText: {
    color: '#efff14',
    fontSize: 25,
  },
  timeText: {
    color: '#18f7ff',
    fontSize: 25,
  },
  mapContainer: {
    width: '100%',
    height: 200,
    top: -130,
  },
  weatherInfo: {
    alignItems: 'center',
    top: -135,
  },
  largeTemperatureText: {
    fontSize: 25,
    color: '#3c3ce9',
  },
  viewcima: {
    backgroundColor: '#490dfd',
    width: largura,
    alignItems: 'center',
    flexDirection: "row",
    height: 70,
    top: -10,
    justifyContent: 'center',
  },
  textcima: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 30,
    top: 100,
  },
  viewsaudacao: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -140,
  },
  tabnav:{
    backgroundColor:"#f10a0a"
  }
});

export default TelaPrincipal;
