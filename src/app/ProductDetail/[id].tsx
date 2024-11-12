import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, ScrollView, Image, View, Button, Modal, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Swiper from 'react-native-swiper';
import { styles } from './styles';

interface ImageData {
  url: string;
}

interface Product {
  titulo: string;
  valor: number;
  descricao: string;
  imagens: ImageData[];
}

const ProductDetail: React.FC = () => {
  const { id: productId } = useLocalSearchParams<{ id: string }>();
  console.log('Product ID:', productId);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://casa-mais-perto-server-clone-production.up.railway.app/imoveis/${productId}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar detalhes do imóvel');
      }
      const data: Product = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
      setError('Erro ao buscar detalhes do imóvel. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={fetchProduct} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {product?.imagens.length ? (
          product.imagens.map((img: ImageData, index: number) => (
            <TouchableOpacity key={index} onPress={() => openImageModal(index)}>
              <Image source={{ uri: img.url }} style={styles.image} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noImages}>Nenhuma imagem disponível</Text>
        )}
      </ScrollView>
      <Text style={styles.title}>{product?.titulo}</Text>
      <Text style={styles.value}>
        Valor: R$ {product?.valor ? product.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : 'N/A'}
      </Text>
      <Text style={styles.description}>{product?.descricao}</Text>

      {/* Modal for Image Viewer */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <Swiper 
          index={selectedImageIndex} 
          loop={false} 
          showsPagination={true}
        >
          {product?.imagens.map((img: ImageData, index: number) => (
            <View key={index} style={styles.modalImageContainer}>
              <Image source={{ uri: img.url }} style={styles.modalImage} />
            </View>
          ))}
        </Swiper>
      </Modal>
    </ScrollView>
  );
};

export default ProductDetail;
