import api from "../../components/axios/axiosInstance";


export async function login(username: string, password: string): Promise<string> {
  try {
    const response = await api.post('/auth/login', { username, password });
    const { access_token } = response.data;

    localStorage.setItem('token', access_token);

    return access_token;
  } catch (error: any) {
    console.error('Erro no login:', error.response?.data || error.message);
    throw new Error('Usuário ou senha inválidos');
  }
}

/**
 * Busca os dados do usuário autenticado.
 * O token já é enviado automaticamente pelo interceptor do axios.
 */
export async function getMe(): Promise<any> {
  try {
    const response = await api.get('/auth/me');
    console.log('Dados retornados do /auth/me:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar dados do usuário:', error.response?.data || error.message);
    throw new Error('Erro ao buscar dados do usuário');
  }
}
