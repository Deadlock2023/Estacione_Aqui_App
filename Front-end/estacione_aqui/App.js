import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import 'react-native-gesture-handler';

// IMPORT DAS TELAS
import Menu from "./src/screens/Menu";
import FaleConosco from "./src/screens/FaleConosco";
import Login from "./src/screens/Login";
import Cadastro from "./src/screens/Cadastro";
import TelaPrincipal from "./src/screens/TelaPrincipal";
import MapScreen from './src/screens/TelaMapa'; // Tela Mapa
import SettingsScreen from './src/screens/TelaPerfil';
import HomeScreen from './src/screens/TelaHome';


// Criando o Tab Navigator para a parte inferior da tela
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Ícones animados para o Tab Navigator
const TabBarIcon = ({ focused, source }) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  React.useEffect(() => {
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
    <Animated.View style={animatedStyle}>
      <View
        style={{
          backgroundColor: 'black',
          width: 40,
          height: 40,
          borderRadius: 71.5,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'black',
        }}
      >
        <Image source={source} style={{ width: 30, height: 30, backgroundColor: 'black', borderRadius: 30 }} />
      </View>
    </Animated.View>
  );
};

// Navegação principal com abas
function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Mapa"
      screenOptions={({ route }) => ({
        showLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          elevation: 0,
          left: 20,
          right: 20,
          backgroundColor: 'black',
          borderRadius: 15,
          height: 70,
          paddingBottom: 10,
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;
          switch (route.name) {
            case 'Perfil':
              iconSource = require('./assets/imgs/Perfil3.png');
              break;
            case 'Mapa':
              iconSource = require('./assets/imgs/carro.png');
              break;
            case 'Home':
              iconSource = require('./assets/imgs/home.png');
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
  );
}

// Stack Navigator para controlar transições entre telas
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
        {/* Telas anteriores do seu app */}
        <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Cadastro' component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name='FaleConosco' component={FaleConosco} options={{ headerShown: false }} />
    

        {/* Tela inicial )*/}
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} options={{ headerShown: false }} />

        {/* Tela com barra de navegação (layout principal do app) */}
        <Stack.Screen name="MainApp" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
