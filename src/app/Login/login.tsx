import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // lógica de login
    console.log('Email:', email);
    console.log('Password:', password);
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
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
