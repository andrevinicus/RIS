import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  codigo: string;

  @Column()
  nomeCompleto: string;

  @Column({ unique: true })
  usuario: string;

  @Column({ nullable: true })
  senha: string;

  @Column({ nullable: true })
  usuarioCriacao?: string;

  @Column({ type: 'timestamp', nullable: true })
  dataCriacao: Date;

  @Column({ nullable: true })
  setor?: string;

  @Column({ nullable: true })
  paginaInicial?: string;

  @Column({ nullable: true })
  pessoaFisicaId?: string;

  @Column({ nullable: true })
  pessoaFisicanome?: string;

  @Column()
  unidadePadraoId: string;

  @Column()
  unidadePadrao: string;

  @Column('jsonb', { nullable: true })
  unidades?: { id: string; nome: string }[];

  @Column()
  email: string;

  @Column()
  situacao: 'ativo' | 'inativo';
}
