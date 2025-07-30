// src/pessoa-juridica/dto/update-pessoa-juridica.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoaJuridicaDto } from './create-pessoa-juridica.dto';

export class UpdatePessoaJuridicaDto extends PartialType(CreatePessoaJuridicaDto) {}
