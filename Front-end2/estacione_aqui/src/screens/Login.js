import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Botao from '../components/Botao';
import Texto from '../components/Texto';
import input from '../components/InputText';
import { Switch } from 'react-native-paper'
import Input from '../components/InputText';
import { AntDesign } from '@expo/vector-icons';
import TelaPrincipal from './TelaInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EsqueciSenha from './EsqueciSenha';
import TelaPerfil from './TelaPerfil';





const api = "10.111.9.55"

const largura = Dimensions.get("screen").width

const altura = Dimensions.get("screen").height

// const fundo = require('../../assets/imgs/fundo.png')
// const fundo_marrom = require('../../assets/imgs/fundomarrom.jpg')

const fundo_claro3 = require('../../assets/imgs/FundoCadastrologin.png')
const fundo_escuro3 = require('../../assets/imgs/fundo_escuro3.jpg')
const logo = require('../../assets/imgs/EstacioneAqui(2).png')

const servidor = `http://${api}:3292/login`
  


const Login = () => {
  const navigation = useNavigation();
  // const [fontsLoaded] = useFonts({
  //   'opensans': require('../../assets/fonts/opensans.ttf'),

  // });
    
  const [imagem, setImagem] = useState(fundo_claro3);
  const [Modo, setModo] = useState(false);
  let [fonte, setFonte] = useState('#04588c')
  let [CorView, setCorview] = useState('#c7c7c7')

  const onToggleSwitch = () => {
    setModo(!Modo)
    if (Modo == false){
      setImagem(fundo_escuro3)
      setFonte('white')
      setCorview('#bdb9b9')
      console.log('Light Mode')
    } else {
      // setModo(fundo_escuro)
      setImagem(fundo_claro3)
      setCorview('#c7c7c7')
      setFonte('#5a5a5a')
      console.log('Dark Mode')
    }
  }
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const route = useRoute;
   

    function EsqueciSenha(){
      navigation.replace('EsqueciSenha');
    }

    const verificarLogin = async (login, senha) => {
      try {
        const response = await fetch(servidor, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login, senha }),
        });
    
        if (!response.ok) {
          throw new Error('Credenciais inválidas');
        }
    
        const data = await response.json();
    
        // Salva os dados do usuário localmente
        await AsyncStorage.setItem('userData', JSON.stringify({ login: data.login }));
    
        // Navega para a TelaPrincipal
        navigation.navigate('MainApp');
      } catch (error) {
        alert("Falha na autenticação, digite a senha ou email corretamente!");
      }
    };
   

  return (
    <View style={styles.container}>
      <ImageBackground source={imagem} style={styles.img_fundo}>
    <AntDesign style={{marginTop:45,alignSelf:'flex-start',left:2  }} onPress={() => navigation.navigate('Menu')} name="arrowleft"  size={30} color="black" />
    <View style={styles.view_branca}>
      <Image source={logo} onPress={()=> navigation.navigate('Menu')} style={{height:150, width:150,marginTop:-70, }}/>

    
      <Texto texto={'Seja bem-vindo(a) Novamente!\n'}   tamanhoFonte={40} />
      <TextInput placeholder='Digite seu Login:' style={[styles.input, {marginTop:-20}]} onChangeText={setLogin} value={login} />
      <TextInput placeholder='Digite sua Senha:' style={[styles.input, {marginTop:25}]}onChangeText={setSenha} value={senha} />
      <Pressable onPress={EsqueciSenha}>
            <Text style={{color:'blue', fontSize:15, left:-100,top:10,}}>Esqueci a senha</Text>
        </Pressable>
    <TouchableOpacity style={styles.button_logar}  onPress={()=>verificarLogin(login, senha)} >
    <Texto texto={'Login'} mt={10} corTexto={'white'} tamanhoFonte={25}  />
    </TouchableOpacity>
    </View>
    <View style={{flexDirection:'row', marginTop:-185}}>
          <Texto texto={'Novo por aqui? '} tamanhoFonte={18} />
        <Text onPress={()=> navigation.navigate('Cadastro')} style={{color:'blue', fontSize:18}}>Cadastre-se</Text>
        
        
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  view_login: {
    border: 10,
    borderRadius: 40,
    backgroundColor: '#c7c7c7',
    marginTop: 120,
    height: 550,
    width: 360,
    alignItems: 'center',

  },

  login_text: {
    alignItems: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: "center",


  },
  img_fundo: {
    height: altura,
    width: largura,
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',


  },
  identificar_text2: {
    fontSize: 20,
    marginTop: 15,
    color: 'blue'
  },
  text_login: {
    fontSize: 35,
    marginTop: 15,

  },
  text: {
    fontSize: 35,

    marginTop: 15,
  },
  input: {
    borderWidth: 3,
    height: 60,
    width: 350,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    fontSize: 20,
    borderColor: 'transparent',
  

  },
  button_logar: {
    alignItems: 'center',
    backgroundColor: '#36295e',
    borderRadius: 50,
    alignItems: 'center',
    width: 250,
    height: 60,
    marginTop: 25,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0, height: 2
    

  },
  shadowOpacity: 0.25,
  shadowRadius: 8,
  elevation: 5
  

  },

  view_branca:{
    backgroundColor:'white',

    height:680,
    width:largura,
    marginTop:155,
    borderRadius:60,
   alignItems:'center',
    
  },
  

});

export default Login