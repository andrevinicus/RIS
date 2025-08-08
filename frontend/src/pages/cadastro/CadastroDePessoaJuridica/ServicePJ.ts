// services/pessoaJuridicaService.ts

import api from "../../../components/axiosInstance";
import { PessoaJuridica } from "./PessoaJuridicaForms/types";

const API_URL = '/pessoas-juridicas'; // já temos baseURL no axios

// Buscar todas ou com filtros
export async function fetchPessoasJuridicas(filters: {
  codigo?: string;
  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;
} = {}): Promise<PessoaJuridica[]> {
  const response = await api.get<PessoaJuridica[]>(API_URL, { params: filters });
  return response.data;
}

// Buscar por ID
export async function fetchPessoaJuridicaById(id: string): Promise<PessoaJuridica | null> {
  try {
    const response = await api.get<PessoaJuridica>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) return null;
    console.error('Erro ao buscar pessoa jurídica:', error);
    throw error;
  }
}

// Deletar
export async function deletePessoaJuridica(id: string): Promise<void> {
  await api.delete(`${API_URL}/${id}`);
}

// Criar ou atualizar
export async function savePessoaJuridica(data: PessoaJuridica, id?: string): Promise<PessoaJuridica | null> {
  try {
    const payload = id ? data : { ...data, id: undefined };

    const response = id
      ? await api.put<PessoaJuridica>(`${API_URL}/${id}`, payload)
      : await api.post<PessoaJuridica>(API_URL, payload);

    return response.data;
  } catch (error) {
    console.error('Erro ao salvar pessoa jurídica:', error);
    return null;
  }
}
