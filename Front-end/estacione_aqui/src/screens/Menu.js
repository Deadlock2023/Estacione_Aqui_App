import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ImageBackground, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Botao from "../components/Botao";
import Texto from "../components/Texto";
import input from "../components/InputText";
import { Switch } from 'react-native-paper'
import { FaLevelDownAlt } from "react-icons/fa";



const fundo_claro1 = require('../../assets/imgs/fundo_claro1.jpg')
const fundo_escuro1 = require('../../assets/imgs/fundo_escuro1.jpg')


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
      setFonte('white')
      console.log('Dark Mode')
    } else {
      // setModo(fundo_escuro)
      setImagem(fundo_claro1)
      setFonte('#36295e')
      console.log('Light Mode')
      
      
    }
  }





  return (

    <ImageBackground source={imagem} style={{ width: largura, height: altura }}>
      {/* switch */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
        <Texto tamanhoFonte={18} fonte={'opensans'} texto={'Ativar modo escuro'} corTexto={fonte} mt={50}></Texto>
        <Switch value={Modo} style={{ marginTop: 45, marginRight:10, marginLeft:5, transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }} onValueChange={onToggleSwitch} />
        {/* switch */}
      </View>
      <View style={{ alignContent: 'center', alignItems: 'center', height: altura, width: largura, marginTop:50}}>
        <Texto texto={"Estacione Aqui"} fonte={'opensans'} tamanhoFonte={50} mt={150} corTexto={fonte}></Texto>
        <Texto texto={" Bem-vindo(a)!"} fonte={'opensans'} tamanhoFonte={35} corTexto={fonte}></Texto>
        {/* <Text style={{fontSize:40, textAlign:'center', color:'black',  }}>Menu</Text> */}
        <TouchableOpacity style={styles.button_ir} onPress={() => navigation.navigate('Login')}>
          <Texto texto={"Fazer login"} fonte={'opensans'} corTexto={'white'} tamanhoFonte={27} mt={6} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_ir} onPress={() => navigation.navigate('Cadastro')}>
          <Texto texto={"Se cadastrar"} fonte={'opensans'} corTexto={'white'} tamanhoFonte={27} mt={6}></Texto>
        </TouchableOpacity>
        <Text style={[styles.identificar_text2, {alignSelf:'flex-end', top:220, right:10, fontFamily:'opensans'}]}  onPress={()=> navigation.navigate('FaleConosco')}>(Fale Conosco)</Text>



      </View>
    </ImageBackground>




  );
}
const styles = StyleSheet.create({
  button_ir: {
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: '#36295e',
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    height: 50,
    marginTop: 20,




  },




})


