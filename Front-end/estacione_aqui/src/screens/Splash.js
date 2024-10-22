import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";
import Botao from '../components/Botao';
import Texto from '../components/Texto';
import input from '../components/InputText';
import { Switch } from 'react-native-paper'




const largura = Dimensions.get("screen").width

const altura = Dimensions.get("screen").height

// const fundo = require('../../assets/imgs/fundo.png')
// const fundo_marrom = require('../../assets/imgs/fundomarrom.jpg')

const fundo_claro3 = require('../../assets/imgs/fundo_claro3.jpg')
const fundo_escuro3 = require('../../assets/imgs/fundo_escuro3.jpg')




const Splash = () => {
  const [fontsLoaded] = useFonts({
    'opensans': require('../../assets/fonts/opensans.ttf'),

  });



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




  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground source={imagem} style={styles.img_fundo}>
        <View style={[styles.view_login, {backgroundColor:CorView}]} >




          <Text style={styles.identificar_text2} onPress={() => navigation.navigate('Menu')}>(Voltar ao início)</Text>
          <Switch value={Modo} onValueChange={onToggleSwitch} />

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
    width: 250,
    textAlign: 'center',
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: '#f5f5f5',
    fontSize: 20,
    borderColor: 'gray'


  },
  button_logar: {
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: '#1a90d9',
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    height: 50,
    marginTop: 20,
  }



});

export default Splash