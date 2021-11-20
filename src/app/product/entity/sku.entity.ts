import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { Column, Entity } from 'typeorm';

@Entity('sku')
export class SkuEntity extends DefaultEntity {
  @Column({type:'float'})
  price: number;

  @Column({type:'float'})
  cost: number;

  @Column({type:'float'})
  margin: number;

}
