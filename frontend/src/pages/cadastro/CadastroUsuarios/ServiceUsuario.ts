
import api from '../../../components/axios/axiosInstance';
import { Unidade, UnidadeSimples, Usuario } from '../../../types/types';
// ajuste o caminho conforme seu projeto

 // ajuste se necessário
const LINK = '/usuarios';

// Buscar todos os usuários
export async function fetchUsuarios(): Promise<Usuario[]> {
  const response = await api.get(`${LINK}`);
  return response.data;
}

// Buscar usuário por ID
export async function fetchUsuarioById(id: string): Promise<Usuario> {
  const response = await api.get(`${LINK}/${id}`);
  return response.data;
}

// Criar ou atualizar usuário
export async function saveUsuario(data: any, id?: string): Promise<Usuario> {
  if (id) {
    const response = await api.put(`${LINK}/${id}`, data);
    return response.data;
  } else {
    const response = await api.post(`${LINK}`, data);
    return response.data;
  }
}

// Deletar usuário
export async function deleteUsuario(id: string): Promise<void> {
  await api.delete(`${LINK}/${id}`);
}

// Buscar unidades vinculadas a um usuário pelo ID
export async function fetchUnidadesVinculadas(codigo: string): Promise<Unidade[]> {
  try {
    const response = await api.get<Unidade[]>(`${LINK}/${codigo}/unidades`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar unidades vinculadas do usuário ${codigo}:`, error);
    // Retorna array vazio em caso de erro para não quebrar a aplicação
    return [];
  }
}
// Salvar unidades vinculadas a um usuário


export async function salvarUnidadesVinculadas(
  codigo: string,
  unidades: UnidadeSimples[],
): Promise<void> {
  console.log('[salvarUnidadesVinculadas] Unidades recebidas:', unidades);
  const codigosUnidades = unidades.map(u => u.id); // extrai só os ids (códigos)
  console.log('[salvarUnidadesVinculadas] Códigos extraídos:', codigosUnidades);

  // Envia o array simples para o backend
  await api.post(`${LINK}/${codigo}/vincular-unidades`, codigosUnidades);
}
