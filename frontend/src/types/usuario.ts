export interface UnidadeSimples {
  id: string;
  nome: string;
}

export interface Usuario {
  codigo: string;
  nomeCompleto: string;
  usuario: string;
  senha?: string;
  usuarioCriacao?: string;
  dataCriacao?: string;
  setor?: string;
  paginaInicial?: string;
  pessoaFisicaId?: string;
  pessoaFisicanome?: string;
  unidadePadraoId: string;
  unidadePadrao: string;
  unidades?: UnidadeSimples[];
  email: string;
  situacao: 'ativo' | 'inativo';
}
