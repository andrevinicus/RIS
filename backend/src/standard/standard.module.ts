import { Module } from '@nestjs/common';
import { StandardsService } from './standard.service';
import { StandardsController } from './standard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Standard } from './entities/standard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Standard])],
  controllers: [StandardsController],
  providers: [StandardsService],
})
export class StandardsModule {}
