import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async create(data: Partial<Person>): Promise<Person> {
    const person = this.personRepository.create(data);
    return this.personRepository.save(person);
  }

  async findAll(): Promise<Person[]> {
    return this.personRepository.find({ relations: ['user'] });
  }


async findById(id: string): Promise<Person> {
  const person = await this.personRepository.findOne({
    where: { id },
    relations: ['user'],
  });

  if (!person) {
    throw new NotFoundException(`Pessoa com ID ${id} não encontrada`);
  }

  return person;
}
}
