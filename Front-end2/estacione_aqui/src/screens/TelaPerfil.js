// SettingsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';


const SettingsScreen = () => {
  const [login, setUsuario] = useState('');
  const [email, setEmail] = useState('');



  useEffect(() => {
    const fetchUserData = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const userData = JSON.parse(data);
        console.log(userData); 
        setUsuario(userData.login); 
       
      }
    };

    fetchUserData();
  }, []);


  const navigation = useNavigation()
 
  return (
    <View style={styles.container}>
       
      <LinearGradient
        colors={['#051f66', '#051f66','#051f66', 'transparent']}
        style={styles.background}
      />
       <AntDesign style={{marginTop:45,alignSelf:'flex-start',left:2  }} onPress={() => navigation.navigate('TelaPrincipal')} name="arrowleft"  size={30} color="black" />
        {/* <Text>Exit</Text> */}
      <View style={styles.Perfil}>
        <Image source={require('../../assets/imgs/Perfil.png')} style={styles.IconePerfil} />
        <Text style={{ fontSize: 20, bottom: 60 }}>{login ? login : 'Carregando...'}</Text>
        <Text style={{ fontSize: 20, bottom: 20 }}>Detalhes da Contas</Text>
        

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
    top: 140,
    borderRadius: 70,
    alignItems: 'center',
  },
  IconePerfil: {
    backgroundColor: 'red',
    width: 145,
    height: 145,
    bottom: 70,
    borderRadius: 72.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
  },
  button_ir:{
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: '#dadada',
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    height: 50,
    marginTop: 20,
  }
});

export default SettingsScreen;
