import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';






function LocaisCards() {
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Estacionamento</Text>
        <Text style={styles.subtitle}>Telefone:</Text>
        <Text style={styles.subtitle}>Localização:</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:12}}>Horário Abertura:</Text>
        <Text style={{fontSize:12}}>Horário Fechamento:</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // sombra para Android
    margin: 30,
  },
  imagePlaceholder: {
    width: 90, // tamanho aproximado da imagem
    height: 90,
    backgroundColor: '#B8A08C', // cor da imagem de placeholder
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default LocaisCards