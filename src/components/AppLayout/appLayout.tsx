import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import Header from '../Header/header';
import Footer from '../Footer/footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  console.log('AppLayout renderizado'); // Log de depuração

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {children}
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default AppLayout;
