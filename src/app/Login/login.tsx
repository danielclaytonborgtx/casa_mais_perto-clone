import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import axios from 'axios';
import { styles } from './styles';

// Defina uma interface para a resposta esperada da API
interface LoginResponse {
  user: {
    username: string; // ou qualquer outro campo que você esteja esperando
    // adicione outros campos conforme necessário
  };
  // adicione outros campos que a resposta pode ter
}

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientId, setClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null); // Armazena o nome do usuário logado

  useEffect(() => {
    const androidClientId = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;
    const webClientId = Constants.expoConfig?.extra?.WEB_CLIENT_ID;
    setClientId(androidClientId || webClientId || null);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true); // Ativa o estado de carregamento

    try {
      const response = await axios.post<LoginResponse>('http://192.168.100.6:3000/login', { username: email, password });
      if (response.status === 200) {
        setLoggedInUser(response.data.user.username); // Armazena o nome do usuário
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        router.push('/Profile/profile'); // Direcionar para a página de perfil
      }
    } catch (error) {
      console.error(error);
      const errorMessage = (error as any).response?.data?.error || 'Credenciais incorretas. Tente novamente.';
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: clientId || '',
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      axios.post<LoginResponse>('http://192.168.100.6:3000/auth/google', { id_token })
        .then(res => {
          setLoggedInUser(res.data.user.username); // Armazena o nome do usuário
          Alert.alert('Sucesso', 'Login realizado com Google!');
          router.push('/Profile/profile'); // Direcionar para a página de perfil
        })
        .catch(err => {
          console.error(err);
          Alert.alert('Erro', 'Falha na autenticação com Google.');
        });
    } else if (response?.type === 'error') {
      Alert.alert('Erro', 'Falha na autenticação.');
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" /> // Indicador de carregamento
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.orText}>Ou</Text>

      {clientId && (
        <TouchableOpacity
          onPress={() => promptAsync()}
          style={[styles.button, styles.googleButton]}
          disabled={!request || loading} // Desabilitar se em carregamento
        >
          <Text style={styles.buttonText}>Continuar com Google</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => router.push('/Signup/signup')}>
        <Text style={styles.toggleText}>Não tem conta? Criar uma</Text>
      </TouchableOpacity>

      {/* Mostra o nome do usuário logado se estiver disponível */}
      {loggedInUser && (
        <Text style={styles.loggedInUserText}>
          Olá, {loggedInUser}! Clique para ir ao seu perfil.
        </Text>
      )}
    </View>
  );
};

export default Login;
