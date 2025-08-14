import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('tabela_padrao')
@Unique(['codigo']) // Garante que o código seja único no banco
export class TabelaPadrao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, unique: true })
  codigo: string; // Código da tabela (ex: 10101012) - Único

  @Column({ length: 255 })
  descricao: string; // Nome ou descrição do procedimento

  @Column({ name: 'cod_tiss', length: 50, nullable: true })
  codTiss?: string; // Código TISS (opcional)
}
