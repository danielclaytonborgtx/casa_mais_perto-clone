import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './styles';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState({
    latitude: -23.5505, // Coordenadas iniciais
    longitude: -46.6333,
  });

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização não concedida');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });
    };

    getCurrentLocation();
  }, []);

  const handleAddProduct = () => {
    console.log({ name, image, price, details, location });
    // Lógica para salvar o produto pode ser adicionada aqui
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="URL da Imagem"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      <TextInput
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />
      <TextInput
        placeholder="Detalhes"
        value={details}
        onChangeText={setDetails}
        style={styles.input}
      />

      <MapView
        style={{ height: 300, width: '100%' }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        loadingEnabled
        showsUserLocation={true} // Mostra a localização do usuário
        onRegionChangeComplete={(region) => {
          // Mantém o marcador fixo no centro da tela
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        // Define o modo de interação do mapa
        scrollEnabled={true} // Habilita rolagem
        zoomEnabled={true} // Habilita zoom
      >
        {/* Marcador fixo no centro da tela */}
        <Marker
          coordinate={location}
          title={name}
          draggable
          onDragEnd={(e) => {
            const newCoordinate = e.nativeEvent.coordinate;
            setLocation({
              latitude: newCoordinate.latitude,
              longitude: newCoordinate.longitude,
            });
          }}
        />
      </MapView>

      <TouchableOpacity onPress={handleAddProduct} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProduct;
