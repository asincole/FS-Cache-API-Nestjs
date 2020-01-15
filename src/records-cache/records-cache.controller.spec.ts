import { Test, TestingModule } from '@nestjs/testing';
import { RecordsCacheController } from './records-cache.controller';

describe('RecordsCache Controller', () => {
  let controller: RecordsCacheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordsCacheController],
    }).compile();

    controller = module.get<RecordsCacheController>(RecordsCacheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
