import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function TelaPerfil() {
  const [login, setUsuario] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [editing, setEditing] = useState(false); // Alterna entre visualização e edição
  const [newName, setNewName] = useState(''); // Armazena o nome editado
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await AsyncStorage.getItem('userData');
      const savedImage = await AsyncStorage.getItem('profileImage');

      if (data) {
        const userData = JSON.parse(data);
        setUsuario(userData.login);
        setNewName(userData.login); // Inicializa o nome editável
      }

      if (savedImage) {
        setProfileImage(savedImage);
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
      base64: true, // Certifique-se de que o Base64 está ativado
    });
  
    if (!pickerResult.canceled) {
      manipulateImage(pickerResult.assets[0]);
    }
  };
  

  const manipulateImage = async (image) => {
    const result = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 145, height: 145 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
  
    setProfileImage(result.uri); // Define a URI para exibição
    await AsyncStorage.setItem('profileImage', result.uri); // Salva localmente
    uploadImage(image.base64); // Envia o Base64 da imagem ao servidor
  };

  const uploadImage = async (base64Image) => {
    try {
      console.log(base64Image);
      const response = await axios.post('http://192.168.100.14:3292/upload', {
        foto: base64Image, // Envia apenas o Base64 da imagem
      });
  
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      Alert.alert('Erro', 'Não foi possível enviar a imagem.');
    }
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const handleSaveName = async () => {
    try {
      // Validação para evitar salvar um nome vazio
      if (!newName.trim()) {
        Alert.alert('Erro', 'O nome não pode estar vazio.');
        return;
      }

      // Atualiza o estado local
      setUsuario(newName);

      // Recupera os dados do AsyncStorage
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        // Atualiza apenas o login no objeto salvo
        const userData = JSON.parse(data);
        userData.login = newName;

        // Salva novamente o objeto completo no AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
      } else {
        // Se não existir nenhum dado salvo, cria um novo objeto
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify({ login: newName })
        );
      }

      // Envia atualização para o servidor
      await fetch('http://192.168.100.14:3292/atualizar-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: newName,
        }),
      });

      // Exibe uma mensagem de sucesso
      Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
      setEditing(false);
    } catch (error) {
      console.error('Erro ao salvar o nome:', error);
      Alert.alert('Erro', 'Não foi possível salvar o nome.');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#080E19', '#080E19', '#080E19', 'transparent']} style={styles.background} />
      <AntDesign
        style={{ marginTop: 45, alignSelf: 'flex-start', left: 2, color: '#fff' }}
        onPress={() => navigation.navigate('Menu')}
        name="arrowleft"
        size={30}
        color="black"
      />

      <View style={styles.Perfil}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/imgs/Perfil.png')}
          style={styles.IconePerfil}
        />
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="camera" size={30} color="black" style={{ top: -100, left: 50 }} />
          
        
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} style={{ marginTop: 45,top: -390, left: 200, color: 'white' }} />
        </TouchableOpacity>
      

        {editing ? (
          <TextInput
            style={styles.nameInput}
            value={newName}
            onChangeText={setNewName}
          />
        ) : (
          <Text style={{ fontSize: 20, bottom: 150 }}>{login ? login : 'Carregando...'}</Text>
        )}

        {editing ? (
          <Pressable onPress={handleSaveName} style={styles.button}>
            <Text style={styles.buttonText}>A</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => setEditing(true)} style={styles.button}>
            <Text style={styles.buttonText}>Editar Nome</Text>
          </Pressable>
        )}

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
    backgroundColor: 'black ',
    width: 145,
    height: 145,
    bottom: 70,
    borderRadius: 72.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
  },
  nameInput: {
    fontSize: 20,
    bottom: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#080E19',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TelaPerfil;
