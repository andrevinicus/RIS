import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string }
  ): Promise<{ access_token: string; userId: string }> {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const token = await this.authService.login(user);

    return {
      access_token: token.access_token,
      userId: user.id,
    };
  }
}
