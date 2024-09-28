// src/app/SobreNos/SobreNos.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre Nós</Text>
      <Text style={styles.paragraph}>
        Nosso aplicativo busca excelência no ramo imobiliário, oferecendo aos nossos usuários as melhores
        opções de casas e apartamentos. Nosso compromisso é com a qualidade e a satisfação dos nossos clientes.
      </Text>
    </View>
  );
};

export default AboutUs;
