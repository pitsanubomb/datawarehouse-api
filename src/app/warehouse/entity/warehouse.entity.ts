import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { Column, Entity } from 'typeorm';

@Entity('warehouse')
export class warehouseEntity extends DefaultEntity {
  @Column()
  warehousename: string;
  @Column({ nullable: true })
  description: string;
}
