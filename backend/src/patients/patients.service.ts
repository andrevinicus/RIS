import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(createPatientDto);
    return this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findOne(id: number): Promise<Patient | null> {
    return this.patientRepository.findOneBy({ id });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient | null> {
    await this.patientRepository.update(id, updatePatientDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.patientRepository.delete(id);
  }
}
