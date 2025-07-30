import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { PessoaJuridicaService } from './pessoa-juridica.service';
import { CreatePessoaJuridicaDto } from './dto/create-pessoa-juridica.dto';
import { UpdatePessoaJuridicaDto } from './dto/update-pessoa-juridica.dto';

@Controller('pessoas-juridicas')
export class PessoaJuridicaController {
  constructor(private readonly pjService: PessoaJuridicaService) {}

  @Post()
  create(@Body() createDto: CreatePessoaJuridicaDto) {
    return this.pjService.create(createDto);
  }

  @Get()
  findAll(
    @Query('codigo') codigo?: string,
    @Query('cnpj') cnpj?: string,
    @Query('razao_social') razao_social?: string,
    @Query('nome_fantasia') nome_fantasia?: string,
  ) {
    return this.pjService.findAll({ codigo, cnpj, razao_social, nome_fantasia });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pjService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePessoaJuridicaDto) {
    return this.pjService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pjService.remove(id);
  }
}
