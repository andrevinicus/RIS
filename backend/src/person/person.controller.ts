import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './entities/person.entity';

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(@Body() body: Partial<Person>): Promise<Person> {
    return this.personService.create(body);
  }

  @Get()
  async findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Person> {
    return this.personService.findById(id);
  }
}
