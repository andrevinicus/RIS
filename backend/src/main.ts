import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // URL do seu frontend
    credentials: true, // se precisar enviar cookies/autenticação
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
