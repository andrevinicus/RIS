import { IsString, IsEmail, IsOptional, IsEnum, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class UnidadeDto {
  @IsString()
  id: string;

  @IsString()
  nome: string;
}

export class CreateUsuarioDto {
  
  @IsString()
  nomeCompleto: string;

  @IsString()
  usuario: string;

  @IsString()
  @IsOptional()
  senha?: string;

  @IsString()
  @IsOptional()
  usuarioCriacao?: string;

  @IsOptional()
  @IsDateString()
  dataCriacao?: string;

  @IsString()
  @IsOptional()
  setor?: string;

  @IsString()
  @IsOptional()
  paginaInicial?: string;

  @IsString()
  @IsOptional()
  pessoaFisicaId?: string;

  @IsString()
  @IsOptional()
  pessoaFisicanome?: string;

  @IsString()
  unidadePadraoId: string;

  @IsString()
  unidadePadrao: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnidadeDto)
  @IsOptional()
  unidades?: UnidadeDto[];

  @IsEmail()
  email: string;

  @IsEnum(['ativo', 'inativo'])
  situacao: 'ativo' | 'inativo';
}
