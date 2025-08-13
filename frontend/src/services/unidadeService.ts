import api from "../components/axios/axiosInstance";

interface TrocaUnidadeResponse {
  status: 'success' | 'error' | string;
  message: string;
  data?: any;
}

export async function trocarUnidadeBackend(codigoUsuario: string, unidadeId: string): Promise<TrocaUnidadeResponse> {
  try {
    const response = await api.post<TrocaUnidadeResponse>(`/usuarios/${codigoUsuario}/trocar-unidade`, {
      unidadeId,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao trocar unidade no backend:', error);
    throw error;
  }
}
