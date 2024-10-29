import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import axios from 'axios';
import { styles } from './styles';
import { useAuth } from '../../services/auth'; // Importa o contexto de autenticação

// Define uma interface para a resposta esperada da API
interface LoginResponse {
  user: {
    id: number; // Adiciona o ID do usuário
    username: string;
    email: string; // Adicione outros campos conforme necessário
  };
}

const Login = () => {
  const router = useRouter();
  const { login } = useAuth(); // Obtém a função login do contexto de autenticação
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientId, setClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
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

    setLoading(true);

    try {
      const response = await axios.post<LoginResponse>('http://192.168.100.6:3000/login', { username: email, password });
      if (response.status === 200) {
        const user = {
          id: response.data.user.id, // Armazena o ID do usuário
          username: response.data.user.username,
          email: response.data.user.email // Armazena o email do usuário
        };
        await login(user); // Chama a função login do AuthContext
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        setEmail(''); // Limpa o campo de email
        setPassword(''); // Limpa o campo de senha
        router.push('/Profile/profile'); // Redireciona para a página do perfil
      }
    } catch (error) {
      const errorMessage = (error as any).response?.data?.error || 'Credenciais incorretas. Tente novamente.';
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
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
          const user = {
            id: res.data.user.id, // Armazena o ID do usuário
            username: res.data.user.username,
            email: res.data.user.email // Armazena o email do usuário
          };
          login(user); // Chama a função login do AuthContext
          Alert.alert('Sucesso', 'Login realizado com Google!');
          router.push('/Profile/profile'); // Redireciona para a página do perfil
        })
        .catch(err => {
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
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.orText}>Ou</Text>

      {clientId && (
        <TouchableOpacity
          onPress={() => promptAsync()}
          style={[styles.button, styles.googleButton]}
          disabled={!request || loading}
        >
          <Text style={styles.buttonText}>Continuar com Google</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => router.push('/Signup/signup')}>
        <Text style={styles.toggleText}>Não tem conta? Criar uma</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
