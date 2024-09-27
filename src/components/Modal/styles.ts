import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-start', // Alinha ao início
  },
  modalContent: {
    width: '50%', // Largura do modal
    height: '80%', // Ajuste a altura para não cobrir o header e footer
    backgroundColor: '#DCDCDC',
    padding: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    left: 0, // Para começar na esquerda
    top: '10%', // Para dar um espaço do topo
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A9A9A9', // Cor do botão
    padding: 20,
    borderRadius: 5,
    marginVertical: 2,
    width: '100%', // Para ocupar toda a largura
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    marginLeft: 10, // Espaçamento entre o ícone e o texto
    fontSize: 18,
  },
  sidebar: {
    flex: 1,
    justifyContent: 'flex-start', // Alinha os itens ao topo
  },
});
