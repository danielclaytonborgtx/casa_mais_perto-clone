import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../../services/auth';
import { Imovel } from '../../@types';
import { useRouter } from 'expo-router'; // Importa o hook de roteamento

const Profile = () => {
  const { user, logout } = useAuth(); // Adiciona a função logout
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Inicializa o roteador

  useEffect(() => {
    const fetchImoveis = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`http://192.168.100.6:3000/imoveis/user?userId=${user.id}`);
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
      } else {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, [user?.id]);

  const handleLogout = async () => {
    await logout();
    router.replace('/'); // Redireciona para a home após logout
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
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Para alinhar o nome e o botão
    alignItems: 'center', // Para centralizar verticalmente
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4757', // Cor do botão
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff', // Cor do texto
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  noImoveisText: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 18,
    color: '#888',
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
