import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter, useSegments } from 'expo-router';
import styles from './styles';
import { useAuth } from '../../services/auth';

const EditProduct: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const id = segments[segments.length - 1];
  console.log("ID recebido:", id);
  console.log(id);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [images, setImages] = useState(['']);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      Alert.alert("Erro", "Usuário não está logado");
      router.push('/Login/login'); 
    } else {
      fetchProductData();
    }
  }, [user]);

  const fetchProductData = async () => {
  try {
    const response = await fetch(`http://192.168.100.6:3000/imoveis/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar informações do imóvel');
    }
    const data = await response.json();
    
    setName(data.titulo || '');
    setPrice(data.preco ? data.preco.toFixed(2).replace('.', ',') : '0');
    setDetails(data.descricao || '');
    setLatitude(data.latitude || 0);
    setLongitude(data.longitude || 0);
    // Garante que imagens seja sempre um array
    setImages(Array.isArray(data.imagens) ? data.imagens.map((img: any) => img.url) : []);
    setLoading(false);
  } catch (error) {
    console.error('Erro ao buscar o imóvel:', error);
    Alert.alert('Erro', 'Falha ao carregar as informações do imóvel.');
  }
};

  const handleUpdateProduct = async () => {
    if (!name || !price || !details || images.length === 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e adicione pelo menos uma imagem.');
      return;
    }

    const parsedPrice = parseFloat(price.replace(',', '.'));
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Erro', 'O preço deve ser um número válido e positivo.');
      return;
    }

    try {
      const response = await fetch(`http://192.168.100.6:3000/imoveis/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: name,
          descricao: details,
          preco: parsedPrice,
          latitude,
          longitude,
          imagens: images,
          userId: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar imóvel');
      }

      Alert.alert('Sucesso', 'Imóvel atualizado com sucesso!');
      router.push('/Profile/profile'); 
    } catch (error) {
      console.error('Erro ao atualizar o imóvel:', error);
      Alert.alert('Erro', 'Falha ao atualizar imóvel. Tente novamente.');
    }
  };

  const handleAddImage = () => {
    if (images.length < 5) {
      setImages([...images, '']);
    } else {
      Alert.alert('Limite de imagens', 'Você só pode adicionar até 5 imagens.');
    }
  };

  const handleImageChange = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    setImages(newImages);
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="Título" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Preço" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Detalhes" value={details} onChangeText={setDetails} style={styles.input} />
      {images.map((img, index) => (
        <TextInput key={index} placeholder="URL da Imagem" value={img} onChangeText={(url) => handleImageChange(index, url)} style={styles.input} />
      ))}
      <TouchableOpacity onPress={handleAddImage} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Imagem</Text>
      </TouchableOpacity>
      <Text style={styles.mapInstruction}>Ajuste a localização do seu imóvel:</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        }}
        showsUserLocation={true}
        onRegionChangeComplete={(region) => {
          setLatitude(region.latitude);
          setLongitude(region.longitude);
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          draggable
          onDragEnd={(e) => {
            const newCoordinate = e.nativeEvent.coordinate;
            setLatitude(newCoordinate.latitude);
            setLongitude(newCoordinate.longitude);
          }}
        />
      </MapView>
      <TouchableOpacity onPress={handleUpdateProduct} style={styles.button}>
        <Text style={styles.buttonText}>Atualizar Imóvel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProduct;
