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
    const user = await this.findByUsername(usuario);
    if (user && (await bcrypt.compare(senha, user.senha))) {
      return user;
    }
    return null;
  }

  async login(user: Usuario) {
    const payload = { usuario: user.usuario, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
