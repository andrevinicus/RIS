import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UnidadeService } from './unidade.service';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { Unidade } from './entities/unidade.entity'; // supondo que tem entidade

@Controller('unidades')
export class UnidadeController {
  constructor(private readonly unidadeService: UnidadeService) {}

  @Post()
  create(@Body() createUnidadeDto: CreateUnidadeDto): Promise<Unidade> {
    return this.unidadeService.create(createUnidadeDto);
  }

  // Filtragem por query params (nome, cnpj, municipio)
  @Get()
  findAll(
    @Query('nome') nome?: string,
    @Query('cnpj') cnpj?: string,
    @Query('municipio') municipio?: string,
  ): Promise<Unidade[]> {
    const filtros = { nome, cnpj, municipio };
    return this.unidadeService.findAll(filtros);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Unidade> {
    return this.unidadeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUnidadeDto: UpdateUnidadeDto,
  ): Promise<Unidade> {
    return this.unidadeService.update(id, updateUnidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.unidadeService.remove(id);
  }
}