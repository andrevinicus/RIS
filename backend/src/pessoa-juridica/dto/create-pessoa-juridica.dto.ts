// src/pessoa-juridica/dto/create-pessoa-juridica.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class CreatePessoaJuridicaDto {
  @IsOptional()
  @IsString()
  codigo?: string;

  @IsNotEmpty()
  @IsString()
  razao_social: string;

  @IsOptional()
  @IsString()
  nome_fantasia?: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsOptional()
  @IsString()
  inscricao_estadual?: string;

  @IsOptional()
  @IsString()
  inscricao_municipal?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefone_comercial?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  pais?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  responsavel?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsNotEmpty()
  @IsString()
  codigoUnidade: string;
}
