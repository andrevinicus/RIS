import React, { createContext, useState, ReactNode } from 'react';

export interface UserInfo {
  realname?: string;
  picture?: string;
  email?: string;
  // outros campos que precisar
}

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  userInfo: null,
  setUserInfo: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const logout = () => {
    setToken(null);
    setUserInfo(null);
    // Limpar storage local ou outras limpezas aqui, se necessário
  };

  return (
    <AuthContext.Provider value={{ token, setToken, userInfo, setUserInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
