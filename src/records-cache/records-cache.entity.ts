import { ObjectIdColumn, ObjectID, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class RecordsCache {

  // @Transform((id: ObjectID) => id.toHexString(), { toPlainOnly: true })
  @ObjectIdColumn()
  id: ObjectID;

  @CreateDateColumn()
  dateCreated: string;

  @UpdateDateColumn()
  lastUdate: string;

  @Column()
  key: string;

  @Column()
  value: string;
}
