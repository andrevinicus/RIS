// src/store/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login as loginApi, getMe as getMeApi } from '../pages/login/authService';

interface Unidade {
  id: string;
  nome: string;
}

interface Perfil {
  nome: string;
}

interface Setor {
  nome: string;
}

interface UserInfo {
  username: string;
  realname: string;
  unidadeAtiva: {
    unidadePadraoID: string;
    unidadePadraoNome: string;
    unidadesDisponiveis: Unidade[];
  };
  perfil: Perfil;
  setor: Setor;
}

interface AuthState {
  token: string | null;
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userInfo: null,
  loading: false,
  error: null,
};

// Async thunk para login
export const login = createAsyncThunk<string, { username: string; password: string }>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const token = await loginApi(username, password);
      return token;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk para buscar dados do usuário
export const fetchUserInfo = createAsyncThunk<UserInfo>(
  'auth/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMeApi();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
        localStorage.setItem('token', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Erro no login';
      })
      // fetchUserInfo
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Erro ao buscar dados do usuário';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
