import React, { createContext, useState, useEffect, useRef, ReactNode } from 'react';
import { getMe } from '../pages/login/authService';
import { trocarUnidadeBackend } from '../services/unidadeService';

export interface Unidade {
  codUnidade: string;
  nome: string;
  nomeReduzido?: string;
}

export interface UnidadeAtiva {
  unidadePadraoID: string;
  unidadePadraoNome: string;
  unidadeNomeReduzido?: string;
  unidadesDisponiveis: Unidade[];
}

export interface Perfil {
  nome: string;
}

export interface Setor {
  nome: string;
}

export interface UserInfo {
  codigo?: string;
  username?: string;
  fullname?: string;
  picture?: string;
  unidadeAtiva?: UnidadeAtiva;
  perfil?: Perfil;
  setor?: Setor;
}

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo | null) => void;
  setUnidadeAtiva: (unidade: Unidade) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  userInfo: null,
  setUserInfo: () => {},
  setUnidadeAtiva: async () => {},
  logout: () => {},
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('token'));
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });
  const [loading, setLoading] = useState(true);

  // Flag para evitar chamadas duplicadas no StrictMode
  const fetchedRef = useRef(false);

  const updateUserInfo = (user: UserInfo | null) => {
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
    } else {
      localStorage.removeItem('userInfo');
    }
    setUserInfoState(user);
  };

  const setUserInfo = (user: UserInfo | null) => {
    updateUserInfo(user);
  };

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    async function fetchUserInfo() {
      if (!token) {
        setUserInfoState(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await getMe();

        // Se unidadeNomeReduzido não existir, usa unidadePadraoNome
        if (data.unidadeAtiva) {
          data.unidadeAtiva.unidadeNomeReduzido =
            data.unidadeAtiva.unidadeNomeReduzido || data.unidadeAtiva.unidadePadraoNome;
        }

        updateUserInfo(data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        setUserInfoState(null);
        setTokenState(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
      } finally {
        setLoading(false);
      }
    }

    fetchUserInfo();
  }, [token]);

  const setUnidadeAtiva = async (unidade: Unidade) => {
    console.log('[setUnidadeAtiva] chamada com unidade:', unidade);

    if (!userInfo) {
      console.warn('[setUnidadeAtiva] userInfo não disponível');
      return;
    }
    if (!userInfo.unidadeAtiva) {
      console.warn('[setUnidadeAtiva] unidadeAtiva não disponível em userInfo');
      return;
    }
    if (!userInfo.codigo) {
      console.warn('[setUnidadeAtiva] código do usuário não disponível');
      return;
    }
    if (!token) {
      console.error('[setUnidadeAtiva] Token não disponível para trocar unidade');
      return;
    }

    try {
      const codUnidade = unidade.codUnidade;
      console.log('[setUnidadeAtiva] enviando para backend, codUnidade:', codUnidade, 'codigo usuário:', userInfo.codigo);

      const result = await trocarUnidadeBackend(userInfo.codigo, codUnidade);
      console.log('Resposta do backend:', result);

      if (result.status !== 'success') {
        throw new Error(result.message || 'Falha ao trocar unidade');
      }

      const novoUserInfo: UserInfo = {
        ...userInfo,
        unidadeAtiva: {
          ...userInfo.unidadeAtiva,
          unidadePadraoID: codUnidade,
          unidadeNomeReduzido: unidade.nomeReduzido,
          unidadePadraoNome: unidade.nome,
          unidadesDisponiveis: userInfo.unidadeAtiva.unidadesDisponiveis,
        },
      };

      console.log('[setUnidadeAtiva] Atualizando userInfo local com:', novoUserInfo);
      updateUserInfo(novoUserInfo);
    } catch (error: any) {
      console.error('[setUnidadeAtiva] Erro ao trocar unidade:', error);
      alert('Erro ao trocar unidade. Por favor, tente novamente.');
    }
  };

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      setUserInfoState(null);
    }
    setTokenState(newToken);
  };

  const logout = () => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userInfo,
        setUserInfo,
        logout,
        loading,
        setUnidadeAtiva,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
