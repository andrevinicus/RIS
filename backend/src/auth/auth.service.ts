import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,

    private readonly jwtService: JwtService,
  ) {}

  async findByUsername(usuario: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({
      where: { usuario },

    });
  }

async validateUser(usuario: string, senha: string): Promise<Usuario | null> {
  console.log('Validando usuário:', usuario);
  const user = await this.findByUsername(usuario);
  console.log('Usuário encontrado:', user);

  if (!user) return null;

  const valid = await bcrypt.compare(senha, user.senha);
  console.log('Senha válida?', valid);

  if (valid) return user;
  return null;
}





// auth.service.ts
async login(user: any): Promise<{ access_token: string }> {
  const payload = { username: user.usuario, sub: user.id };
  const token = this.jwtService.sign(payload);
  console.log('Token gerado no service:', token); // <- aqui
  return {
    access_token: token,
  };
}


}
