import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {children}
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default AppLayout;
