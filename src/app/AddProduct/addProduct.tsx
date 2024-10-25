import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'; // Importa os estilos do arquivo styles.js

const AddProduct = () => {
  const [name, setName] = useState(''); // Estado para armazenar o título do imóvel
  const [images, setImages] = useState<string[]>([]); // Estado para armazenar as imagens selecionadas
  const [price, setPrice] = useState(''); // Estado para armazenar o preço do imóvel
  const [details, setDetails] = useState(''); // Estado para armazenar os detalhes do imóvel
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 }); // Estado para armazenar a localização do imóvel
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento da localização

  // useEffect para obter a localização atual do usuário
  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync(); // Solicita permissão para acessar a localização
      if (status !== 'granted') {
        Alert.alert('Permissão de localização não concedida');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({}); // Obtém a localização atual
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude }); // Atualiza o estado com a localização atual
      setLoading(false); // Define o estado de carregamento como falso
    };

    getCurrentLocation(); // Chama a função para obter a localização
  }, []);

  // Função para adicionar o imóvel
  const handleAddProduct = async () => {
    // Valida se todos os campos estão preenchidos
    if (!name || images.length === 0 || !price || !details) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const parsedPrice = parseFloat(price); // Converte o preço para número
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Erro', 'O preço deve ser um número válido e positivo.');
      return;
    }

    // Converte imagens para formato base64
    const base64Images = await Promise.all(images.map(async (img) => {
      const response = await fetch(img);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }));

    // Tenta enviar os dados do imóvel para o servidor
    try {
      const response = await fetch('http://192.168.100.6:3000/imoveis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: name,
          descricao: details,
          imagens: base64Images,
          userId: 1, // ID do usuário logado (substitua conforme necessário)
          location,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao adicionar imóvel');
      }

      Alert.alert('Sucesso', 'Produto adicionado com sucesso!'); // Mensagem de sucesso
      clearFields(); // Limpa os campos após o sucesso
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao adicionar produto. Tente novamente.'); // Mensagem de erro
    }
  };

  // Função para limpar os campos do formulário
  const clearFields = () => {
    setName(''); // Limpa o título
    setImages([]); // Limpa as imagens
    setPrice(''); // Limpa o preço
    setDetails(''); // Limpa os detalhes
    setLocation({ latitude: 0, longitude: 0 }); // Redefine a localização
  };

  // Função para selecionar imagens da galeria
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      selectionLimit: 5, // Limite de 5 imagens
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri); // Mapeia as imagens selecionadas
      setImages(prevImages => [...prevImages, ...selectedImages]); // Atualiza o estado com as novas imagens
    }
  };

  // Função para remover uma imagem selecionada
  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index)); // Filtra as imagens, removendo a selecionada
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
              onPress={() => removeImage(index)} // Chama a função para remover a imagem
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
              const newCoordinate = e.nativeEvent.coordinate; // Obtém a nova coordenada após arrastar
              setLocation({
                latitude: newCoordinate.latitude,
                longitude: newCoordinate.longitude,
              });
            }}
          />
        </MapView>
      ) : (
        <Text>Carregando mapa...</Text> // Mensagem de carregamento do mapa
      )}
  
      <TouchableOpacity onPress={handleAddProduct} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Imóvel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddProduct;
