import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [images, setImages] = useState<string[]>([]);
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
    if (!name || images.length === 0 || !price || !details) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      Alert.alert('Erro', 'O preço deve ser um número válido.');
      return;
    }

    console.log({ name, images, price: parsedPrice, details, location });
    Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
    // Aqui, você pode limpar os campos ou redirecionar o usuário, se desejar.
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages(prevImages => [...prevImages, ...selectedImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Título"
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
  
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
        {images.map((img, index) => (
          <View key={index} style={{ position: 'relative', marginRight: 10, marginBottom: 10 }}>
            <Image
              source={{ uri: img }}
              style={{ width: 100, height: 100 }}
            />
            <TouchableOpacity
              onPress={() => removeImage(index)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'red',
                borderRadius: 15,
                padding: 5,
              }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        <Text style={styles.buttonText}>Escolher Imagens</Text>
      </TouchableOpacity>

      <Text style={styles.mapInstruction}>
        Ajuste a localização exata do seu imóvel arrastando o marcador no mapa.
      </Text>
  
      {!loading ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
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
    </ScrollView>
  );
};

export default AddProduct;
