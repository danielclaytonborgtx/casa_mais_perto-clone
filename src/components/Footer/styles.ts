// components/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 3,
    backgroundColor: '#FF7F50',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    marginLeft: 8,
    fontSize: 16,
  },
});
