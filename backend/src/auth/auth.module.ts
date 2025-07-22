import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/auth.entity';
import { Person } from 'src/person/entities/person.entity';
// ajuste o caminho conforme sua estrutura

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Person]), // importa as entidades para os repositórios
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
