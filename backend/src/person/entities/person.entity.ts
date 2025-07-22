import { User } from 'src/auth/entities/auth.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';


@Entity('persons')
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @OneToOne(() => User, (user) => user.person)
  user: User; // relação inversa
}
