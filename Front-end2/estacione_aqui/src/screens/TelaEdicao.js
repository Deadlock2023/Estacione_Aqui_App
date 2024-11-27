import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Pressable, Text, Image, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.100.14:3292"; // Altere conforme seu servidor

function TelaEdicao() {
  const navigation = useNavigation();
  const [dados, setDados] = useState({ foto: null, nome: '', email: '' });
  const [novaFoto, setNovaFoto] = useState(null); // Para armazenar a nova foto
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      const userId = await AsyncStorage.getItem('userData');
      if (userId) {
        setId(userId);
        obterDadosUsuario(userId);
      }
    };

    carregarDados();
  }, []);

  const obterDadosUsuario = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/informacoes-usuarios?id=${userId}`);
      const { dados } = response.data;

      setDados({
        foto: dados.foto,
        nome: dados.usuario,
        email: dados.email,
      });

      setNome(dados.usuario);
      setEmail(dados.email);
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
    }
  };

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Você precisa conceder permissão para acessar a galeria.');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        const image = result.assets[0]; 
        setNovaFoto(image.uri); // Armazenar a nova imagem
      } else {
        console.log('Usuário cancelou a seleção da imagem');
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao selecionar a imagem.');
    }
  };

  // Função para enviar a imagem para o servidor
  const salvarImagem = async () => {
    if (!novaFoto) {
      return Alert.alert('Erro', 'Selecione uma imagem antes de salvar.');
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: novaFoto,
        name: 'perfil.jpg',
        type: 'image/jpeg',
      });
      formData.append('userId', id);

      const response = await axios.post(`${API_URL}/uploads/criar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Sucesso', 'Imagem salva com sucesso!');
      } else {
        Alert.alert('Erro', 'Não foi possível salvar a imagem.');
      }
    } catch (error) {
      console.error('Erro ao salvar a imagem:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a imagem.');
    }
  };

  // Função para salvar os dados do usuário
  const salvarDados = async () => {
    try {
      await salvarImagem();
      const response = await axios.put(`${API_URL}/editar`, {
        userId: id,
        usuario: nome,
        email: email,
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Sucesso', 'Dados salvos com sucesso!');
      } else {
        Alert.alert('Erro', 'Não foi possível salvar os dados.');
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fotoContainer}>
        {/* Exibe a nova foto ou a foto anterior, se disponível */}
        <Image
          source={novaFoto ? { uri: novaFoto } : (dados.foto ? { uri: dados.foto } : require('../../assets/imgs/Perfil.png'))}
          style={styles.iconePerfil}
        />
        <TouchableOpacity onPress={selecionarImagem} style={styles.cameraButton}>
          <Ionicons name="camera" size={30} style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>
      <AntDesign
        style={styles.backIcon}
        onPress={() => navigation.navigate('TelaPerfil')}
        name="arrowleft"
        size={30}
      />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Pressable style={styles.button} onPress={salvarDados}>
          <Text style={styles.buttonText}>Salvar Dados</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  fotoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconePerfil: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  cameraButton: {
    position: "absolute",
    bottom: -10,
    right: -10,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 8,
  },
  cameraIcon: {
    color: '#080E19',
  },
  backIcon: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#080E19',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaEdicao;
