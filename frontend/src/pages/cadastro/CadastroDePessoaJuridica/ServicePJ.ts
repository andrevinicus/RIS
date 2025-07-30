import { PessoaJuridica } from "./PessoaJuridicaForms/types";

const API_URL = 'http://localhost:3000/pessoas-juridicas';

// Buscar todas ou com filtros
export async function fetchPessoasJuridicas(filters: {
  codigo?: string;
  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;
} = {}): Promise<PessoaJuridica[]> {
  const params = new URLSearchParams();

  if (filters.codigo) params.append('codigo', filters.codigo);
  if (filters.cnpj) params.append('cnpj', filters.cnpj);
  if (filters.razao_social) params.append('razao_social', filters.razao_social);
  if (filters.nome_fantasia) params.append('nome_fantasia', filters.nome_fantasia);

  const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;

  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erro ao buscar pessoas jurídicas: ${text}`);
  }

  return await response.json();
}
export async function fetchPessoaJuridicaById(id: string): Promise<PessoaJuridica | null> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    const text = await response.text();
    throw new Error(`Erro ao buscar pessoa jurídica: ${text}`);
  }
  return await response.json();
}

// Criar ou atualizar uma pessoa jurídica
export async function savePessoaJuridica(data: PessoaJuridica, id?: string): Promise<PessoaJuridica | null> {
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  // Remover 'id' do payload se for criação (POST)
  const payload = id ? data : { ...data, id: undefined };

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('Erro ao salvar pessoa jurídica:', text);
    return null;
  }

  return await response.json();
}
