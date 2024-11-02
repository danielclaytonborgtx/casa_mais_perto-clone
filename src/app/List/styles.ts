// src/app/List/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Fundo claro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Cor do título
    textAlign: 'center'
  },
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    padding: 16,
    marginBottom: 16,
  },
  propertyInfo: {
    marginBottom: 10,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Cor azul para o título do imóvel
  },
  propertyValue: {
    fontSize: 16,
    color: '#666', // Cor do valor
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10, // Bordas arredondadas na imagem
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
