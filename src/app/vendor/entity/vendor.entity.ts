import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { Column, Entity } from 'typeorm';

@Entity('vendor')
export class VendorEnd extends DefaultEntity {
  @Column({ type: String })
  vendorname: string;
}
