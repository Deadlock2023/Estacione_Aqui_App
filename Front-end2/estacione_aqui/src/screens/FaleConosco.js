import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet,Text, View, Dimensions, TextInput, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";
import Botao from '../components/Botao';
import Texto from '../components/Texto';
import input from '../components/InputText';
import { Switch } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';


const largura = Dimensions.get("screen").width

const altura = Dimensions.get("screen").height



const X = require('../../assets/imgs/X.webp')
const Zap = require('../../assets/imgs/Whatsapp.png')
const Insta = require('../../assets/imgs/Instagram.png')
const Icone = require('../../assets/imgs/EstacioneAqui(2).png')
// const Background = require('../../assets/imgs/Fundo.jpg')
const fundo_claro4 = require('../../assets/imgs/fundo_claro4.jpg')
const fundo_escuro4 = require('../../assets/imgs/fundo_escuro4.jpg')



const FaleConosco = () => {
    const [fontsLoaded] = useFonts({
      
  
    });
    
    const [imagem, setImagem] = useState(fundo_claro4);
    const [Modo, setModo] = useState(false);
  
  
    const onToggleSwitch = () => {
      setModo(!Modo)
      if (Modo == false){
        setImagem(fundo_escuro4)
        console.log('Light Mode')
      } else {
        // setModo(fundo_escuro)
        setImagem(fundo_claro4)
        console.log('Dark Mode')
      }
    }


    const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground source={imagem} resizeMode="cover" style={styles.FundoImagem}>
      <View style={styles.container2}>

      <AntDesign style={{alignSelf:'flex-start',right:45  }} onPress={() => navigation.navigate('Menu')} name="arrowleft"  size={30} color="black" />
        <Image style={styles.IconeApp} source={Icone}/>
        <View style={styles.container3}>
        <Text style={styles.textoTitulo}>Fale Conosco</Text>
        <Text style={{fontSize:15,fontWeight: 'bold'}}>Nossas Redes Sociais para contato</Text>
        </View>
      </View>

          <View style={styles.contatos}>
            
            <Text style={{fontSize:30, color:'white', fontWeight:'bold'}}>Whatsapp </Text><Image style={styles.imagem} source={Zap}/>
           
          </View>

          <View style={styles.contatos}>
            <Text style={{fontSize:30,color:'white', fontWeight:'bold'}}>Instagram </Text><Image style={styles.imagem} source={Insta}/>
          </View>
    
          <View style={styles.contatos}>
            <Text style={{fontSize:30,color:'white', fontWeight:'bold'}}>Twitter       </Text>
            <Image style={styles.imagem} source={X}/>
            
        
        
          
         
       
            <Text></Text>
          </View>
          </ImageBackground>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:-150

    
  },
  textoTitulo: {
    fontSize:30,
    textAlign:'center',
    fontWeight: 'bold',
  },
  container2: {
   marginTop:80,
   marginBottom:60,
   alignItems:"center",

   
  },
  imagem: {
    height: 40,
    width: 40,
    marginLeft:70,
    padding: 20,
    
  },
  contatos: {
    flexDirection: "row",
    borderRadius:10,
    padding: 10,
    margin:20,
    backgroundColor:'#96B0B6',
    shadowColor: '#242A2B',
    shadowOffset: {
    width: 0,
    height: 9,
    

  },
  shadowOpacity:  0.22,
  shadowRadius: 9.22,
  elevation: 12
  
  },
  IconeApp: {
    height: 150,
    width: 150,


  
  },
  FundoImagem : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.3)'
  },
  container3 : {
    backgroundColor:'#c3d2d5',
    opacity:0.8,
    borderRadius:15,
    height:80,
    width:280,
    alignItems:'center'
  },

});

export default FaleConosco
