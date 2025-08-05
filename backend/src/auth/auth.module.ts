import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Usuario } from '../usuarios/entities/usuario.entity'; // ajuste o caminho conforme seu projeto
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]), // isso registra o repositório UsuarioRepository para injeção
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mySecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
