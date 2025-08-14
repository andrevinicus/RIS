import { IsString, IsOptional, Length } from 'class-validator';

export class CreateConvenioDto {
  @IsString()
  @Length(1, 255)
  nome: string; // Nome ou descrição do convênio

  @IsString()
  @IsOptional()
  @Length(0, 100)
  contato?: string;

  @IsString()
  @IsOptional()
  @Length(0, 20)
  telefone?: string;

  @IsString()
  @IsOptional()
  @Length(0, 50)
  codigoAns?: string;

  @IsString()
  pessoaJuridicaCodigo: string; // Código da pessoa jurídica vinculada
}
