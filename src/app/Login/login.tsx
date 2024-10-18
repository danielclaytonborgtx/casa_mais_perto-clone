import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { styles } from './styles';

const Login = () => {
  const [clientId, setClientId] = useState<string | null>(null); // Permite que o clientId seja null inicialmente

  useEffect(() => {
    const androidClientId = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;
    const webClientId = Constants.expoConfig?.extra?.WEB_CLIENT_ID;

    // Verifica e configura o clientId dependendo da plataforma
    if (androidClientId) {
      setClientId(androidClientId);
    } else if (webClientId) {
      setClientId(webClientId);
    } else {
      console.error('ClientId não está definido corretamente.');
      Alert.alert('Erro', 'ClientId não foi configurado corretamente.');
    }
  }, []);

  // Somente cria a request se o clientId estiver definido
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: clientId || '', // Garante que nunca passamos null, usando uma string vazia como fallback
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      Alert.alert('Login realizado com sucesso!', `Token: ${id_token}`);
    } else if (response?.type === 'error') {
      Alert.alert('Erro', 'Falha na autenticação.');
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      {clientId ? (
        <Button
          disabled={!request}
          title="Continuar com Google"
          onPress={() => promptAsync()}
        />
      ) : (
        <Text>Carregando configurações...</Text>
      )}
      <Text style={styles.smallText}>Logar com Google</Text>
    </View>
  );
};

export default Login;
