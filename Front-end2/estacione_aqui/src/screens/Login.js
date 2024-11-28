import React, { useState } from 'react';
import { 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Pressable, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import Texto from '../components/Texto';

// Configurações iniciais
const largura = Dimensions.get("screen").width;
const altura = Dimensions.get("screen").height;

const fundo_claro = require('../../assets/imgs/FundoCadastrologin.png');
const fundo_escuro = require('../../assets/imgs/fundo_escuro3.jpg');
const logo = require('../../assets/imgs/EstacioneAqui(2).png');

const api = "192.168.137.1";
const servidor = `http://${api}:3292/login`;

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  const verificarLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(servidor, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();
      await AsyncStorage.setItem('userData', data.id);
      await AsyncStorage.setItem('userName', data.usuario);

      navigation.navigate('MainApp');
    } catch (error) {
      Alert.alert('Erro', 'Falha na autenticação. Verifique suas credenciais.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={isDarkMode ? fundo_escuro : fundo_claro} style={styles.img_fundo}>
        <AntDesign 
          style={styles.backIcon} 
          onPress={() => navigation.navigate('Menu')} 
          name="arrowleft" 
          size={30} 
          color={isDarkMode ? 'white' : 'black'} 
        />
        <View style={[styles.view_branca, { backgroundColor:  'white' }]}>
          <Image source={logo} style={styles.logo} />
          <Texto texto="Seja bem-vindo(a) Novamente!" tamanhoFonte={28} corTexto={  'black'} />
          
          <TextInput 
            placeholder="Digite seu Email:" 
            placeholderTextColor={isDarkMode ? '#b0b0b0' : '#7f7f7f'} 
            style={[styles.input, { backgroundColor: isDarkMode ? '#2e2e2e' : '#f5f5f5', color: isDarkMode ? 'white' : 'black' }]} 
            onChangeText={setEmail} 
            value={email} 
          />
          <TextInput 
            placeholder="Digite sua Senha:" 
            placeholderTextColor={ '#7f7f7f'} 
            style={[styles.input]} 
            onChangeText={setSenha} 
            value={senha} 
            secureTextEntry 
          />

          <Pressable onPress={() => navigation.navigate('EsqueciSenha')}>
            <Text style={[styles.forgotPassword]}>Esqueci a senha</Text>
          </Pressable>

          <TouchableOpacity style={styles.button_logar} onPress={verificarLogin}>
            <Texto texto="Login" corTexto="white" tamanhoFonte={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Texto texto="Novo por aqui? " tamanhoFonte={16}  />
          <Text 
            onPress={() => navigation.navigate('Cadastro')} 
            style={[styles.link, { color: isDarkMode ? '#4f9ce2' : 'blue' }]}
          >
            Cadastre-se
          </Text>
        </View>

      
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img_fundo: {
    height: altura,
    width: largura,
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  backIcon: {
    marginTop: 45,
    alignSelf: 'flex-start',
    left: 10,
  },
  view_branca: {
    height: 680,
    width: largura,
    marginTop: 155,
    borderRadius: 60,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    marginTop: -70,
  },
  input: {
    borderWidth: 1,
    height: 60,
    width: '90%',
    textAlign: 'center',
    borderRadius: 30,
    fontSize: 18,
    marginVertical: 10,
  },
  forgotPassword: {
    fontSize: 15,
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: '-20',
    color:'blue'
  },
  button_logar: {
    backgroundColor: '#36295e',
    borderRadius: 30,
    alignItems: 'center',
    width: '70%',
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    marginTop: -220,
  },
  link: {
    fontSize: 16,
  },
  switchMode: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
  },
});

export default Login;
