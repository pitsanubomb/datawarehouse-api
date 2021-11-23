import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AttributeEntity } from './attribute.entity';

@Entity('varient')
export class VarientEntity extends DefaultEntity {
  @Column()
  varientname: string;

  @ManyToOne(() => AttributeEntity, (attribute) => attribute.varients)
  attribute: AttributeEntity;
}
