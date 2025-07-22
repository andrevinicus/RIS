import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsService],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a patient', () => {
    const result = service.create({ name: 'Teste' });
    expect(result).toBe('This action adds a new patient'); // No seu mock atual
  });
});
