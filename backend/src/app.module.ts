import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { StandardsModule } from './standard/standard.module';
import { ExamsModule } from './exams/exams.module';
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';
import { PessoaJuridicaModule } from './pessoa-juridica/pessoa-juridica.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // carrega .env globalmente

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    PatientsModule,
    StandardsModule,
    ExamsModule,
    AuthModule,
    PersonModule,
    PessoaJuridicaModule, // <-- adiciona aqui
  ],
})
export class AppModule {}
