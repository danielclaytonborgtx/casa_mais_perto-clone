import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, StyleSheet, ScrollView, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface ImageData {
  url: string;
}

interface Product {
  titulo: string;
  valor: number;
  descricao: string;
  imagens: ImageData[];
}

type ProductDetailProps = {
  route: RouteProp<{ params: { productId: number } }, 'params'>;
  navigation: StackNavigationProp<any>;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
  const { productId } = route.params; // Obtém o ID do imóvel passado como parâmetro
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{product?.titulo}</Text>
      <Text style={styles.value}>
        Valor: R$ {product?.valor.toFixed(2).replace('.', ',')}
      </Text>
      <Text style={styles.description}>{product?.descricao}</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {product?.imagens.map((img: ImageData, index: number) => (
          <Image key={index} source={{ uri: img.url }} style={styles.image} />
        ))}
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
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductDetail;
