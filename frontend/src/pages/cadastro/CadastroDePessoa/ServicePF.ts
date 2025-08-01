const API_URL = 'http://localhost:3000'; // Ajuste conforme sua URL base
interface Filtros {
  nome?: string;
  cpf?: string;
  codigo?: string;
}

// Função genérica para tratar erros e resposta JSON
async function fetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    let errorMessage = `Erro na requisição: ${res.status} ${res.statusText}`;
    if (data?.message) errorMessage = data.message;
    throw new Error(errorMessage);
  }

  console.log(`[fetchJson] URL: ${url}`, data);
  return data;
}


export async function fetchPessoas(filtros?: Filtros) {
  let url = `${API_URL}/api/pessoas`;

  if (filtros) {
    const params = new URLSearchParams();
    if (filtros.nome) params.append('nome', filtros.nome);
    if (filtros.cpf) params.append('cpf', filtros.cpf);
    if (filtros.codigo) params.append('codigo', filtros.codigo);
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
  }

  const data = await fetchJson(url);
  console.log('[fetchPessoas] Dados recebidos:', data);
  return data;
}


export async function fetchPessoaById(id: string) {
  if (!id) throw new Error('ID inválido para busca');
  const data = await fetchJson(`${API_URL}/api/pessoas/${id}`);
  console.log(`[fetchPessoaById] Dados da pessoa ${id}:`, data);
  return data;
}

export async function savePessoa(data: any, id?: string) {
  // Se for criação (POST), remova id do objeto para não enviar
  const dataToSend = { ...data };
  if (!id && 'id' in dataToSend) {
    delete dataToSend.id;
  }

  const url = id ? `${API_URL}/api/pessoas/${id}` : `${API_URL}/api/pessoas`;
  const method = id ? 'PUT' : 'POST';

  const result = await fetchJson(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  });
  console.log(`[savePessoa] Resposta da API para ${method} em ${url}:`, result);
  return result;
}


export async function deletePessoa(id: string) {
  if (!id) throw new Error('ID inválido para exclusão');
  const result = await fetchJson(`${API_URL}/api/pessoas/${id}`, { method: 'DELETE' });
  console.log(`[deletePessoa] Resposta da exclusão da pessoa ${id}:`, result);
  return result;
}
