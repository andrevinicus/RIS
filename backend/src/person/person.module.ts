import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]) // Registra a entidade Person para o TypeORM neste módulo
  ],
  providers: [PersonService], // Serviço que contém a lógica de negócio
  controllers: [PersonController], // Controller que expõe as rotas HTTP
  exports: [PersonService], // Exporta o serviço para ser usado em outros módulos, se necessário
})
export class PersonModule {}
