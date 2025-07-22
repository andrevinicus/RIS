import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // hashed password

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Person, (person) => person.user, { eager: true })
  @JoinColumn()
  person: Person; // FK para pessoa física
}
