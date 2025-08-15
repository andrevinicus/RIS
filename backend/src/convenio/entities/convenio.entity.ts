import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { PessoaJuridica } from 'src/pessoa-juridica/entities/pessoa-juridica.entity';

@Entity('convenio')
@Unique(['codigo'])
export class Convenio {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 10, unique: true })
    codigo: string; // Código do convênio (único e global)

    @Column({ length: 255 })
    nome: string; // Nome ou descrição do convênio

    @Column({ length: 255, nullable: true })
    site?: string; // Site do convênio

    @Column({ length: 1000, nullable: true })
    email?: string; // Observações (até 1000 caracteres)

    @Column({ length: 1000, nullable: true })
    obs?: string; // Observações (até 1000 caracteres)

    @Column({ length: 20, nullable: true })
    telefone?: string;

    @Column({ name: 'codigo_ans', length: 50 })
    codigoAns?: string;

    @Column({ type: 'enum', enum: ['particular', 'publico', 'cortesia'], nullable: true })
    tipo?: 'particular' | 'publico' | 'cortesia'; // Tipo do convênio

    @Column({ type: 'enum', enum: ['privado', 'publico', 'particular'], nullable: true })
    formaPagamento?: 'privado' | 'publico' | 'particular'; // Forma de pagamento

    @ManyToOne(() => PessoaJuridica, { nullable: false })
    @JoinColumn({ name: 'pessoa_juridica_codigo', referencedColumnName: 'codigo' })
    pessoaJuridica: PessoaJuridica;


    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
