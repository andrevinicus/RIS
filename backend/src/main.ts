import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa CORS
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  // Usar o Reflector para pegar metadados de rotas públicas
  const reflector = app.get(Reflector);

  // Aplica o guard global com exceção para rotas marcadas como públicas
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
