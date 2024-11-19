import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'; 


function TelaPerfil() {
  const [login, setUsuario] = useState('');
  const [profileImage, setProfileImage] = useState(null);
 
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await AsyncStorage.getItem('userData');
      const savedImage = await AsyncStorage.getItem('profileImage');
     
      if (data) {
        const userData = JSON.parse(data);
        setUsuario(userData.login);
      }
 
      if (savedImage) {
        setProfileImage(savedImage); // Carrega a imagem de perfil salva
      }
    };
 
    fetchUserData();
  }, []);
 
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
 
    if (permissionResult.granted === false) {
      alert('A permissão para acessar a galeria foi negada!');
      return;
    }
 
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
 
    if (!pickerResult.canceled) {
      manipulateImage(pickerResult.assets[0].uri);
    }
  };
 
  const manipulateImage = async (uri) => {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 145, height: 145 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    setProfileImage(result.uri); // Atualiza o estado com a imagem manipulada
    await AsyncStorage.setItem('profileImage', result.uri); // Salva a imagem localmente
  };

 
  return (
    <View style={styles.container}> 
      <LinearGradient
        colors={['#080E19', '#080E19', '#080E19', 'transparent']}
        style={styles.background}
      />
  <AntDesign style={{marginTop:45, alignSelf:'flex-start',left:2, color:"#fff" }} onPress={() => navigation.navigate('Menu')} name="arrowleft"  size={30} color="black" />
      <View style={styles.Perfil}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/imgs/Perfil.png')}
          style={styles.IconePerfil}
          
        />
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="camera" size={30} color="black"  style={{top:  -100, left: 50}}/>
        </TouchableOpacity>  
        
        <Text style={{ fontSize: 20, bottom: 60 }}>{login ? login : 'Carregando...'}</Text>
        <Text style={{ fontSize: 20, bottom: 20 }}>Detalhes da Conta</Text>
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
    backgroundColor: '#080E19',
  },
  Perfil: {
    backgroundColor: '#ececec',
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
});
 
export default TelaPerfil;
 