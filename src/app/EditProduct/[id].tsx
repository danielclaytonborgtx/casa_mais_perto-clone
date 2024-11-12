import React, { useEffect, useState } from 'react';
import { Text, TextInput, Button, ActivityIndicator, View, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../services/auth';
import { styles } from './styles';

interface Imovel {
  titulo: string;
  valor: number;
  descricao: string;
}

const EditProduct: React.FC = () => {
  const { id: imovelId } = useLocalSearchParams<{ id: string }>();
  const [imovel, setImovel] = useState<Imovel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const router = useRouter();

  const fetchImovel = async () => {
    try {
      const response = await fetch(`https://casa-mais-perto-server-clone-production.up.railway.app/imoveis/${imovelId}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar detalhes do imóvel');
      }
      const data: Imovel = await response.json();
      setImovel(data);
      setTitulo(data.titulo);
      setValor(data.valor.toString());
      setDescricao(data.descricao);
    } catch (error) {
      setError('Erro ao buscar detalhes do imóvel. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImovel();
  }, [imovelId]);

  const handleUpdate = async () => {
    try {
      const { user } = useAuth();
      const response = await fetch(`https://casa-mais-perto-server-clone-production.up.railway.app/imoveis/${imovelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, valor: parseFloat(valor), descricao }),
      });
      if (!response.ok) {
        throw new Error('Falha ao atualizar o imóvel');
      }
      Alert.alert('Sucesso', 'Imóvel atualizado com sucesso');
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar o imóvel. Tente novamente.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={fetchImovel} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Valor:</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
};

export default EditProduct;
