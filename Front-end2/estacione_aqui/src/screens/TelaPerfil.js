import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

let api = "192.168.100.14:3292"

function TelaPerfil() {
  const [login, setUsuario] = useState('');
  const [editing, setEditing] = useState(false); // Alterna entre visualização e edição
  const [newName, setNewName] = useState(''); // Armazena o nome editado
  const navigation = useNavigation();

  // dados sendo uma useState da resposta do backEnd sobre o perfil da pessoa
  const [dados, setDados] = useState({});


  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const id = await AsyncStorage.getItem('userData');
      const response = await fetch(`http://${api}/PickImage?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }
      const data = await response.json();
      setDados(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const pickImageAndConvertToBase64 = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      const { uri } = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const base64Image = `data:image/jpeg;base64,${base64}`;

      // Call the function to update the profile picture
      await updateProfilePicture(base64Image);
    }
  };

  // Função para atualizar a foto de perfil no Back_end
  const updateProfilePicture = async (base64Image) => {
    try {
      const id = await AsyncStorage.getItem('userData');
      const response = await fetch(`http://${api}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          foto: base64Image,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile picture');
      }

      alert("Profile picture updated successfully!");

      fetchUserData();
    } catch (error) {
      console.error('Error updating profile picture:', error);
      Alert.alert("Error updating profile picture");
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
      const data = await AsyncStorage.getItem('userName');
      if (data) {
        // Atualiza apenas o login no objeto salvo
        const userName = JSON.parse(data);
        userName.usuario = newName;

        // Salva novamente o objeto completo no AsyncStorage
        await AsyncStorage.setItem('userName', JSON.stringify(userData));
      } else {
        // Se não existir nenhum dado salvo, cria um novo objeto
        await AsyncStorage.setItem(
          'userName',
          JSON.stringify({ usuario: newName })
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

        {dados.foto ? (
          <Image
            source={dados.foto ? { uri: dados.foto } : require('../../assets/imgs/Perfil.png')}
            style={styles.IconePerfil}
          />
        ) : (
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Carregando...</Text>
        )}
        <TouchableOpacity onPress={pickImageAndConvertToBase64}>
          <Ionicons name="camera" size={30} color="black" style={{ top: -100, left: 50 }} />


        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} style={{ marginTop: 45, top: -390, left: 200, color: 'white' }} />
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
