import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface UserInfo {
  realname?: string;
  picture?: string;
  email?: string;
}

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo | null) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  userInfo: null,
  setUserInfo: () => {},
  logout: () => {},
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserInfo = localStorage.getItem('userInfo');

    if (savedToken) {
      setTokenState(savedToken);
    }
    if (savedUserInfo) {
      setUserInfoState(JSON.parse(savedUserInfo));
    }
    setLoading(false); // 👈 Finaliza o loading depois de checar o storage
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(newToken);
  };

  const setUserInfo = (user: UserInfo | null) => {
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
    } else {
      localStorage.removeItem('userInfo');
    }
    setUserInfoState(user);
  };

  const logout = () => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, userInfo, setUserInfo, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
