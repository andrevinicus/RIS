import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { ConvenioService } from './convenio.service';
import { CreateConvenioDto } from './dto/create-convenio.dto';
import { UpdateConvenioDto } from './dto/update-convenio.dto';
import { Convenio } from './entities/convenio.entity';

@Controller('convenios')
export class ConvenioController {
  private readonly logger = new Logger(ConvenioController.name);

  constructor(private readonly convenioService: ConvenioService) {}

  @Post()
  async create(@Body() dto: CreateConvenioDto): Promise<Convenio> {
    this.logger.log(`Criando convênio: ${JSON.stringify(dto)}`);
    const result = await this.convenioService.create(dto);
    this.logger.log(`Convênio criado com sucesso: ID ${result.id}`);
    return result;
  }

  @Get()
  async findAll(): Promise<Convenio[]> {
    this.logger.log('Listando todos os convênios');
    const result = await this.convenioService.findAll();
    this.logger.log(`Total de convênios encontrados: ${result.length}`);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Convenio> {
    this.logger.log(`Buscando convênio com ID: ${id}`);
    const result = await this.convenioService.findOne(id);
    if (result) {
      this.logger.log(`Convênio encontrado: ${JSON.stringify(result)}`);
    } else {
      this.logger.warn(`Convênio não encontrado para ID: ${id}`);
    }
    return result;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateConvenioDto,
  ): Promise<Convenio> {
    this.logger.log(`Atualizando convênio ID ${id} com dados: ${JSON.stringify(dto)}`);
    const result = await this.convenioService.update(id, dto);
    this.logger.log(`Convênio atualizado com sucesso: ID ${id}`);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.log(`Removendo convênio ID: ${id}`);
    await this.convenioService.remove(id);
    this.logger.log(`Convênio removido com sucesso: ID ${id}`);
  }
}
