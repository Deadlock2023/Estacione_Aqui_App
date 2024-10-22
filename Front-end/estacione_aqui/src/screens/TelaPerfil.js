// SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

 function SettingsScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#051f66', '#051f66','#051f66', 'transparent']}
        style={styles.background}
      />
      <View style={styles.Perfil}>
       
         <Image source={require('../../assets/imgs/Perfil.png')} style={styles.IconePerfil}/>
        
        <Text style={{fontSize:20,bottom:60}}>Jorge</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
    backgroundColor: 'blue',
    
  },
  Perfil: {
    backgroundColor: 'white',
    height: '90%',
    width: '100%',
    top:140,
    borderRadius:70,
    alignItems: 'center',
  },
  IconePerfil: {
    backgroundColor: 'red',
    width: 145,
    height: 145,
    bottom:70,
    borderRadius: 72.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'black'
  },
});

export default SettingsScreen