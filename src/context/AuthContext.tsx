import React, { createContext, useEffect, useState } from 'react';
import { User } from '../types/user';
import { getUser, setUser, deleteUser } from '../services/storageService';
import { loginApi, signupApi } from '../apis/auth';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (user: User) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: any) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session on app start
  useEffect(() => {
    restoreUser();
  }, []);

  const restoreUser = async () => {
    const stored = await getUser();
    if (stored) setUserState(stored);
    setLoading(false);
  };

  const signup = async (user: User) => {
    const res = await signupApi(user);
    setUser(res.data);
    setUserState(res.data);
  };

  const login = async (email: string, password: string) => {
    const stored = await getUser();
    const res = await loginApi(email, password, stored);
    setUserState(res.data);
  };

  const logout = async () => {
    await deleteUser();
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};