import { Test, TestingModule } from '@nestjs/testing';
import { RecordsCacheService } from './records-cache.service';

describe('RecordsCacheService', () => {
  let service: RecordsCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordsCacheService],
    }).compile();

    service = module.get<RecordsCacheService>(RecordsCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
