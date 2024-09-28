import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 15, // Ajuste o valor para garantir que o header não fique muito em cima
      paddingHorizontal: 10,
      backgroundColor: '#FF7F50',
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
    },
    menuButton: {
      marginRight: 10,
      marginTop: 10,
    },
    searchInput: {
      flex: 1,
      height: 40,
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: '#FFFFFF',
      marginTop: 10,
    },
  });