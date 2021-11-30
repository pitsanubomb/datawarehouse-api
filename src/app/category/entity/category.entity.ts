import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { Column, Entity } from 'typeorm';

@Entity('category')
export class CategoryEntity extends DefaultEntity {
  @Column()
  categoryname: string;
  @Column({ nullable: true })
  description: string;
}
