import { PartialType } from '@nestjs/mapped-types';
import { CreateTabelaPadraoDto } from './create-tabela-padrao.dto';

export class UpdateTabelaPadraoDto extends PartialType(CreateTabelaPadraoDto) {}
