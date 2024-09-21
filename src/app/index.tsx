import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Casa Mais Perto</Text>
      <Text style={styles.description}>
        Este aplicativo tem como objetivo ajudá-lo a encontrar casas disponíveis para compra ou aluguel nas proximidades.
      </Text>
    </View>
  );
};

export default Index;
