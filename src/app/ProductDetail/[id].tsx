import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, StyleSheet, ScrollView, Image, View, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

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
  const { id: productId } = useLocalSearchParams<{ id: string }>(); // Mude 'productId' para 'id'
  console.log('Product ID:', productId); // Verifique se está retornando o ID esperado
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://192.168.100.6:3000/imoveis/${productId}`);
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
      <Text style={styles.title}>{product?.titulo}</Text>
      <Text style={styles.value}>
        Valor: R$ {product?.valor ? product.valor.toFixed(2).replace('.', ',') : 'N/A'}
      </Text>
      <Text style={styles.description}>{product?.descricao}</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {product?.imagens.length ? (
          product.imagens.map((img: ImageData, index: number) => (
            <Image key={index} source={{ uri: img.url }} style={styles.image} />
          ))
        ) : (
          <Text style={styles.noImages}>Nenhuma imagem disponível</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  noImages: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductDetail;
