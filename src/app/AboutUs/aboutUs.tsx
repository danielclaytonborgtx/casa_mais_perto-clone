// src/app/SobreNos/SobreNos.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Casa Mais Perto 🏡</Text>
      <Text style={styles.paragraph}>
          Encontre seu novo lar de forma rápida e prática com o Casa Mais Perto! Nossa plataforma foi desenvolvida para facilitar a busca pelo imóvel ideal, conectando você a casas e apartamentos disponíveis ao seu redor. Com uma interface intuitiva e integrada ao mapa, você pode visualizar todas as opções próximas à sua localização, garantindo que você descubra o imóvel perfeito na região que você mais ama.
          Encontrar seu novo lar ficou mais fácil e rápido.
      </Text>
    </View>
  );
};

export default AboutUs;
