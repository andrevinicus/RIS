import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TabelaPadraoService } from './tabela-padrao.service';
import { CreateTabelaPadraoDto } from './dto/create-tabela-padrao.dto';
import { UpdateTabelaPadraoDto } from './dto/update-tabela-padrao.dto';

@Controller('tabela-padrao')
export class TabelaPadraoController {
  constructor(private readonly tabelaPadraoService: TabelaPadraoService) {}

  @Post()
  create(@Body() dto: CreateTabelaPadraoDto) {
    return this.tabelaPadraoService.create(dto);
  }

  @Get()
  findAll() {
    return this.tabelaPadraoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tabelaPadraoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTabelaPadraoDto) {
    return this.tabelaPadraoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tabelaPadraoService.remove(id);
  }
}
