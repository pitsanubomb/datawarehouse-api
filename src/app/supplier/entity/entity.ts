import { DefaultEntity } from "src/app/core/dbentity/default.entity";
import { Column, Entity } from "typeorm";

@Entity('supplier')
export class SupplierEntity extends DefaultEntity {
    @Column()
    suppliername: string
}