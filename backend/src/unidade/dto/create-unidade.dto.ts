import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateUnidadeDto {
  @IsOptional() 
  @IsString()
  codUnidade: string;

  @IsNotEmpty()
  @IsString()
  nomeReduzido: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  ramoAtividade: string;

  @IsNotEmpty()
  @IsString()
  razaoSocial: string;

  @IsNotEmpty()
  @IsString()
  inscricaoEstadual: string;

  @IsNotEmpty()
  @IsString()
  inscricaoMunicipal: string;

  @IsNotEmpty()
  @IsString()
  regJuntaComercial: string;

  @IsNotEmpty()
  @IsString()
  regCartorio: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsDateString()
  despachoData?: string;

  @IsNotEmpty()
  @IsString()
  nomeResponsavel: string;

  @IsNotEmpty()
  @IsString()
  cpfResponsavel: string;

  @IsNotEmpty()
  @IsString()
  codCargo: string;

  @IsNotEmpty()
  @IsString()
  cargoResponsavel: string;

  @IsNotEmpty()
  @IsString()
  cnes: string;

  @IsNotEmpty()
  @IsString()
  logradouro: string;

  @IsNotEmpty()
  @IsString()
  endereco: string;

  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  cep: string;

  @IsNotEmpty()
  @IsString()
  codIbge: string;

  @IsNotEmpty()
  @IsString()
  municipio: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  matriz: boolean;
}
