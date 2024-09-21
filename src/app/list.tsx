// src/listScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Lista de imóveis</Text>
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

export default ListScreen;
