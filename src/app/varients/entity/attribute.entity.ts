import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { VarientEntity } from './varients.entity';

@Entity('attribute')
export class AttributeEntity extends DefaultEntity {
  @Column({ unique: true })
  attributename: string;

  @OneToMany(() => VarientEntity, (varient) => varient.attribute, {
    cascade: true,
    eager: true,
  })
  varients: VarientEntity[];
}
