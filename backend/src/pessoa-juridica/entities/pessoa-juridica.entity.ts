// src/pessoa-juridica/entities/pessoa-juridica.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pessoas_juridicas')
export class PessoaJuridica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  codigo: string;

  @Column()
  razao_social: string;

  @Column({ nullable: true })
  nome_fantasia: string;

  @Column({ unique: true })
  cnpj: string;

  @Column({ nullable: true })
  inscricao_estadual: string;

  @Column({ nullable: true })
  inscricao_municipal: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telefone_comercial: string;

  @Column({ nullable: true })
  endereco: string;

  @Column({ nullable: true })
  complemento: string;

  @Column({ nullable: true })
  bairro: string;

  @Column({ nullable: true })
  cidade: string;

  @Column({ nullable: true })
  estado: string;

  @Column({ nullable: true })
  pais: string;

  @Column({ nullable: true })
  cep: string;

  @Column({ nullable: true })
  responsavel: string;

  @Column({ nullable: true, type: 'text' })
  observacoes: string;
}
