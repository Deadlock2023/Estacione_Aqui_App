import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View,Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring,withTiming } from 'react-native-reanimated';
import { SpeedDial } from 'react-native-elements';
import 'react-native-gesture-handler';

// IMPORT DAS TELAS
import Menu from "./src/screens/Menu";
import FaleConosco from "./src/screens/FaleConosco";
import Login from "./src/screens/Login";
import Cadastro from "./src/screens/Cadastro";
import TelaPrincipal from "./src/screens/TelaInterface";
import LocaisCards from './src/screens/TelaLocais';
import SplachScreen from "./src/screens/Splash";
import VerificarCodigo from "./src/screens/VerificarCodigo";
import RedefinirSenha from "./src/screens/RedefinirSenha";
import EsqueciSenha from "./src/screens/EsqueciSenha";
import TelaMapa from "./src/screens/TelaMapa";
import TelaPerfil from "./src/screens/TelaPerfil";
import TelaEdicao from "./src/screens/TelaEdicao";


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
          backgroundColor: '#191918',
          width: 25,
          height: 25,
          borderRadius: 71.5,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#191918',
        }}
      >
        <Image source={source} style={{ width: 40, height: 20, borderRadius: 30 }} />
        
      </View>
    </Animated.View>
    
  );
};

// Navegação principal com abas
function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={({ route }) => ({
        showLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 40,
          elevation: 0,
          left: 70,
          right: 70,
          backgroundColor: '#191918',
          borderRadius: 30,
          height: 80,
          paddingBottom: 10,
          shadowColor:  'black',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;
          switch (route.name) {
            case 'Perfil':
              iconSource = require('./assets/imgs/PerfilNovo.png');
              break;
            case 'Mapa':
              iconSource = require('./assets/imgs/MapaNovo.png');
              break;
            case 'Locais':
              iconSource = require('./assets/imgs/EstacionamentosNovo.png');
              break;
            default:
              iconSource = null;
          }
          return <TabBarIcon source={iconSource} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Mapa" component={TelaMapa} options={{ headerShown: false }} />
      <Tab.Screen name="Locais" component={LocaisCards} options={{ headerShown: false }} />
      <Tab.Screen name="Perfil" component={TelaPerfil} options={{ headerShown: false }} />
    

    </Tab.Navigator>
  );
}

// Stack Navigator para controlar transições entre telas
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* Telas anteriores do seu app */}
        
        <Stack.Screen name='Splash' component={SplachScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Cadastro' component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} options={{ headerShown: false }}/> 
        <Stack.Screen name='FaleConosco' component={FaleConosco} options={{ headerShown: false }} />
        <Stack.Screen name="Verificar codigo" component={VerificarCodigo} options={{ headerShown: false }}/> 
        <Stack.Screen name="Redefinir Senha" component={RedefinirSenha} options={{ headerShown: false }}/> 
        <Stack.Screen name="TelaEdicao" component={TelaEdicao} options={{ headerShown: false }}/>
        <Stack.Screen name="TelaPerfil" component={TelaPerfil} options={{ headerShown: false }}/> 
        <Stack.Screen name="Fale Conosco" component={FaleConosco} options={{ headerShown: false }}/>
    

        {/* Tela inicial (print que você mandou) */}
       

        {/* Tela com barra de navegação (layout principal do app) */}
        <Stack.Screen name="MainApp" component={MainTabNavigator} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

