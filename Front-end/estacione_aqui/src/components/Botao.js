import React from "react";
import { TouchableOpacity, StyleSheet, Text, } from "react-native";
import { Dimensions } from "react-native";

const largura = Dimensions.get('screen').width

const altura = Dimensions.get('screen').height

const Botao = (textoBotao, tamanhotexto, tamanho, largura, borda, arredondamento, click) =>{
    return (
        <TouchableOpacity onPress={click} style={{fontSize:tamanhotexto, height:tamanho, width:largura, borderWidth:borda , borderRadius:arredondamento}}>{textoBotao}</TouchableOpacity>
    )
}


export default Botao;
