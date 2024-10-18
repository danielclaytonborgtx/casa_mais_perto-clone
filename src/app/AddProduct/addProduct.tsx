import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };

    getCurrentLocation();
  }, []);

  const handleAddProduct = () => {
    if (!name || !image || !price || !details) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      Alert.alert('Erro', 'O preço deve ser um número válido.');
      return;
    }

    console.log({ name, image, price: parsedPrice, details, location });
    Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        <Text style={styles.buttonText}>Escolher Imagem</Text>
      </TouchableOpacity>

      {image ? (
        <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 10 }} />
      ) : null}

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
       
      <TextInput
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Detalhes"
        value={details}
        onChangeText={setDetails}
        style={styles.input}
      />

      {!loading ? (
        <MapView
          style={{ height: 350, width: '100%' }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingEnabled
          showsUserLocation={true}
          onRegionChangeComplete={(region) => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
        >
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
      ) : (
        <Text>Carregando mapa...</Text>
      )}

      <TouchableOpacity onPress={handleAddProduct} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Imóvel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProduct;
