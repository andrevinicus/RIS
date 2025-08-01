import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

async create(data: CreatePersonDto): Promise<Person> {
  console.log('create: criando pessoa com dados:', data);
  const person = this.personRepository.create(data);
  const savedPerson = await this.personRepository.save(person);
  console.log('create: pessoa criada:', savedPerson);
  return savedPerson;
}
  async findAll(): Promise<Person[]> {
    console.log('findAll: buscando todas as pessoas');
    const pessoas = await this.personRepository.find({ relations: ['user'] });
    console.log(`findAll: retornando ${pessoas.length} pessoas`);
    return pessoas;
  }

  async findById(id: string): Promise<Person> {
    console.log(`findById: buscando pessoa com id=${id}`);
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!person) {
      console.log(`findById: pessoa com id=${id} não encontrada`);
      throw new NotFoundException(`Pessoa com ID ${id} não encontrada`);
    }

    console.log('findById: pessoa encontrada:', person);
    return person;
  }

  async update(id: string, data: UpdatePersonDto): Promise<Person> {
    console.log(`update: atualizando pessoa com id=${id} com dados:`, data);
    const person = await this.findById(id);
    Object.assign(person, data);
    const updatedPerson = await this.personRepository.save(person);
    console.log('update: pessoa atualizada:', updatedPerson);
    return updatedPerson;
  }
  async findAllFiltered(filtros?: { nome?: string; cpf?: string; codigo?: string }): Promise<Person[]> {
    const query = this.personRepository.createQueryBuilder('person');

    if (!filtros || Object.values(filtros).every(value => !value)) {
      // Se não houver filtros ou todos vazios, retorna tudo
      return this.findAll();
    }
    if (filtros.nome) {
      query.andWhere('LOWER(person.name) LIKE :nome', { nome: `%${filtros.nome.toLowerCase()}%` });
    }
    if (filtros.cpf) {
      query.andWhere('LOWER(person.cpf) LIKE :cpf', { cpf: `%${filtros.cpf.toLowerCase()}%` });
    }
    if (filtros.codigo) {
      // Corrigido: convertendo codigo para texto antes do LIKE
      query.andWhere('CAST(person.codigo AS TEXT) LIKE :codigo', { codigo: `%${filtros.codigo}%` });
    }

    // Se quiser, pode adicionar ordenação, paginação etc aqui

    const results = await query.getMany();
    return results;
  }

}
