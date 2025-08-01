import axios from 'axios';
import { PessoaJuridica } from "./PessoaJuridicaForms/types";

const API_URL = 'http://localhost:3000/pessoas-juridicas';

// Buscar todas ou com filtros
export async function fetchPessoasJuridicas(filters: {
  codigo?: string;
  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;
} = {}): Promise<PessoaJuridica[]> {
  // Axios já monta o query string a partir do objeto params
  const response = await axios.get<PessoaJuridica[]>(API_URL, { params: filters });
  return response.data;
}

// Buscar pessoa jurídica por ID
export async function fetchPessoaJuridicaById(id: string): Promise<PessoaJuridica | null> {
  try {
    const response = await axios.get<PessoaJuridica>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error('Erro ao buscar pessoa jurídica:', error);
    throw error;
  }
}

// Criar ou atualizar pessoa jurídica
export async function savePessoaJuridica(data: PessoaJuridica, id?: string): Promise<PessoaJuridica | null> {
  try {
    const payload = id ? data : { ...data, id: undefined };

    const response = id
      ? await axios.put<PessoaJuridica>(`${API_URL}/${id}`, payload)
      : await axios.post<PessoaJuridica>(API_URL, payload);

    return response.data;
  } catch (error) {
    console.error('Erro ao salvar pessoa jurídica:', error);
    return null;
  }
}
