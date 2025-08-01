// ServiceUnidade.ts
import axios from 'axios';
import { Unidade } from './HookTypes/types';

const API_BASE_URL = 'http://localhost:3000';

// Buscar unidades com filtros
export const fetchUnidades = async (filtros: {
  nome?: string;
  cnpj?: string;
  municipio?: string;
}): Promise<Unidade[]> => {
  const params = new URLSearchParams();
  if (filtros.nome) params.append('nome', filtros.nome);
  if (filtros.cnpj) params.append('cnpj', filtros.cnpj);
  if (filtros.municipio) params.append('municipio', filtros.municipio);

  const response = await axios.get(`${API_BASE_URL}/unidades`, { params });
  return response.data;
};

// Buscar unidade por código
export const fetchUnidadeByCodigo = async (codigo: string): Promise<Unidade> => {
  if (!codigo) throw new Error('Código inválido');
  const response = await axios.get(`${API_BASE_URL}/unidades/codigo/${codigo}`);
  return response.data;
};

// Criar ou atualizar unidade usando `codigo`
// ServiceUnidade.ts

export const saveUnidade = async (
  unidade: Unidade,
  codUnidade?: string
): Promise<Unidade> => {
  const payload = codUnidade ? unidade : { ...unidade };
  if (!codUnidade) delete (payload as any).codUnidade; // remove o codEmpresa se for criação

  const response = codUnidade
    ? await axios.put(`${API_BASE_URL}/unidades/${codUnidade}`, payload)
    : await axios.post(`${API_BASE_URL}/unidades`, payload);

  return response.data;
};
