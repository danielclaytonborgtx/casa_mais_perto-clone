import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  updateButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Adiciona sombra no Android
  },
  marker: {
    width: 15, // Largura do marcador
    height: 15, // Altura do marcador
    borderRadius: 50, // Forma redonda
    backgroundColor: 'blue', // Cor do marcador
  },
});
