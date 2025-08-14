

import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { PessoaJuridica } from 'src/pessoa-juridica/entities/pessoa-juridica.entity';

@Entity('convenio')
@Unique(['codigo'])
export class Convenio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 10, unique: true })
    codigo: string; // Código do convênio (único e global)

    @Column({ length: 255 })
    nome: string; // Nome ou descrição do convênio

    @Column({ length: 100, nullable: true })
    contato?: string;

    @Column({ length: 20, nullable: true })
    telefone?: string;

    @Column({ name: 'codigo_ans', length: 50, nullable: true })
    codigoAns?: string;

    @ManyToOne(() => PessoaJuridica, { nullable: false })
    @JoinColumn({ name: 'pessoa_juridica_codigo', referencedColumnName: 'codigo' })
    pessoaJuridica: PessoaJuridica;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}

