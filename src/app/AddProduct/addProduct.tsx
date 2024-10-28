import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router'; // Importando useRouter
import styles from './styles';
import { useAuth } from '../../services/auth';

const AddProduct = () => {
  const { user } = useAuth();
  const router = useRouter(); // Inicializando o router
  const [name, setName] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização não concedida');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
      setLoading(false);
    };

    getCurrentLocation();
  }, []);

  const handleAddProduct = async () => {
    if (!name || images.length === 0 || !price || !details) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Erro', 'O preço deve ser um número válido e positivo.');
      return;
    }

    try {
      const response = await fetch('http://192.168.100.6:3000/imoveis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: name,
          descricao: details,
          imagens: images, // Correção aqui
          userId: user?.id,
          latitude,
          longitude,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Falha ao adicionar imóvel');
      }

      const data = await response.json();
      console.log(data);
      Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
      clearFields();
      router.push('/Profile/profile'); // Redireciona para a página de perfil após adicionar o imóvel
    } catch (error) {
      const errorMessage = (error as Error).message || 'Falha ao adicionar produto. Tente novamente.';
      console.error('Error:', error);
      Alert.alert('Erro', errorMessage);
    }
  };

  const clearFields = () => {
    setName('');
    setImages([]);
    setPrice('');
    setDetails('');
    setLatitude(0);
    setLongitude(0);
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
            <Image source={{ uri: img }} style={{ width: 100, height: 100 }} />
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
            latitude,
            longitude,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007,
          }}
          loadingEnabled
          showsUserLocation={true}
          onRegionChangeComplete={(region) => {
            setLatitude(region.latitude);
            setLongitude(region.longitude);
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title={name}
            draggable
            onDragEnd={(e) => {
              const newCoordinate = e.nativeEvent.coordinate;
              setLatitude(newCoordinate.latitude);
              setLongitude(newCoordinate.longitude);
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
