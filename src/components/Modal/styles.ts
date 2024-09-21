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
    backgroundColor: 'lightgray',
    padding: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    left: 0, // Para começar na esquerda
    top: '10%', // Para dar um espaço do topo
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeText: {
    fontSize: 24,
    color: 'black',
  },
  sidebar: {
    flex: 1,
    justifyContent: 'flex-start', // Alinha os itens ao topo
  },
  sidebarItem: {
    fontSize: 18,
    marginVertical: 10,
    padding: 10, // Adiciona um pouco de espaço ao redor dos itens
  },
  sidebarItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
