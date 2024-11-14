// TelaPrincipal.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './TelaMapa';
import SettingsScreen from './TelaPerfil';
import HomeScreen from './TelaHome';

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
    if (horaAtual >= 6 && horaAtual < 12) return 'Bom dia';
    else if (horaAtual >= 12 && horaAtual < 18) return 'Boa tarde';
    else return 'Boa noite';
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
      <Tab.Navigator
        initialRouteName="Mapa"
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 30,
            backgroundColor: 'black',
            borderRadius: 15,
            height: 100,
            width: largura,
          },
          tabBarIcon: ({ focused }) => {
            let iconSource;
            switch (route.name) {
              case 'Perfil':
                iconSource = require('../../assets/imgs/home.png');
                break;
              case 'Mapa':
                iconSource = require('../../assets/imgs/carro.png');
                break;
              case 'Home':
                iconSource = require('../../assets/imgs/Perfil3.png');
                break;
              default:
                iconSource = null;
            }
            return <TabBarIcon source={iconSource} focused={focused} />;
          },
        })}
      >
        <Tab.Screen name="Perfil" component={SettingsScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Mapa" component={MapScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8c8c8',
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
    color: '#a14141',
    fontSize: 25,
  },
  timeText: {
    color: '#d33232',
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
    color: '#ff4c4c',
  },
  viewcima: {
    backgroundColor: '#230d66',
    width: largura,
    alignItems: 'center',
    flexDirection: "row",
    height: 70,
    top: -195,
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
});

export default TelaPrincipal;
