import { Controller, Get, Post, Put, Param, Body, Query, ParseUUIDPipe } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('api/pessoas')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async findAll(
    @Query('nome') nome?: string,
    @Query('cpf') cpf?: string,
    @Query('codigo') codigo?: string,
  ): Promise<Person[]> {
    // Se todos os filtros vazios, busca tudo, senão filtra
    if (nome || cpf || codigo) {
      return this.personService.findAllFiltered({ nome, cpf, codigo });
    }
    return this.personService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Person> {
    return this.personService.findById(id);
  }

  @Post()
  async create(@Body() data: CreatePersonDto): Promise<Person> {
    return this.personService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdatePersonDto,
  ): Promise<Person> {
    return this.personService.update(id, data);
  }
}
