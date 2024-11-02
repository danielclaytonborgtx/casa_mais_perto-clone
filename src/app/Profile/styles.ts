// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff4757',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  noImoveisText: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 18,
    color: '#888',
  },
  propertyCard: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  propertyDetails: {
    flex: 1,
    paddingRight: 10,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  propertyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  imagesContainer: {
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  editIcon: {
    marginRight: 8,
  },
  deleteIcon: {
    marginRight: 0,
  },
});
