import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Image, StyleSheet, Dimensions, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

const largura = Dimensions.get('screen').width;
const altura = Dimensions.get('screen').height;

const Coordenadas = {
  latitude: -22.121265,
  longitude: -51.383400,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
};

function TelaMapa() {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState(Coordenadas);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [locais, setLocais] = useState([]);
  const mapRef = useRef(null);

  // Função para obter as localizações da API
  const fetchLocations = async () => {
    try {
      const response = await fetch('http://192.168.100.14:3292/localizar_estabelecimentos');
      const data = await response.json();

      // Transformar os dados para coordenadas que o MapView aceita
      const locaisFormatados = data.map((item, index) => {
        const [latitude, longitude] = item.localizacao.split(',').map(Number);
        return {
          id: index,
          latitude,
          longitude,
          title: item.nome,
        };
      });

      setLocais(locaisFormatados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as localizações: ' + error.message);
    }
  };

  // Função para obter a localização atual do usuário
  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de localização foi negada');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setOrigin({ latitude, longitude });

    // Atualiza a região para focar na localização atual do usuário
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  }

  useEffect(() => {
    // Inicializar mapa com a localização do usuário e carregar locais da API
    getLocation();
    fetchLocations();
  }, []);

  const handleSearch = async () => {
    try {
      const geocoding = await Location.geocodeAsync(searchQuery);
      if (geocoding.length > 0) {
        const { latitude, longitude } = geocoding[0];
        const searchRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(searchRegion);
        setMarkerLocation({ latitude, longitude });
        setDestination({ latitude, longitude });

        if (mapRef.current) {
          mapRef.current.animateToRegion(searchRegion, 1000);
        }
      } else {
        Alert.alert('Local não encontrado', 'Não foi possível encontrar o local pesquisado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a busca: ' + error.message);
    }
  };

  const openGoogleMaps = (local) => {
    const destinationLatLng = `${local.latitude},${local.longitude}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${destinationLatLng}`;
    Linking.openURL(url).catch(err => console.error('Erro ao abrir o link:', err));
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        ref={mapRef}
        showsUserLocation={true}
      >
        {markerLocation && <Marker coordinate={markerLocation} />}
        {locais.map((local) => (
          <Marker
            key={local.id}
            coordinate={{ latitude: local.latitude, longitude: local.longitude }}
            title={local.title}
            onPress={() => {
              setDestination({ latitude: local.latitude, longitude: local.longitude });
              openGoogleMaps(local);
            }}
          >
            <Image
              source={require('../../assets/imgs/Marcadores.png')}
              style={styles.markerImage}
            />
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Digite um estabelecimento"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
  marginTop:50,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 5,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  markerImage: {
    width: 60,
    height: 60,
  },
});

export default TelaMapa;