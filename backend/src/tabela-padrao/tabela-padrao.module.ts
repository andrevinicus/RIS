import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TabelaPadraoService } from './tabela-padrao.service';
import { TabelaPadraoController } from './tabela-padrao.controller';
import { TabelaPadrao } from './entities/tabela-padrao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TabelaPadrao])], // ✅ registra o repository
  controllers: [TabelaPadraoController],
  providers: [TabelaPadraoService],
})
export class TabelaPadraoModule {}
