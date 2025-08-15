import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuariosService: UsuariosService
  ) {}

@Public()
@Post('login')
async login(
  @Body() body: { username: string; password: string }
): Promise<{ access_token: string; userId: string }> {
  const user = await this.authService.validateUser(body.username, body.password);
  if (!user) {
    throw new UnauthorizedException('Usuário ou senha inválidos');
  }
  // Você monta o payload, mas na verdade não usa diretamente aqui (pois o login do AuthService já gera o token)
  const token = await this.authService.login(user);

  return {
    access_token: token.access_token,
    userId: user.id,
  };
}

  
@Get('me')
@UseGuards(JwtAuthGuard)
async getMe(@Request() req) {
  console.log('req.user:', req.user); // { userId, username }

  // Busca o usuário pelo id para obter o código
  const usuarioBase = await this.usuariosService.findById(req.user.userId || req.user.sub);

  // Busca novamente, agora pelo código, trazendo relações
  const user = await this.usuariosService.findByCodigoWithRelations(usuarioBase.codigo);

  return {
    codigo: user.codigo,
    realname: user.usuario,
    username: user.pessoaFisicanome,
    unidadeAtiva: {
      unidadePadraoID: user.unidadePadraoId,
      unidadePadraoNome: user.unidadePadrao?.nome || '',
      unidadeNomeReduzido: user.unidadePadrao?.nomeReduzido || user.unidadePadrao?.nome || '',
      unidadesDisponiveis: user.unidades || [],
    },
    perfil: {
      nome:'Em Teste',
    },
    setor: {
      nome: user.setor || '',
    },
  };
}


}
