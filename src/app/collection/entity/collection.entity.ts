import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { Column, Entity } from 'typeorm';

@Entity('collection')
export class CollectionEntity extends DefaultEntity {
  @Column()
  collectionname: string;
}
