import { Person } from 'src/person/entities/person.entity';
import { PessoaJuridica } from 'src/pessoa-juridica/entities/pessoa-juridica.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';

@Entity('unidades')
export class Unidade {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true}) // ← permite o backend gerar
    codUnidade: string;

    
    @Column()
    nomeReduzido: string;

    @Column()
    nome: string;

    @Column()
    cnpj: string;

    @Column({ name: 'ramo_atividade' })
    ramoAtividade: string;

    @Column()
    razaoSocial: string;

    @Column()
    inscricaoEstadual: string;

    @Column()
    inscricaoMunicipal: string;

    @Column()
    regJuntaComercial: string;

    @Column()
    regCartorio: string;

    @Column()
    status: string;

    @Column({ type: 'date', nullable: true })
    despachoData: Date;

    @Column()
    nomeResponsavel: string;

    @Column()
    cpfResponsavel: string;

    @Column()
    codCargo: string;

    @Column()
    cargoResponsavel: string;

    @Column()
    cnes: string;

    @Column()
    logradouro: string;

    @Column()
    endereco: string;

    @Column()
    numero: string;

    @Column()
    bairro: string;

    @Column()
    cep: string;

    @Column()
    codIbge: string;

    @Column()
    municipio: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

    @Column({ type: 'boolean', default: false })
    matriz: boolean; // true = matriz, false = filial

    @OneToMany(() => PessoaJuridica, pessoaJuridica => pessoaJuridica.unidade)
    pessoasJuridicas: PessoaJuridica[];

    @OneToMany(() => Person, person => person.unidade)
    pessoas: Person[];
}
