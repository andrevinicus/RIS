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
