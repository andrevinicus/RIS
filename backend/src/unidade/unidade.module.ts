// src/unidade/unidade.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidade } from './entities/unidade.entity';
import { UnidadeService } from './unidade.service';
import { UnidadeController } from './unidade.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Unidade])],
  controllers: [UnidadeController],
  providers: [UnidadeService],
  exports: [UnidadeService],
})
export class UnidadeModule {}
