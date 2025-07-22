import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { username: string; email: string; password: string; personId: string }
  ): Promise<{ message: string; userId: string }> {
    try {
      const user = await this.authService.register(body.username, body.email, body.password, body.personId);
      return { message: 'Usuário criado com sucesso', userId: user.id };
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException('Usuário ou email já existem', HttpStatus.CONFLICT);
      }
      throw new HttpException('Erro ao criar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string }
  ): Promise<{ access_token: string; userId: string }> {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new HttpException('Usuário ou senha inválidos', HttpStatus.UNAUTHORIZED);
    }
    // Aqui você pode gerar um token JWT real, mas vou retornar um fake só para teste:
    return {
      access_token: 'fake-jwt-token',
      userId: user.id,
    };
  }
}
