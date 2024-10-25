import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { styles } from './styles';
import axios from 'axios';

interface LoginProps {
  onLoginSuccess: (userId: number) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    const androidClientId = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;
    const webClientId = Constants.expoConfig?.extra?.WEB_CLIENT_ID;

    setClientId(androidClientId || webClientId || null);
  }, []);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: clientId || '',
    // Inclua scopes se necessário
    scopes: ['profile', 'email'], // Adicione escopos adicionais conforme necessário
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      // API para verificar o token e obter o userId
      axios.post('http://<SEU_IP>:3000/auth/google', { id_token })
        .then(res => {
          const { userId } = res.data; // Supondo que a resposta contém o userId
          onLoginSuccess(userId);
          Alert.alert('Login realizado com sucesso!', `User ID: ${userId}`);
        })
        .catch(err => {
          console.error(err);
          Alert.alert('Erro', 'Falha ao obter o userId.');
        });
    } else if (response?.type === 'error') {
      Alert.alert('Erro', 'Falha na autenticação.');
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      
      {clientId ? (
        <TouchableOpacity 
          style={[styles.button, !request && styles.buttonDisabled]} 
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Text style={styles.buttonText}>Continuar com Google</Text>
        </TouchableOpacity>
      ) : (
        <Text>Carregando configurações...</Text>
      )}
      
      <Text style={styles.smallText}>Logar com Google</Text>
    </View>
  );
};

export default Login;
