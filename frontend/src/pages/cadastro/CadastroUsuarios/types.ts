// src/pages/cadastro/CadastroUnidades/CadastroUsuarios/types.ts

export interface Usuario {
  codigo: string;
  nomeCompleto: string;
  usuario: string;             // login do usuário
  senha?: string;
  usuarioCriacao?: string;     // só leitura
  dataCriacao?: string;        // só leitura, ISO string ou Date formatado
  setor?: string;
  paginaInicial?: string;
  pessoaFisicaId?: string;
  pessoaFisicanome?: string;    // id da pessoa física vinculada
  unidadePadraoId: string;
  unidadePadrao?: { codigo: string; nome: string };
  unidades?: { id: string; nome: string }[];
  email: string;
  situacao: 'ativo' | 'inativo';
}
