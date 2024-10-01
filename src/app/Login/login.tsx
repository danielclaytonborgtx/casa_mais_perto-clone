import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const handleLogin = () => {
    // Validação simples
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    
    setLoading(true); // Inicia o carregamento
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Simulação de uma chamada assíncrona para login
    setTimeout(() => {
      setLoading(false); // Para o carregamento
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      // Aqui você pode redirecionar o usuário após o login
    }, 2000); // Simulando tempo de carregamento
  };

  const handleCreateAccount = () => {
    console.log('Redirecionar para criação de conta');
  };

  const handleLoginWithGoogle = () => {
    console.log('Login com Google');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" /> // Carregador enquanto faz login
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      {/* Textos para criar conta e login com Google */}
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.linkText}>Criar Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginWithGoogle}>
        <Text style={styles.linkText}>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
