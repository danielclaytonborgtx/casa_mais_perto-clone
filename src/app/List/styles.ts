// src/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  propertyCard: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
    alignItems: 'center', // Alinhar imagem e informações
  },
  propertyInfo: {
    flex: 1, // Para que a informação ocupe o espaço restante
    marginRight: 10, // Espaço entre texto e imagem
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  propertyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
});
