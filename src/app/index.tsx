import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Index = () => {
  return (
    <View style={styles.container}>
      <Text>Conteúdo da tela inicial</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;
