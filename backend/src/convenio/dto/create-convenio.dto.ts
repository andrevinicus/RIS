// create-convenio.dto.ts
import { IsString, IsOptional, Length, IsEnum } from 'class-validator';

export class CreateConvenioDto {

  @IsString()
  codigo: string;

  @IsString()
  @Length(1, 255)
  nome: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  site?: string;

  @IsString()
  @IsOptional()
  @Length(0, 1000)
  email?: string;

  @IsString()
  @IsOptional()
  @Length(0, 1000)
  obs?: string;

  @IsString()
  @IsOptional()
  @Length(0, 20)
  telefone?: string;

  @IsString()
  @IsOptional()
  @Length(0, 50)
  codigoAns?: string;

  @IsString()
  pessoaJuridicaCodigo: string; // FK via código da pessoa jurídica

  @IsOptional()
  @IsEnum(['particular', 'publico', 'cortesia'])
  tipo?: 'particular' | 'publico' | 'cortesia';

  @IsOptional()
  @IsEnum(['privado', 'publico', 'particular'])
  formaPagamento?: 'privado' | 'publico' | 'particular';
}
