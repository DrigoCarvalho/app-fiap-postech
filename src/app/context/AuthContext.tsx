import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext<{
  user: User | null;
  loginEfetuado: (userId: string, token: string) => void;
  logout: () => void;
  getUser: () => User | null;
}>({
  user: null,
  loginEfetuado: (userId: string, token: string) => {},
  logout: () => {},
  getUser: () => null,
});

import { ReactNode } from "react";
import User from '../interfaces/user'
import { deleteUser, getAuth } from 'firebase/auth'

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  const userFirebase = auth.currentUser;

  const loginEfetuado = async (userId: string, token: string) => {
    try {
      const response = await fetch(`https://api-dkviu3xq7a-uc.a.run.app/user?userId=${userId}`);
      const userData = await response.json();
      console.log('response', response.status)
      if(response.status === 404) {
        excluirUsuarioAuth();
      }
      setUser(userData);
    } catch (error: any) {
      console.error('Erro ao buscar usuário:', error);
      
    }
    
    
  };

  const excluirUsuarioAuth = async () => {
    try {
      if (userFirebase) {
        await deleteUser(userFirebase);
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
   }

  const logout = () => {
    setUser(null);
  };

  const getUser = () => {
    return user;
  };

  return (
    <AuthContext.Provider value={{ user, loginEfetuado, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth= () => useContext(AuthContext);
