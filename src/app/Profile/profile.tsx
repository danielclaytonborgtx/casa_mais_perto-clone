import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../services/auth';
import { Imovel } from '../../@types';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { styles } from './styles';

const Profile = () => {
  const { user, logout } = useAuth();
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  interface Imagem {
    id: number;
    url: string;
  }

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
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.replace('/'); 
  };

  const handleEdit = (imovelId: number) => {
    if (imovelId) {
      router.push(`/EditProduct/${imovelId}`);
    } else {
      console.error('ID do imóvel inválido:', imovelId);
    }
  };

  // Excluir o imóvel e as imagens associadas
  const handleDelete = async (imovelId: number) => {
    Alert.alert(
      "Excluir Imóvel",
      "Você tem certeza que deseja excluir este imóvel?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              // Primeiro, busque as imagens associadas ao imóvel
              const imagensResponse = await fetch(`http://192.168.100.6:3000/imagens/imovel/${imovelId}`);
              const imagens: Imagem[] = await imagensResponse.json();
  
              // Excluir todas as imagens associadas
              await Promise.all(imagens.map((imagem: Imagem) => {
                return fetch(`http://192.168.100.6:3000/imagens/${imagem.id}`, {
                  method: 'DELETE',
                });
              }));
  
              // Agora excluir o imóvel
              const response = await fetch(`http://192.168.100.6:3000/imoveis/${imovelId}`, {
                method: 'DELETE',
              });
  
              if (response.ok) {
                setImoveis((prevImoveis) => prevImoveis.filter((imovel) => imovel.id !== imovelId));
                Alert.alert('Sucesso', 'Imóvel excluído com sucesso');
              } else {
                throw new Error('Erro ao excluir imóvel');
              }
            } catch (error) {
              console.error("Erro ao excluir imóvel:", error);
              Alert.alert('Erro ao excluir o imóvel. Tente novamente.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{user?.username || 'Usuário não logado'}</Text>
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
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.editIcon}>
                      <MaterialCommunityIcons name="pencil" size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteIcon}>
                      <MaterialCommunityIcons name="trash-can" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
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
