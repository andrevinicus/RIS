import { Unidade } from 'src/unidade/entities/unidade.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

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

  // Unidade padrão (ManyToOne)
  @Column()
  unidadePadraoId: string;

  @ManyToOne(() => Unidade)
  @JoinColumn({ name: 'unidadePadraoId', referencedColumnName: 'codUnidade' })
  unidadePadrao: Unidade;

  // Unidades vinculadas (ManyToMany)
@ManyToMany(() => Unidade)
@JoinTable({
  name: 'usuario_unidades',  // tabela de junção personalizada
  joinColumn: { name: 'usuarioCodigo', referencedColumnName: 'codigo' },
  inverseJoinColumn: { name: 'unidadeCodUnidade', referencedColumnName: 'codUnidade' },
})
unidades: Unidade[];

  @Column()
  email: string;

  @Column()
  situacao: 'ativo' | 'inativo';

  // Unidade ativa (ManyToOne)
  @Column({ nullable: true })
  unidadeAtivaCodUnidade: string;

  @ManyToOne(() => Unidade)
  @JoinColumn({ name: 'unidadeAtivaCodUnidade', referencedColumnName: 'codUnidade' })
  unidadeAtiva: Unidade;
}
