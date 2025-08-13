// src/services/pessoaService.ts

import api from "../../../components/axios/axiosInstance";


interface Filtros {
  nome?: string;
  cpf?: string;
  codigo?: string;
}

export async function fetchPessoas(filtros?: Filtros) {
  const response = await api.get('/api/pessoas', { params: filtros });
  console.log('[fetchPessoas] Dados recebidos:', response.data);
  return response.data;
}

export async function fetchPessoaById(id: string) {
  if (!id) throw new Error('ID inválido para busca');
  const response = await api.get(`/api/pessoas/${id}`);
  console.log(`[fetchPessoaById] Dados da pessoa ${id}:`, response.data);
  return response.data;
}

export async function savePessoa(data: any, id?: string) {
  const dataToSend = { ...data };
  if (!id && 'id' in dataToSend) delete dataToSend.id;

  const response = id
    ? await api.put(`/api/pessoas/${id}`, dataToSend)
    : await api.post('/api/pessoas', dataToSend);

  console.log(`[savePessoa] Resposta da API:`, response.data);
  return response.data;
}

export async function deletePessoa(id: string) {
  if (!id) throw new Error('ID inválido para exclusão');
  const response = await api.delete(`/api/pessoas/${id}`);
  console.log(`[deletePessoa] Resposta da exclusão:`, response.data);
  return response.data;
}
