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
