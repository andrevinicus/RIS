import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ length: 100 })
  shortDescription: string;

  @Column()
  honorariumGroup: string;

  @Column()
  modality: string;

  @Column('int')
  deliveryTimeDays: number;

  @Column('int')
  paidHonorariums: number;

  @Column()
  hasReport: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
