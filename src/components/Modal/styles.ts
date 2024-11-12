import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-start', 
  },
  modalContent: {
    width: '70%',
    height: '80%',
    backgroundColor: '#FFA07A',
    padding: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    left: 0, 
    top: '10%', 
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    marginVertical: 2,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 18,
  },
  sidebar: {
    flex: 1,
    justifyContent: 'flex-start', 
  },
  
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    width: '100%',
  }
});
