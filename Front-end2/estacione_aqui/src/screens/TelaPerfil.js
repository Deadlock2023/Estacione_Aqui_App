import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const API_URL = "http://192.168.100.14:3292";

function TelaPerfil() {
  const [login, setUsuario] = useState('');
  const [caminhoFoto, setCaminhoFoto] = useState('');
  const [newName, setNewName] = useState(''); // Armazena o nome editado
  const [dados, setDados] = useState({});
  const [loading, setLoading] = useState(false); // Gerencia carregamento
  const [nome, setNome] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
    pegarNome();
    pegarImagem();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const id = await AsyncStorage.getItem('userData');
      if (!id) throw new Error('ID de usuário não encontrado no armazenamento.');

      const response = await fetch(`${API_URL}/PickImage?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) throw new Error('Falha ao buscar os dados do usuário.');

      const data = await response.json();
      setDados(data);
      setUsuario(data.nome || ''); // Atualiza o nome exibido
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados.');
    } finally {
      setLoading(false);
    }
  };

  const pegarNome = async () => {
    try {
      const id = await AsyncStorage.getItem('userData');
      if (!id) throw new Error('ID de usuário não encontrado no armazenamento.');
      const response = await fetch(`${API_URL}/api/capturarnome?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Usuário encontrado:', data.usuario);
      setNome(data.usuario);
      return;
    } catch (error) {
      console.error('Erro ao buscar o nome:', error);
      throw error;
    }
  };

  const pegarImagem = async () => {
    try {
      const id = await AsyncStorage.getItem('userData');
      if (!id) throw new Error('ID de usuário não encontrado no armazenamento.');
      const response = await fetch(`${API_URL}/informacoes-usuarios?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Usuário encontrado:', data.dados.foto);
      setCaminhoFoto(`${API_URL}${data.dados.foto}`);
      console.log(caminhoFoto);
      return;
    } catch (error) {
      console.error('Erro ao buscar o nome:', error);
      throw error;
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
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E1E1E', '#080E19']} style={styles.background} />
      <AntDesign
        style={styles.backIcon}
        onPress={() => navigation.navigate('Menu')}
        name="arrowleft"
        size={30}
      />
      <View style={styles.perfil}>
        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : (
          <>
            <Image
              source={dados.foto ? { uri: caminhoFoto } : require('../../assets/imgs/Perfil.png')}
              style={styles.iconePerfil}
              resizeMode="cover"
            />
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <MaterialCommunityIcons name="logout" size={24} color="white" />
            </TouchableOpacity>

            <Text style={styles.nameText}>{nome || 'Nome não encontrado'}</Text>

            <View style={styles.infoContainer}>
              <Text style={styles.detailsTitle}>Detalhes da Conta</Text>
              <Pressable onPress={() => navigation.navigate('TelaEdicao')} style={styles.button}>
                <Text style={styles.buttonText}>Editar Perfil</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 250,
  },
  backIcon: {
    marginTop: 45,
    alignSelf: 'flex-start',
    left: 10,
    color: '#fff',
  },
  perfil: {
    backgroundColor: '#ececec',
    height: '85%',
    width: '100%',
    top: 140,
    borderRadius: 30,
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  iconePerfil: {
    backgroundColor: '#fff',
    width: 145,
    height: 145,
    borderRadius: 72.5,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 50,
    zIndex: 1,
  },
  nameText: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  detailsTitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  button: {
    padding: 12,
    backgroundColor: '#080E19',
    borderRadius: 10,
    width: 200,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TelaPerfil;
