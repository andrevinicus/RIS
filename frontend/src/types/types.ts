import { RouteObject } from "react-router-dom";

// src/pages/cadastro/CadastroUnidades/CadastroUsuarios/types.ts
export interface  UnidadeSimples  { id: string; nome: string };
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
  unidadePadrao: string;
  unidades?: { id: string; nome: string }[];
  email: string;
  situacao: 'ativo' | 'inativo';
}
// src/pages/Unidade/types.ts
export interface Unidade {

  codUnidade: string;
  nomeReduzido: string;
  nome: string;
  cnpj: string;
  ramoAtividade: string;
  razaoSocial: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  regJuntaComercial: string;
  regCartorio: string;
  status: string;
  despachoData: string; // ou Date, dependendo do seu formato
  nomeResponsavel: string;
  cpfResponsavel: string;
  codCargo: string;
  cargoResponsavel: string;
  cnes: string;
  logradouro: string;
  endereco: string;
  numero: string;
  bairro: string;
  cep: string;
  codIbge: string;
  municipio: string;
  telefone: string;
  email: string;
  matriz: boolean;
}

// src/components/PessoaFisicaGrid/types.ts


export interface PessoaFisica {
  id: string;
  codigo: string;
  name: string;
  cpf: string;
  document_number: string;
  document_type: string;
  email: string;
  phone_mobile_number: string;
  phone_work_number: string;
  birth_date: string;
  sex: string;
  weight: string;
  height: string;
  contact: string;
  marital_status: string;
  mother_name: string;
  father_name: string;
  address: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  nationality: string;
  insurance_id: string;
  insurance_card_number: string;
  observations: string;
  idade: string; // pode ser calculado, mas está no tipo
}
export type AppRouteObject = RouteObject & {
  protected?: boolean;
};
export interface RouteType {
  path: string;
  element: React.ReactElement;
  protected?: boolean;
  children?: RouteType[];
  key?: string;
  label?: string;
  submenu?: RouteType[]; // se quiser manter submenu também
}
