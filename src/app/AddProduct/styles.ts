// src/components/styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailsInput: {
    height: 80, // Aumenta a altura para o campo de detalhes
  },
  map: {
    width: '100%',
    height: 300, // Aumente a altura do mapa
    marginBottom: 20, // Adicione um espaço abaixo do mapa
  },
  button: {
    backgroundColor: '#00FF00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20, // Aumente o espaço acima do botão
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FF00', // Cor do botão
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#000000',
  },
  linkText: {
    color: '#FF7F50',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default styles;
