import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ImageBackground, useColorScheme,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Botao from "../components/Botao";
import Texto from "../components/Texto";
import input from "../components/InputText";
import { Switch } from 'react-native-paper'
import { FaLevelDownAlt } from "react-icons/fa";
import { processFontFamily } from "expo-font";



const fundo_claro1 = require('../../assets/imgs/FundoDark.png')
const fundo_escuro1 = require('../../assets/imgs/FundoLight.png')
const logo = require('../../assets/imgs/EstacioneAqui(2).png')


  // const [fontsLoaded] = useFonts({
  //   'opensans': require('../../assets/fonts/opensans.ttf'),

  // });
    // 

const largura = Dimensions.get('screen').width

const altura = Dimensions.get('screen').height

export default function Menu() {
  const navigation = useNavigation()


  const [imagem, setImagem] = useState(fundo_claro1);
  const [Modo, setModo] = useState(false);
  let [fonte, setFonte] = useState('#36295e')
  

  const onToggleSwitch = () => {
    setModo(!Modo)
    if (Modo == false) {
      setImagem(fundo_escuro1)
      setFonte('#36295e')
      console.log('Dark Mode')
    } else {
      // setModo(fundo_escuro)
      setImagem(fundo_claro1)
      setFonte('white')
      console.log('Light Mode')
      
      
    }
  }





  return (

    <ImageBackground source={imagem} style={{ width: largura, height: altura }}>
      {/* switch */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
        <Texto tamanhoFonte={18}  texto={'Ativar modo escuro'} corTexto={"black"} mt={55}></Texto>
        <Switch value={Modo} style={{ marginTop: 45, marginRight:1, marginLeft:-5, transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }} onValueChange={onToggleSwitch} />
        {/* switch */}
      </View>
      <View style={{ alignContent: 'center', alignItems: 'center', height: altura, width: largura, marginTop:50}}>
      <Image source={logo} style={{ height: 200, width: 200, bottom:-90, }} />
       
        <TouchableOpacity style={styles.button_ir2} onPress={() => navigation.navigate('Login')}>
          <Texto texto={"Fazer login"}  corTexto={'black'} tamanhoFonte={27} mt={6} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_ir} onPress={() => navigation.navigate('Cadastro')}>
          <Texto texto={"Se cadastrar"}  corTexto={'white'} tamanhoFonte={27} mt={6}></Texto>
        </TouchableOpacity>
        <Text style={[styles.identificar_text2, {alignSelf:'flex-end', top:120, right:10,}]}  onPress={()=> navigation.navigate('FaleConosco')}>(Fale Conosco)</Text>



      </View>
    </ImageBackground>




  );
}
const styles = StyleSheet.create({
  button_ir: {
    
    alignItems: 'center',
    backgroundColor: '#36295e',
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    height: 50,
    marginTop: 25,
    top:100,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0, height: 2
    

  },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 5
  




  },
  button_ir2: {
    
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    height: 50,
    marginTop: 25,
    top:100,
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 9,
    

  },
  shadowOpacity:  0.5,
  shadowRadius: 9.22,
  elevation: 12
  
    }




})


