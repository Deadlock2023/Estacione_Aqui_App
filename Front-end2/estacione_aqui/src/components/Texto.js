import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const largura = Dimensions.get('screen').width

const altura = Dimensions.get('screen').height

const Texto = ({texto, negrito, tamanhoFonte, corTexto, distanciatopo, posicao, mt, fonte}) =>{
    return (
 <Text style={{fontSize:tamanhoFonte, fontWeight:negrito, color:corTexto, marginTop:distanciatopo, textAlign:posicao, marginTop:mt, fontFamily:fonte}}>{texto}</Text>
    )
}



const styles = StyleSheet.create ({


})

export default Texto; 
