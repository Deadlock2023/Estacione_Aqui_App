import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Dimensions, TextInput, Image, TouchableOpacity, } from 'react-native';
import { useFonts } from 'expo-font';
import Texto from '../components/Texto';
import Botao from '../components/Botao';
import Input from '../components/InputText';
import { Switch } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import Login from './Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validator from 'validator';



// const api = "10.111.9.19"
const api = "10.111.9.94"


const largura = Dimensions.get("screen").width
const altura = Dimensions.get("screen").height

// const fundo = require('../../assets/imgs/fundo.png')
// const fundo_marrom = require('../../assets/imgs/fundomarrom.jpg')
// const fundo_azul = require('../../assets/imgs/fundo_azul.jpg')

const fundo_claro2 = require('../../assets/imgs/FundoCadastrologin.png')
const fundo_escuro2 = require('../../assets/imgs/Fundo_escuro_j.png')
const logo = require('../../assets/imgs/EstacioneAqui(2).png')


const Cadastro = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');


  const [imagem, setImagem] = useState(fundo_claro2);
  const [Modo, setModo] = useState(false);
  let [fonte, setFonte] = useState('#5a5a5a')
  let [CorView, setCorview] = useState('#c7c7c7')

  const onToggleSwitch = () => {
    setModo(!Modo)
    if (Modo == false) {
      setImagem(fundo_escuro2)
      setFonte('#5a5a5a')
      setCorview('#bdb9b9')
      console.log('Light Mode')
    } else {
      // setModo(fundo_escuro)
      setImagem(fundo_claro2)
      setCorview('#c7c7c7')
      console.log('Dark Mode')
    }
  }

  const cadastrar = async (usuario, email, senha) => {
    if (!usuario || !email || !senha) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }
    if ((!validator.matches(email, /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/)) || (validator.isEmail(email) != true)) {
      alert("O campo Email não foi preenchido corretamente");
      return;
    }
    if (senha.length < 6 || senha.length > 32) {
      alert("A senha deve ter entre 6 e 12 caracteres.");
      return;
    }
    const senhaValida = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,12}$/;
  if (!senhaValida.test(senha)) {
    alert("A senha deve conter pelo menos 1 número, 1 letra maiúscula e 1 caractere especial.");
    return;
  }
    console.log("usuario: " + usuario, "email: " + email, "senha: " + senha)
    try {
      const response = await fetch(`http://${api}:3292/cadastrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ usuario, email, senha }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }
      const data = await response.json();
      navigation.navigate('Login', { user: data.email });

      await AsyncStorage.setItem('userData', JSON.stringify({ email }));
      console.log(await AsyncStorage.getItem('userData'))

    } catch (error) {
      console.error('Erro ao realizar o cadastro! Erro:', error.message);
    }
  };


  return (
    <View style={styles.container}>
      <ImageBackground source={imagem} style={styles.img_fundo}>
        <AntDesign style={{ marginTop: 45, alignSelf: 'flex-start', left: 2 }} onPress={() => navigation.navigate('Menu')} name="arrowleft" size={30} color="black" />
        <View style={styles.view_branca}>
          <Image source={logo} style={{ height: 150, width: 150, marginTop: -70, }} />

          <Texto texto={'Seja bem-vindo(a)!\n'} mt={10} tamanhoFonte={40} />

          <TextInput placeholder='Digite seu nome de Usuário:' style={[styles.input, { marginTop: -30 }]} onChangeText={setUsuario} value={usuario} />
          <TextInput placeholder='Digite seu email:' style={[styles.input, { marginTop: 20 }]} onChangeText={setEmail} value={email} />
          <TextInput placeholder='Digite sua senha:' style={[styles.input, { marginTop: 20 }]} onChangeText={setSenha} value={senha} />

          <TouchableOpacity style={styles.button_cadastrar} onPress={() => cadastrar(usuario, email, senha)}>
            <Texto texto={'Cadastrar'} mt={12} corTexto={'white'} tamanhoFonte={25} onPress={() => navigation.navigate('Login')} />
          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: 'row', marginTop: -130 }}>
          <Texto texto={'Já possui conta? '} tamanhoFonte={20} />
          <Text onPress={() => navigation.navigate('Login')} style={{ color: 'blue', fontSize: 20 }}>Fazer Login</Text>
        </View>



      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: -20
  },

  input: {
    borderWidth: 3,
    height: 60,
    width: 250,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    fontSize: 20,
    marginTop: 5,
    borderColor: 'gray'


  },
  button_cadastrar: {
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: '#1a90d9',
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    height: 50,
    marginTop: 20,

  },
  img_fundo: {
    height: altura,
    width: largura,
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',

  },
  input: {
    borderWidth: 3,
    height: 60,
    width: 350,
    textAlign: 'center',
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: '#f5f5f5',
    fontSize: 20,
    borderColor: 'transparent',


  },
  button_cadastrar: {
    alignItems: 'center',
    backgroundColor: '#36295e',
    borderRadius: 50,
    alignItems: 'center',
    width: 250,
    height: 60,
    marginTop: 20,

  },

  view_branca: {
    backgroundColor: 'white',
    height: 690,
    width: largura,
    marginTop: 140,
    borderRadius: 60,
    alignItems: 'center',

  },



});

export default Cadastro































{/* <View style={styles.container}>
<ImageBackground source={imagem} style={styles.img_fundo}>
  <View style={[styles.view_cadastro, { backgroundColor: CorView }]} >
    <Texto texto={"Cadastro"} fonte={'opensans'} negrito={"bold"} tamanhoFonte={45} corTexto={'#04588c'}></Texto>


    <Texto style={{ color: fonte }} texto={'Usuário'} negrito={"bold"} fonte={'opensans'} mt={10} tamanhoFonte={30}></Texto>

    <TextInput style={styles.input} placeholder='Digite aqui:'></TextInput>



    <Texto style={{ color: fonte }} texto={'Login'} fonte={'opensans'} negrito={'bold'} tamanhoFonte={30}></Texto>

    <TextInput style={styles.input} placeholder='Digite aqui:'></TextInput>

    <Texto style={{ color: fonte }} texto={'Senha'} fonte={'opensans'} negrito={'bold'} tamanhoFonte={30}></Texto>


    <TextInput style={styles.input} placeholder='Digite aqui:'></TextInput>
    <TouchableOpacity onPress={cadastrar} style={styles.button_cadastrar}>
      <Texto texto={"Fazer cadastro"} fonte={'opensans'} corTexto={'white'} tamanhoFonte={25} mt={7} />
    </TouchableOpacity>










    <Text style={styles.identificar_text2} onPress={() => navigation.navigate('Login')}>(Login)</Text>
    <Text style={styles.identificar_text2} onPress={() => navigation.navigate('Menu')}>(Voltar ao menu)</Text>
    <Switch value={Modo} onValueChange={onToggleSwitch} />

  </View>
</ImageBackground>
</View> */}