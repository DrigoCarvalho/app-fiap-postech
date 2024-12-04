import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext<{
  user: User | null;
  loginEfetuado: (userId: string) => void;
  logout: () => void;
  getUser: () => User | null;
}>({
  user: null,
  loginEfetuado: (userId: string) => {},
  logout: () => {},
  getUser: () => null,
});

import { ReactNode } from "react";
import User from "../interfaces/user";
import { deleteUser, getAuth } from "firebase/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  

  const loginEfetuado = async (userId: string) => {
    
    console.log('userId', userId);
    try {
      const response = await fetch(
        `https://api-dkviu3xq7a-uc.a.run.app/user?userId=${userId}`
      );
      const userData = await response.json();
      if (response.status === 404) {
        console.log('excluir', userId);
        excluirUsuarioAuth(userId);
      }
      setUser(userData);
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const excluirUsuarioAuth = async (id: string) => {
    const userFirebase = auth.currentUser;
    console.log('userFirebase', userFirebase);
    if(id === userFirebase?.uid){
      try {
        if (userFirebase) {
          await deleteUser(userFirebase);
          logout();
        }
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (e) {
        console.error(e);
    }
    
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

export const useAuth = () => useContext(AuthContext);
