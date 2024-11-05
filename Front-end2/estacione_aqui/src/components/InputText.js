import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions, TextInput } from "react-native";

const largura = Dimensions.get('screen').width

const altura = Dimensions.get('screen').height

const Input = ({texto}) =>{
    return (
 
 <TextInput placeholder={texto} />
    )
}



const styles = StyleSheet.create ({

    texto:{
        textAlign:'center',

        
    },


})

export default Input; 
