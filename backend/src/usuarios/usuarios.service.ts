import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService implements OnModuleInit {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  // Método que cria o admin padrão caso não exista
private async createDefaultAdmin() {
  // Verificar se já existe usuário admin OU código 0001 para evitar conflito de unicidade
  const adminUser = await this.usuariosRepository.findOne({
    where: [
      { usuario: 'admin' },
      { codigo: '0000' },
    ],
  });

  if (adminUser) {
    console.log('Usuário admin ou código 0001 já existe');
    return;
  }

  const hashSenha = await bcrypt.hash('admin123', 10);

  const novoAdmin = this.usuariosRepository.create({
    usuario: 'admin',
    senha: hashSenha,
    nomeCompleto: 'Administrador',
    codigo: '0000',
    dataCriacao: new Date(),
    email: 'admin@example.com',
    situacao: 'ativo',
    unidadePadraoId: '0001',
    unidadePadrao: 'Unidade Padrão',
  });

  await this.usuariosRepository.save(novoAdmin);
  console.log('Usuário admin criado com sucesso');
}


  async onModuleInit() {
    await this.createDefaultAdmin();
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { senha, ...rest } = createUsuarioDto;

    const hash = senha ? await bcrypt.hash(senha, 10) : undefined;

    const last = await this.usuariosRepository.find({
      order: { codigo: 'DESC' },
      take: 1,
    });

    const ultimoCodigo = last[0]?.codigo || '0000';
    const proximoCodigo = (parseInt(ultimoCodigo) + 1).toString().padStart(4, '0');

    const usuario = this.usuariosRepository.create({
      ...rest,
      senha: hash,
      codigo: proximoCodigo,
      dataCriacao: new Date(),
    });

    return this.usuariosRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    Object.assign(usuario, updateUsuarioDto);
    return this.usuariosRepository.save(usuario);
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuariosRepository.remove(usuario);
  }
}
