import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  googleButton: {
    backgroundColor: '#db4437',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    color: '#aaa',
    marginVertical: 10,
  },
  toggleText: {
    textAlign: 'center',
    color: '#007bff',
    marginTop: 15,
  },
  loggedInUserText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333', // ou a cor que você preferir
  },
});
