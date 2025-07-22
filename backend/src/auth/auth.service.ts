import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/auth.entity';
import { Person } from '../person/entities/person.entity';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Person)
    private personsRepository: Repository<Person>,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
    personId: string,
  ): Promise<User> {
    const person = await this.personsRepository.findOne({ where: { id: personId } });
    if (!person) {
      throw new Error('Person not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
      person,
    });
    return this.usersRepository.save(newUser);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
      relations: ['person'],
    });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async createDefaultUser() {
    const defaultUsername = 'admin';
    const defaultEmail = 'admin@example.com';
    const defaultPassword = 'admin123';

    // Verifica se o usuário admin já existe
    const existingUser = await this.usersRepository.findOne({
      where: [{ username: defaultUsername }, { email: defaultEmail }],
    });
    if (existingUser) {
      console.log('Usuário padrão já existe');
      return;
    }

    // Tenta encontrar uma person padrão para vincular, ou cria uma
   let person = await this.personsRepository.findOne({ where: { cpf: '00000000000' } });

    if (!person) {
      person = this.personsRepository.create({
        name: 'Administrador',
        cpf: '00000000000',
        birthDate: new Date('1970-01-01'),
      });
      person = await this.personsRepository.save(person);
    }

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const user = this.usersRepository.create({
      username: defaultUsername,
      email: defaultEmail,
      password: hashedPassword,
      person,
    });
    await this.usersRepository.save(user);
    console.log('Usuário padrão criado: admin / admin123');
  }

  async onModuleInit() {
    await this.createDefaultUser();
  }
}
