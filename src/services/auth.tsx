import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  username: string;
  email: string;
  // Você pode adicionar mais propriedades aqui conforme necessário
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Erro ao carregar o usuário do AsyncStorage:", error);
      }
    };
    loadUser();
  }, []);

  const login = async (user: User) => {
    try {
      console.log("Usuário fazendo login:", user);
      setUser(user);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log("Usuário salvo no AsyncStorage:", JSON.stringify(user));
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = async () => {
    try {
      console.log("Fazendo logout");
      setUser(null);
      await AsyncStorage.removeItem('user');
      console.log("Usuário removido do AsyncStorage");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
