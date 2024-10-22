import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Image, StyleSheet, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

const Coordenadas = {
  latitude: -22.121265,
  longitude: -51.383400,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
};

const locais = [
  { id: 1, latitude: -22.13151, longitude: -51.39025, title: 'Estacionamento 1' },
  { id: 2, latitude: -22.1200, longitude: -51.3850, title: 'Estacionamento 2' },
  { id: 3, latitude: -22.1250, longitude: -51.3800, title: 'Local 3' },
];

 function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState(Coordenadas);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const mapRef = useRef(null);

  // Função para obter a localização atual do usuário
  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de localização foi negada');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);

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
    // Inicializar o mapa na posição de Presidente Prudente ou na posição do usuário
    getLocation(); // Chamando a função getLocation para obter a localização ao carregar
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
              openGoogleMaps(local); // Abre o Google Maps com o local marcado
            }}
          >
            <Image
              source={require('../../assets/imgs/estacionamento.png')}
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
    top: 20,
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

export default MapScreen