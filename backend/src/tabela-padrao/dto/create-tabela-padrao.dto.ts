import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTabelaPadraoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  descricao: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  codTiss?: string;
}
