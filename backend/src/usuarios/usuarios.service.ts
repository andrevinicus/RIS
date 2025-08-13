import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm'; // importar In para filtro 'where in'
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Unidade } from 'src/unidade/entities/unidade.entity';

@Injectable()
export class UsuariosService implements OnModuleInit {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,

    @InjectRepository(Unidade)
    private unidadeRepository: Repository<Unidade>,
  ) {}

  private async createDefaultAdmin() {
    console.log('[createDefaultAdmin] Verificando existência do admin');
    const adminUser = await this.usuariosRepository.findOne({
      where: [
        { usuario: 'admin' },
        { codigo: '0000' },
      ],
    });

    if (adminUser) {
      console.log('[createDefaultAdmin] Usuário admin ou código 0000 já existe');
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
    });

    console.log('[createDefaultAdmin] Criando usuário admin:', novoAdmin);

    await this.usuariosRepository.save(novoAdmin);
    console.log('[createDefaultAdmin] Usuário admin criado com sucesso');
  }

  async onModuleInit() {
    console.log('[onModuleInit] Inicializando módulo Usuarios');
    await this.createDefaultAdmin();
  }

  async findById(id: string): Promise<Usuario> {
    console.log(`[findById] Buscando usuário por id: ${id}`);
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) {
      console.error(`[findById] Usuário com id ${id} não encontrado`);
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    console.log(`[findById] Usuário encontrado:`, usuario);
    return usuario;
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    console.log('[create] Dados recebidos:', createUsuarioDto);

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

    console.log('[create] Criando usuário:', usuario);

    const salvo = await this.usuariosRepository.save(usuario);

    console.log('[create] Usuário salvo:', salvo);

    return salvo;
  }

  async findAll(): Promise<Usuario[]> {
    console.log('[findAll] Buscando todos os usuários');
    const usuarios = await this.usuariosRepository.find();
    console.log(`[findAll] ${usuarios.length} usuários encontrados`);
    return usuarios;
  }

  async findOne(id: string): Promise<Usuario> {
    console.log(`[findOne] Buscando usuário por id: ${id}`);
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) {
      console.error(`[findOne] Usuário com id ${id} não encontrado`);
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }
    console.log('[findOne] Usuário encontrado:', usuario);
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    console.log(`[update] Atualizando usuário id: ${id} com dados:`, updateUsuarioDto);
    const usuario = await this.findOne(id);
    Object.assign(usuario, updateUsuarioDto);

    const salvo = await this.usuariosRepository.save(usuario);

    console.log('[update] Usuário atualizado:', salvo);
    return salvo;
  }

  async remove(id: string): Promise<{ message: string }> {
    console.log(`[remove] Removendo usuário id: ${id}`);
    const usuario = await this.findOne(id);
    await this.usuariosRepository.remove(usuario);
    console.log(`[remove] Usuário id: ${id} removido com sucesso`);
    return { message: `Usuário com id ${id} removido com sucesso.` };
  }

  async vincularUnidades(codigo: string, unidadesCodigos: string[]): Promise<Usuario> {
    console.log(`[vincularUnidades] Código usuário: ${codigo}, unidades a vincular:`, unidadesCodigos);

    const usuario = await this.usuariosRepository.findOne({
      where: { codigo },
      relations: ['unidades'],
    });

    if (!usuario) {
      console.error(`[vincularUnidades] Usuário ${codigo} não encontrado`);
      throw new NotFoundException(`Usuário ${codigo} não encontrado`);
    }

    console.log('[vincularUnidades] Usuário atual:', usuario);

    const unidadesEntities = await this.unidadeRepository.findBy({
      codUnidade: In(unidadesCodigos),
    });

    console.log('[vincularUnidades] Unidades encontradas:', unidadesEntities);

    usuario.unidades = unidadesEntities;

    const salvo = await this.usuariosRepository.save(usuario);

    console.log('[vincularUnidades] Usuário salvo com unidades vinculadas:', salvo);

    return salvo;
  }

  async getUnidadesVinculadas(codigo: string): Promise<{ codUnidade: string; nome: string }[]> {
    console.log(`[getUnidadesVinculadas] Buscando unidades vinculadas para usuário ${codigo}`);

    const usuario = await this.usuariosRepository.findOne({
      where: { codigo },
      relations: ['unidades'],
    });

    if (!usuario) {
      console.error(`[getUnidadesVinculadas] Usuário ${codigo} não encontrado`);
      throw new NotFoundException(`Usuário ${codigo} não encontrado`);
    }

    console.log(`[getUnidadesVinculadas] Unidades vinculadas encontradas:`, usuario.unidades ?? []);

    return usuario.unidades ?? [];
  }

  async trocarUnidade(codigo: string, codUnidade: string) {
    console.log(`[trocarUnidade] Início - código usuário: ${codigo}, codUnidade: ${codUnidade}`);

    const usuario = await this.usuariosRepository.findOne({ where: { codigo } });
    if (!usuario) {
      console.error(`[trocarUnidade] Usuário com código ${codigo} não encontrado`);
      throw new NotFoundException('Usuário não encontrado');
    }
    console.log(`[trocarUnidade] Usuário encontrado:`, usuario);

    usuario.unidadeAtivaCodUnidade = codUnidade;
    console.log(`[trocarUnidade] Unidade ativa atualizada para: ${codUnidade}`);

    await this.usuariosRepository.save(usuario);
    console.log(`[trocarUnidade] Usuário salvo com nova unidade ativa`);

    const usuarioAtualizado = await this.usuariosRepository.findOne({
      where: { codigo },
      relations: ['unidadeAtiva'],
    });

    console.log(`[trocarUnidade] Retornando usuário atualizado:`, usuarioAtualizado);

    return usuarioAtualizado;
  }
async findByCodigoWithRelations(codigo: string): Promise<Usuario> {
  console.log('[findByCodigoWithRelations] Buscando usuário por código:', codigo);

  const usuario = await this.usuariosRepository.findOne({
    where: { codigo },
    relations: ['unidades', 'unidadePadrao'],
  });

  if (!usuario) {
    throw new NotFoundException(`Usuário com código ${codigo} não encontrado`);
  }

  console.log('[findByCodigoWithRelations] Usuário encontrado:', usuario);
  return usuario;
}

}
