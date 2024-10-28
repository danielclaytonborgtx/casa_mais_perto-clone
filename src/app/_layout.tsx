import React from 'react';
import { Slot } from 'expo-router';  // Importando o Slot para renderizar as rotas
import AppLayout from '../components/AppLayout/appLayout';
import { AuthProvider } from '../services/auth';

const Layout = () => {
  return (
    <AuthProvider>
      <AppLayout>
        <Slot />
      </AppLayout>
    </AuthProvider>
  );
};

export default Layout;
