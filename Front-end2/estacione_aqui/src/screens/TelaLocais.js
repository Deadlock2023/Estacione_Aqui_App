import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, ActivityIndicator } from 'react-native';

function LocaisCards() {
  const [estacionamentos, setEstacionamentos] = useState([]);
  const [filteredEstacionamentos, setFilteredEstacionamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.111.9.48:3292/montarcards');
        const data = await response.json();
        setEstacionamentos(data);
        setFilteredEstacionamentos(data); // Inicializa a lista filtrada
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);

    // Filtra os estacionamentos pelo nome
    const filtered = estacionamentos.filter((item) =>
      item.nome.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEstacionamentos(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar local..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredEstacionamentos}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.url_imagem }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.nome}</Text>
              <Text style={styles.subtitle}>Endereço: {item.endereco_nome}</Text>
              <Text style={styles.subtitle}>Telefone: {item.telefone}</Text>
              <View style={styles.row}>
                <Text style={styles.smallText}>Abertura: {item.horario_abertura}</Text>
                <Text style={styles.smallText}>Fechamento: {item.horario_fechamento}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.nome}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum local encontrado</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    top: 10,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 30,
    paddingHorizontal: 10,
  },
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
    elevation: 2,
    margin: 10,
  },
  image: {
    width: 90,
    height: 90,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  smallText: {
    fontSize: 12,
    color: '#666',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 16,
  },
});



export default LocaisCards;
