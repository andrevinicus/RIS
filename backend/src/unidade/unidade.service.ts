import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unidade } from './entities/unidade.entity';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';

@Injectable()
export class UnidadeService {
  constructor(
    @InjectRepository(Unidade)
    private readonly unidadeRepository: Repository<Unidade>,
  ) {}

  // Método para gerar o próximo código sequencial
private async gerarProximoCodUnidade(): Promise<string> {
  const ultimaUnidade = await this.unidadeRepository
    .createQueryBuilder('unidade')
    .orderBy('unidade.codUnidade', 'DESC')
    .getOne();

  if (!ultimaUnidade || !ultimaUnidade.codUnidade) {
    return '001'; // código inicial
  }

  const numero = parseInt(ultimaUnidade.codUnidade, 10);
  const proximoNumero = (numero + 1).toString().padStart(4, '0');
  return proximoNumero;
}

async create(dto: CreateUnidadeDto): Promise<Unidade> {
  if (!dto.codUnidade) {
    dto.codUnidade = await this.gerarProximoCodUnidade(); // usa o nome correto
  }

  const unidade = this.unidadeRepository.create(dto);
  return this.unidadeRepository.save(unidade);
}


  // Agora recebe filtros opcionais
  async findAll(filtros?: { nome?: string; cnpj?: string; municipio?: string }): Promise<Unidade[]> {
    const query = this.unidadeRepository.createQueryBuilder('unidade');

    if (filtros) {
      if (filtros.nome) {
        query.andWhere('unidade.nome ILIKE :nome', { nome: `%${filtros.nome}%` });
      }
      if (filtros.cnpj) {
        query.andWhere('unidade.cnpj ILIKE :cnpj', { cnpj: `%${filtros.cnpj}%` });
      }
      if (filtros.municipio) {
        query.andWhere('unidade.municipio ILIKE :municipio', { municipio: `%${filtros.municipio}%` });
      }
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Unidade> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('ID inválido.');
    }
    const unidade = await this.unidadeRepository.findOne({ where: { id } });
    if (!unidade) {
      throw new NotFoundException('Unidade não encontrada.');
    }
    return unidade;
  }
  async update(id: string, dto: UpdateUnidadeDto): Promise<Unidade> {
    const unidade = await this.findOne(id); // já lança 404 se não achar
    await this.unidadeRepository.update(id, dto);
    return this.findOne(id);
  }
  async remove(id: string): Promise<void> {
    const result = await this.unidadeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Unidade não encontrada para exclusão.');
    }
  }
}
