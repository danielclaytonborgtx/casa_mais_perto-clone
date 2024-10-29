import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../../services/auth';
import { Imovel } from '../../@types';
import { useRouter } from 'expo-router';
import { styles } from './styles';

const Profile = () => {
  const { user, logout } = useAuth();
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchImoveis = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`http://192.168.100.6:3000/imoveis/user?userId=${user.id}`);
          if (!response.ok) {
            throw new Error('Falha ao buscar imóveis');
          }
          const data = await response.json();
          console.log(data); // Log dos dados retornados para depuração
          setImoveis(data);
        } catch (error) {
          console.error("Erro ao buscar imóveis:", error);
          setError('Erro ao buscar imóveis. Tente novamente mais tarde.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, [user?.id]);

  const handleLogout = async () => {
    await logout();
    router.replace('/'); 
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {user?.username || 'Usuário não logado'}
          </Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : imoveis.length === 0 ? (
          <Text style={styles.noImoveisText}>Nenhum imóvel encontrado.</Text>
        ) : (
          <FlatList
            data={imoveis}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.propertyCard}>
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyTitle}>{item.titulo}</Text>
                  <Text style={styles.propertyValue}>
                    Valor: R$ {item.valor !== null && item.valor !== undefined ? item.valor.toFixed(2).replace('.', ',') : 'N/A'}
                  </Text>
                  <Text>{item.descricao}</Text>
                </View>
                <View style={styles.imagesContainer}>
                  {item.imagens.length > 0 && (
                    <Image source={{ uri: item.imagens[0].url }} style={styles.image} />
                  )}
                </View>
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
};

export default Profile;
