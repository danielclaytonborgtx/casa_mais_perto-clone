// src/app/Contato/Contato.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Text as RNText } from 'react-native';
import { styles } from './styles';

const Contato = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contato</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} placeholder="Digite seu nome" />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput style={styles.input} placeholder="Digite seu e-mail" keyboardType="email-address" />

      <Text style={styles.label}>Mensagem:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Digite sua mensagem"
        multiline={true}
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={() => alert('Mensagem enviada!')}>
        <RNText style={styles.buttonText}>Enviar</RNText>
      </TouchableOpacity>
    </View>
  );
};

export default Contato;
