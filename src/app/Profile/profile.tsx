import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useAuth } from '../../services/auth';
import { Imovel } from '../../@types';

const Profile = () => {
  const { user } = useAuth();
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImoveis = async () => {
      if (user) {
        try {
          const response = await fetch(`http://192.168.100.6:3000/imoveis/user?userId=${user.id}`);
          if (!response.ok) {
            throw new Error('Falha ao buscar imóveis');
          }
          const data = await response.json();
          setImoveis(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {user && user.username ? ( // Verifique se user e user.username existem
          <Text style={styles.title}>{user.username}</Text>
        ) : (
          <Text style={styles.title}>Usuário não logado</Text>
        )}
        <FlatList
          data={imoveis}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.propertyCard}>
              <Text style={styles.propertyTitle}>{item.titulo}</Text>
              <Text>{item.descricao}</Text>
              <Text>Latitude: {item.latitude}</Text>
              <Text>Longitude: {item.longitude}</Text>
              <View style={styles.imagesContainer}>
                {item.imagens.map((img, index) => (
                  <Image key={index} source={{ uri: img.url }} style={styles.image} />
                ))}
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  propertyCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  imagesContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 5,
    borderRadius: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Profile;
