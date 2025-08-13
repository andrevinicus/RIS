import { Unidade } from '../../../types/types';
import api from '../../../components/axios/axiosInstance';

// Buscar unidades com filtros
export const fetchUnidades = async (filtros: {
  nome?: string;
  cnpj?: string;
  codUnidade?: string;
  municipio?: string;
} = {}): Promise<Unidade[]> => {
  const params = new URLSearchParams();
  if (filtros.nome) params.append('nome', filtros.nome);
  if (filtros.cnpj) params.append('cnpj', filtros.cnpj);
  if (filtros.codUnidade) params.append('codUnidade', filtros.codUnidade);
  if (filtros.municipio) params.append('municipio', filtros.municipio);

  const response = await api.get('/unidades', { params });
  return response.data;
};

// Buscar unidade por código
export const fetchUnidadeByCodigo = async (codigo: string): Promise<Unidade> => {
  if (!codigo) throw new Error('Código inválido');
  const response = await api.get(`/unidades/codigo/${codigo}`);
  return response.data;
};

// Deletar unidade
export async function deleteUnidade(codUnidade: string): Promise<void> {
  await api.delete(`/unidades/${codUnidade}`);
}

// Criar ou atualizar unidade
export const saveUnidade = async (
  unidade: Unidade,
  codUnidade?: string
): Promise<Unidade> => {
  const payload = codUnidade ? unidade : { ...unidade };
  if (!codUnidade) delete (payload as any).codUnidade;

  const response = codUnidade
    ? await api.put(`/unidades/${codUnidade}`, payload)
    : await api.post('/unidades', payload);

  return response.data;
};
