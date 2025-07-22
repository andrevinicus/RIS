import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Standard } from './entities/standard.entity';
import { CreateStandardDto } from './dto/create-standard.dto';
import { UpdateStandardDto } from './dto/update-standard.dto';

@Injectable()
export class StandardsService {
  constructor(
    @InjectRepository(Standard)
    private readonly standardRepository: Repository<Standard>,
  ) {}

  create(createStandardDto: CreateStandardDto) {
    const standard = this.standardRepository.create(createStandardDto);
    return this.standardRepository.save(standard);
  }

  findAll() {
    return this.standardRepository.find();
  }

  findOne(id: string) {
    return this.standardRepository.findOne({ where: { id } });
  }

  update(id: string, updateStandardDto: UpdateStandardDto) {
    return this.standardRepository.update(id, updateStandardDto);
  }

  remove(id: string) {
    return this.standardRepository.delete(id);
  }
}
