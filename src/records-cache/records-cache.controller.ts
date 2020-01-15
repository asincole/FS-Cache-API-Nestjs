import { Controller, Post, Body, Param, Get, Put, Delete, HttpStatus } from '@nestjs/common';
import { RecordsCacheService } from './records-cache.service';
import { ObjectID } from 'typeorm';
import { generateRandomString } from '../utilities/randomStringGenerator';
import { Logger } from '@nestjs/common';
import { RecordsCache } from './records-cache.entity';

@Controller('records-cache')
export class RecordsCacheController {

  logger = new Logger(RecordsCacheController.name);

  constructor(private recordsCacheService: RecordsCacheService) { }

  @Get(':key')
  async getSingleRecord(@Param('key') key: string): Promise<RecordsCache | RecordsCache[]> {
    try {
      const singleRecord = await this.recordsCacheService.getSingleRecord(key);
      if (!singleRecord) {
        this.logger.log('Cache miss');
        return await this.createRecord({ key });
      } else {
        this.logger.log('Cache hit');
        return singleRecord;
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get()
  async getAllRecords() {
    try {
      return await this.recordsCacheService.getAllRecords();
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Post()
  async createRecord(@Body() record: { key: string }) {
    try {
      const randomString = generateRandomString(10);
      return this.recordsCacheService.createRecord({ ...record, value: randomString });
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Put(':key')
  async updateResume(@Param('key') key: string, @Body() updatedRecord: { value: string }) {
    try {
      // if (!ObjectID.isValid(key)) {
      //   return new BadRequestException('invalid resume ID');
      // }
      return this.recordsCacheService.updateSingleRecord(key, updatedRecord);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Delete(':key')
  async deleteUser(@Param('key') key: string) {
    try {
      // if (!ObjectID.isValid(id)) {
      //   return new BadRequestException('invalid resume ID');
      // }
      this.recordsCacheService.deleteSingleRecord(key);
      return HttpStatus.NO_CONTENT;
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Delete()
  async deleteAllRecords() {
    try {
      await this.recordsCacheService.deleteAllRecords();
      return HttpStatus.NO_CONTENT;
    } catch (error) {
      this.logger.error(error);
    }
  }

}
