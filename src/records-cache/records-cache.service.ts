import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordsCache } from './records-cache.entity';
import { Repository } from 'typeorm';
// import differenceInMinutes from 'date-fns/difference_in_minutes';

@Injectable()
export class RecordsCacheService {

  constructor(
    @InjectRepository(RecordsCache)
    private readonly recordsCacheRepository: Repository<RecordsCache>,
    // private userService: UsersService,
  ) { }

  async getAllRecords(): Promise<RecordsCache[]> {
    return await this.recordsCacheRepository.find();
  }

  async getSingleRecord(recordKey): Promise<RecordsCache> {
    return await this.recordsCacheRepository.findOne({ key: recordKey });
  }

  async createRecord(record): Promise<RecordsCache[]> {
    // if 10 or more records exist, delete the oldest and then create the new record;
    const numberOfRecordsInDatabase = this.recordsCacheRepository.count();
    if (await numberOfRecordsInDatabase >= 10) {
      const oldestRecord = await this.recordsCacheRepository.find({ order: { id: 1 }, take: 1 });
      await this.deleteSingleRecord(oldestRecord[0].key);
    }
    const newRecord = this.recordsCacheRepository.create(record);
    return await this.recordsCacheRepository.save(newRecord);
  }

  async updateSingleRecord(recordKey, updatedValue) {
    const recordToBeUpdated = await this.getSingleRecord(recordKey);
    this.recordsCacheRepository.merge(recordToBeUpdated, updatedValue);
    return await this.recordsCacheRepository.save(recordToBeUpdated);
  }

  async deleteSingleRecord(recordKey): Promise<RecordsCache> {
    const recordToDelete = await this.getSingleRecord(recordKey);
    return await this.recordsCacheRepository.remove(recordToDelete);
  }

  async deleteAllRecords(): Promise<any> {
    return await this.recordsCacheRepository.delete({});
  }

}
