import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from './styles';

const Footer: React.FC = () => {
  const router = useRouter();

  // Função de navegação ajustada
  const navigateTo = (path: string) => {
    router.push(path as any); // Usando o tipo 'any' como workaround
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo('/Map/map')} // Ajuste a rota aqui
        accessibilityLabel="Navegar para o Mapa"
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="map" size={32} color="white" />
          <Text style={styles.buttonText}>Mapa</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo('/List/list')} // Ajuste a rota aqui
        accessibilityLabel="Navegar para a Lista"
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="list" size={32} color="white" />
          <Text style={styles.buttonText}>Lista</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
