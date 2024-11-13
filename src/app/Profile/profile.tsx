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
    // Verificar se o user e o user.id estão disponíveis antes de buscar imóveis
    if (!user?.id) {
      setError('Usuário não autenticado');
      setLoading(false);
      return;
    }

    const fetchImoveis = async () => {
      try {
        const response = await fetch(`https://casa-mais-perto-server-clone-production.up.railway.app/imoveis/user?userId=${user.id}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar imóveis');
        }
        const data = await response.json();
        setImoveis(data);
      } catch (error) {
        setError('Este usuário ainda não tem imóveis.');
      } finally {
        setLoading(false);
      }
    };

    fetchImoveis();
  }, [user]);

  const handlePress = (imovelId: number) => {
    router.push(`/ProductDetail/${String(imovelId)}`);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/'); 
  };

  const handleEdit = (imovelId: number | undefined) => {
    if (imovelId) {
      router.push(`/EditProduct/${String(imovelId)}`);
    } else {
      console.error('ID do imóvel inválido:', imovelId);
    }
  };

  // Função para excluir imóvel com alerta de confirmação
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
              // Buscar as imagens associadas ao imóvel
              const imagensResponse = await fetch(`https://casa-mais-perto-server-clone-production.up.railway.app/imagens/imovel/${imovelId}`);
              const imagens: Imagem[] = await imagensResponse.json();

              // Excluir cada imagem associada
              if (imagens.length > 0) {
                await Promise.all(imagens.map((imagem: Imagem) => {
                  return fetch(`https://casa-mais-perto-server-clone-production.up.railway.app/imagens/${imagem.id}`, {
                    method: 'DELETE',
                  }).then((response) => {
                    if (!response.ok) {
                      throw new Error(`Falha ao excluir imagem com ID ${imagem.id}`);
                    }
                  });
                }));
              }

              // Excluir o imóvel após excluir as imagens
              const response = await fetch(`https://casa-mais-perto-server-clone-production.up.railway.app/imoveis/${imovelId}`, {
                method: 'DELETE',
              });

              if (response.ok) {
                setImoveis((prevImoveis) => prevImoveis.filter((imovel) => imovel.id !== imovelId));
                Alert.alert('Sucesso', 'Imóvel excluído com sucesso');
              } else {
                throw new Error('Erro ao excluir imóvel');
              }
            } catch (error) {
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

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : imoveis.length === 0 ? (
          <Text style={styles.noImoveisText}>Nenhum imóvel encontrado.</Text>
        ) : (
          <FlatList
            data={imoveis}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.propertyCard}>
                <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.propertyDetails}>
                  <Text style={styles.propertyTitle}>{item.titulo}</Text>
                  <Text style={styles.propertyValue}>
                    Valor: R$ {item.valor ? (item.valor / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : 'N/A'}
                  </Text>
                  <Text>{item.descricao}</Text>
                </TouchableOpacity>

                <View style={styles.imagesContainer}>
                  {item.imagens.length > 0 && (
                    <TouchableOpacity onPress={() => handlePress(item.id)}>
                      <Image source={{ uri: item.imagens[0].url }} style={styles.image} />
                    </TouchableOpacity>
                  )}
                  <View style={styles.iconContainer}>
                    {/* <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.editIcon}>
                      <MaterialCommunityIcons name="pencil" size={20} color="#000" />
                    </TouchableOpacity> */}
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
