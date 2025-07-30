// src/pessoa-juridica/pessoa-juridica.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaJuridicaService } from './pessoa-juridica.service';
import { PessoaJuridicaController } from './pessoa-juridica.controller';
import { PessoaJuridica } from './entities/pessoa-juridica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PessoaJuridica])],
  controllers: [PessoaJuridicaController],
  providers: [PessoaJuridicaService],
})
export class PessoaJuridicaModule {}
