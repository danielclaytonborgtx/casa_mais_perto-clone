import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios'; // Certifique-se de que a importação está correta
import { styles } from './styles';

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState(''); // Alterado para username
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.post('https://casa-mais-perto-server-clone-production.up.railway.app/register', { username, password }); // Alterado para usar username
      
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Conta criada com sucesso! Você pode fazer login agora.');
        router.push('/Login/login'); // Redireciona para a página de login
      } else {
        Alert.alert('Erro', 'Falha ao criar conta. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);

      // Tratamento de erro genérico
      const errorMessage = (error as any).response?.data?.error || 'Falha ao criar conta. Tente novamente.'; // Alterado para acessar a mensagem de erro correta
      Alert.alert('Erro', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        placeholder="Username" // Alterado para Username
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
