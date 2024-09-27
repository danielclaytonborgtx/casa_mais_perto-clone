import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Adiciona um pouco de espaço nas bordas
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, // Espaço entre o título e a descrição
    color: '#808080',
  },
  description: {
    fontSize: 16,
    textAlign: 'center', // Centraliza o texto da descrição
    color: '#808080',
  },
});
