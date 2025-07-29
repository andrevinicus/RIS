import { User } from 'src/auth/entities/auth.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Generated } from 'typeorm';

@Entity('persons')
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', unique: true })
  @Generated('increment')
  codigo: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: 'date', name: 'birth_date', nullable: true })
  birthDate: Date | null;

  @Column({ nullable: true })
  document_number: string;

  @Column({ nullable: true })
  document_type: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone_mobile_number: string;

  @Column({ nullable: true })
  phone_work_number: string;

  @Column({ nullable: true })
  sex: string;

  @Column({ nullable: true, type: 'float' })
  weight: number;

  @Column({ nullable: true, type: 'float' })
  height: number;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  marital_status: string;

  @Column({ nullable: true })
  mother_name: string;

  @Column({ nullable: true })
  father_name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  zip_code: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  insurance_id: string;

  @Column({ nullable: true })
  insurance_card_number: string;

  @Column({ nullable: true, type: 'text' })
  observations: string;

  @OneToOne(() => User, (user) => user.person)
  @JoinColumn()
  user: User;
}
