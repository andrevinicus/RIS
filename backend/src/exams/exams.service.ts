import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const exam = this.examRepository.create(createExamDto);
    return this.examRepository.save(exam);
  }

  findAll(): Promise<Exam[]> {
    return this.examRepository.find();
  }

  async findOne(id: string): Promise<Exam> {
    const exam = await this.examRepository.findOneBy({ id });
    if (!exam) {
      throw new NotFoundException(`Exam with id ${id} not found`);
    }
    return exam;
  }

  async update(id: string, updateExamDto: UpdateExamDto): Promise<Exam> {
    const exam = await this.findOne(id);
    Object.assign(exam, updateExamDto);
    return this.examRepository.save(exam);
  }

  async remove(id: string): Promise<void> {
    const result = await this.examRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Exam with id ${id} not found`);
    }
  }
}
