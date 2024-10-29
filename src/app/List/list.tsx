// src/listScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Imovel } from '../../@types';
import { styles } from './styles';

const ListScreen: React.FC = () => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await fetch('http://192.168.100.6:3000/imoveis'); // URL para buscar todos os imóveis
        if (!response.ok) {
          throw new Error('Falha ao buscar imóveis');
        }
        const data = await response.json();
        setImoveis(data);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
        setError('Erro ao buscar imóveis. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imóveis mais perto</Text>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={imoveis}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.propertyCard}>
              <View style={styles.propertyInfo}>
                <Text style={styles.propertyTitle}>{item.titulo}</Text>
                <Text style={styles.propertyValue}>
                  Valor: R$ {item.valor !== null && item.valor !== undefined ? item.valor.toFixed(2).replace('.', ',') : 'N/A'}
                </Text>
                <Text>{item.descricao}</Text>
              </View>
              <Image source={{ uri: item.imagens[0]?.url }} style={styles.image} />
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default ListScreen;
