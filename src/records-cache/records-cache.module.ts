import { Module } from '@nestjs/common';
import { RecordsCacheService } from './records-cache.service';
import { RecordsCacheController } from './records-cache.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsCache } from './records-cache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecordsCache])],
  providers: [RecordsCacheService],
  controllers: [RecordsCacheController],
})
export class RecordsCacheModule { }
