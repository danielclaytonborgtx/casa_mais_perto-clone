import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00FF00',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // Adiciona um espaço maior antes dos links
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
  linkText: {
    color: '#090909',
    fontSize: 14,
    marginBottom: 10, // Espaço entre os links
    textDecorationLine: 'none',
  },
});

export default styles;
