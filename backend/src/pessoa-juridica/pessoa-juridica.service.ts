// src/pessoa-juridica/pessoa-juridica.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoaJuridica } from './entities/pessoa-juridica.entity';
import { CreatePessoaJuridicaDto } from './dto/create-pessoa-juridica.dto';
import { UpdatePessoaJuridicaDto } from './dto/update-pessoa-juridica.dto';

@Injectable()
export class PessoaJuridicaService {
  constructor(
    @InjectRepository(PessoaJuridica)
    private pjRepository: Repository<PessoaJuridica>,
  ) {}

  // Método para gerar o próximo código sequencial
  private async gerarProximoCodigo(): Promise<string> {
    const result = await this.pjRepository
      .createQueryBuilder('pj')
      .select('MAX(CAST(pj.codigo AS INTEGER))', 'max')
      .getRawOne();

    const maiorCodigo = result?.max ?? 0;
    return (maiorCodigo + 1).toString();
  }

  async create(data: CreatePessoaJuridicaDto): Promise<PessoaJuridica> {
    const codigo = await this.gerarProximoCodigo();

    const pj = this.pjRepository.create({
      ...data,
      codigo,
    });

    return await this.pjRepository.save(pj);
  }

  async findAll(filtros: {
    codigo?: string;
    cnpj?: string;
    razao_social?: string;
    nome_fantasia?: string;
  }): Promise<PessoaJuridica[]> {
    const query = this.pjRepository.createQueryBuilder('pj');

    if (filtros.codigo) {
      query.andWhere('LOWER(pj.codigo) LIKE LOWER(:codigo)', {
        codigo: `%${filtros.codigo}%`,
      });
    }

    if (filtros.cnpj) {
      query.andWhere('LOWER(pj.cnpj) LIKE LOWER(:cnpj)', {
        cnpj: `%${filtros.cnpj}%`,
      });
    }

    if (filtros.razao_social) {
      query.andWhere('LOWER(pj.razao_social) LIKE LOWER(:razao_social)', {
        razao_social: `%${filtros.razao_social}%`,
      });
    }

    if (filtros.nome_fantasia) {
      query.andWhere('LOWER(pj.nome_fantasia) LIKE LOWER(:nome_fantasia)', {
        nome_fantasia: `%${filtros.nome_fantasia}%`,
      });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<PessoaJuridica> {
    const pj = await this.pjRepository.findOne({ where: { id } });
    if (!pj) throw new NotFoundException(`Pessoa Jurídica ${id} não encontrada`);
    return pj;
  }

  async update(id: string, data: UpdatePessoaJuridicaDto): Promise<PessoaJuridica> {
    const pj = await this.findOne(id);
    Object.assign(pj, data);
    return this.pjRepository.save(pj);
  }

  async remove(id: string): Promise<void> {
    const pj = await this.findOne(id);
    await this.pjRepository.remove(pj);
  }
}
