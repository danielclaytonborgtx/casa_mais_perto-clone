import React from 'react';
import { Slot } from 'expo-router';  // Importando o Slot para renderizar as rotas
import AppLayout from '../components/AppLayout/appLayout';

const Layout = () => {
  return (
    <AppLayout>
      <Slot />
    </AppLayout>
  );
};

export default Layout;
