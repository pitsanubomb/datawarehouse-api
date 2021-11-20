import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { Column, Entity } from 'typeorm';

@Entity('product')
export class ProductEntity extends DefaultEntity {
  @Column({ unique: true })
  productname: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column()
  img: string;

  @Column({ type: 'float' })
  weight: number;

  @Column()
  isContinuesell: boolean;

  @Column()
  isPos: boolean;

  @Column()
  isOnline: boolean;

  @Column()
  isArchived: boolean;
}
