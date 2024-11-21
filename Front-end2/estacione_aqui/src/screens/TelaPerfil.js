import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function TelaPerfil() {
  const [login, setUsuario] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [editing, setEditing] = useState(false); // Estado para alternar entre visualização e edição
  const [newName, setNewName] = useState(''); // Estado para armazenar o nome editado
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
    setProfileImage(result.uri);
    await AsyncStorage.setItem('profileImage', result.uri);
  };

  const handleSaveName = async () => {
    try {
      // Atualiza o estado e salva no AsyncStorage
      setUsuario(newName);
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const userData = JSON.parse(data);
        userData.login = newName;
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
      }

      // Chamada para atualizar no banco de dados
      await fetch('http://10.111.9.48:3292/atualizar-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: newName,
        }),
      });

      Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
      setEditing(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o nome.');
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

        {editing ? (
          <TextInput
            style={styles.nameInput}
            value={newName}
            onChangeText={setNewName}
          />
        ) : (
          <Text style={{ fontSize: 20, bottom: 60 }}>{login ? login : 'Carregando...'}</Text>
        )}

        {editing ? (
          <Pressable onPress={handleSaveName} style={styles.button}>
            <Text style={styles.buttonText}>Salvar</Text>
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
    backgroundColor: 'red',
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