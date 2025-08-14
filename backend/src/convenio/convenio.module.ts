import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convenio } from './entities/convenio.entity';
import { PessoaJuridica } from 'src/pessoa-juridica/entities/pessoa-juridica.entity';
import { ConvenioService } from './convenio.service';
import { ConvenioController } from './convenio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Convenio, PessoaJuridica])],
  providers: [ConvenioService],
  controllers: [ConvenioController],
})
export class ConvenioModule {}
