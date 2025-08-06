import axios from 'axios';
import { Usuario } from './types';
import { Unidade } from '../CadastroUnidades/HookTypes/types'; // ajuste o caminho conforme seu projeto

const API_URL = 'http://localhost:3000'; // ajuste se necessário
const LINK = '/usuarios';

// Buscar todos os usuários
export async function fetchUsuarios(): Promise<Usuario[]> {
  const response = await axios.get(`${API_URL}${LINK}`);
  return response.data;
}

// Buscar usuário por ID
export async function fetchUsuarioById(id: string): Promise<Usuario> {
  const response = await axios.get(`${API_URL}${LINK}/${id}`);
  return response.data;
}

// Criar ou atualizar usuário
export async function saveUsuario(data: any, id?: string): Promise<Usuario> {
  if (id) {
    const response = await axios.put(`${API_URL}${LINK}/${id}`, data);
    return response.data;
  } else {
    const response = await axios.post(`${API_URL}${LINK}`, data);
    return response.data;
  }
}

// Deletar usuário
export async function deleteUsuario(id: string): Promise<void> {
  await axios.delete(`${API_URL}${LINK}/${id}`);
}

// Buscar unidades vinculadas a um usuário pelo ID
export async function fetchUnidadesVinculadas(usuarioId: string): Promise<Unidade[]> {
  const response = await axios.get(`${API_URL}${LINK}/${usuarioId}/unidades`);
  return response.data;
}
export async function salvarUnidadesVinculadas(usuarioCodigo: string, unidades: string[]): Promise<void> {
  await axios.post(`/api/usuarios/${usuarioCodigo}/vincular-unidades`, { unidades });
}