import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { Column, Entity } from 'typeorm';

@Entity('product')
export class ProductEntity extends DefaultEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column()
  img: string;

  @Column({type:'float'})
  price: number;

  @Column({type:'float'})
  cost: number;

  @Column({type:'float'})
  margin: number;

  @Column({type:'float'})
  sale: number;

  @Column()
  isArchived: boolean;

  @Column()
  isOnline: boolean;
}
