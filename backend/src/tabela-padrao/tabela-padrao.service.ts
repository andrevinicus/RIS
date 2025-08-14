import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TabelaPadrao } from './entities/tabela-padrao.entity';
import { CreateTabelaPadraoDto } from './dto/create-tabela-padrao.dto';
import { UpdateTabelaPadraoDto } from './dto/update-tabela-padrao.dto';

@Injectable()
export class TabelaPadraoService {
  constructor(
    @InjectRepository(TabelaPadrao)
    private readonly tabelaPadraoRepository: Repository<TabelaPadrao>,
  ) {}

  // Cria com código automático numérico
  async create(dto: CreateTabelaPadraoDto): Promise<TabelaPadrao> {
    // Pega o último código registrado
    const last = await this.tabelaPadraoRepository.find({
      order: { codigo: 'DESC' },
      take: 1,
    });

    const ultimoCodigo = last[0]?.codigo || '000';
    const numero = parseInt(ultimoCodigo) + 1;
    const novoCodigo = numero.toString().padStart(3, '0'); // 001, 002, 003...

    const novo = this.tabelaPadraoRepository.create({
      ...dto,
      codigo: novoCodigo, // atribui código gerado
    });

    return this.tabelaPadraoRepository.save(novo);
  }

  findAll(): Promise<TabelaPadrao[]> {
    return this.tabelaPadraoRepository.find();
  }

  async findOne(id: number): Promise<TabelaPadrao> {
    const item = await this.tabelaPadraoRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Tabela não encontrada.');
    }
    return item;
  }

  async update(id: number, dto: UpdateTabelaPadraoDto): Promise<TabelaPadrao> {
    const item = await this.findOne(id);

    if (dto.codigo && dto.codigo !== item.codigo) {
      const exists = await this.tabelaPadraoRepository.findOne({ where: { codigo: dto.codigo } });
      if (exists) {
        throw new ConflictException('Já existe uma tabela com esse código.');
      }
    }

    Object.assign(item, dto);
    return this.tabelaPadraoRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.tabelaPadraoRepository.remove(item);
  }
}
