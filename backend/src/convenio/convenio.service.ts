import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Convenio } from './entities/convenio.entity';
import { CreateConvenioDto } from './dto/create-convenio.dto';
import { UpdateConvenioDto } from './dto/update-convenio.dto';
import { PessoaJuridica } from 'src/pessoa-juridica/entities/pessoa-juridica.entity';

@Injectable()
export class ConvenioService {
  constructor(
    @InjectRepository(Convenio)
    private readonly convenioRepository: Repository<Convenio>,

    @InjectRepository(PessoaJuridica)
    private readonly pessoaJuridicaRepository: Repository<PessoaJuridica>,
  ) {}

  // Criar convênio com código automático
  async create(dto: CreateConvenioDto): Promise<Convenio> {
    // Verifica se pessoa jurídica existe
    const pessoa = await this.pessoaJuridicaRepository.findOne({
      where: { codigo: dto.pessoaJuridicaCodigo },
    });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa Jurídica com código ${dto.pessoaJuridicaCodigo} não encontrada.`);
    }

    // Pega último código de convênio
    const last = await this.convenioRepository.find({
      order: { codigo: 'DESC' },
      take: 1,
    });
    const ultimoCodigo = last[0]?.codigo || '00000';
    const proximoCodigo = (parseInt(ultimoCodigo) + 1).toString().padStart(5, '0');

    const convenio = this.convenioRepository.create({
      ...dto,
      codigo: proximoCodigo,
      pessoaJuridica: pessoa,
    });

    return this.convenioRepository.save(convenio);
  }

  // Listar todos
  findAll(): Promise<Convenio[]> {
    return this.convenioRepository.find({ relations: ['pessoaJuridica'] });
  }

  // Buscar por ID
  async findOne(id: number): Promise<Convenio> {
    const convenio = await this.convenioRepository.findOne({
      where: { id },
      relations: ['pessoaJuridica'],
    });
    if (!convenio) {
      throw new NotFoundException('Convênio não encontrado.');
    }
    return convenio;
  }

  // Atualizar convênio
  async update(id: number, dto: UpdateConvenioDto): Promise<Convenio> {
    const convenio = await this.findOne(id);

    // Se atualizar pessoa jurídica
    if (dto.pessoaJuridicaCodigo) {
      const pessoa = await this.pessoaJuridicaRepository.findOne({
        where: { codigo: dto.pessoaJuridicaCodigo },
      });
      if (!pessoa) {
        throw new NotFoundException(`Pessoa Jurídica com código ${dto.pessoaJuridicaCodigo} não encontrada.`);
      }
      convenio.pessoaJuridica = pessoa;
    }

    Object.assign(convenio, dto);
    return this.convenioRepository.save(convenio);
  }

  // Remover convênio
  async remove(id: number): Promise<void> {
    const convenio = await this.findOne(id);
    await this.convenioRepository.remove(convenio);
  }
}
