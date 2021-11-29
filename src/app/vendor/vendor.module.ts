import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VendorEntity } from "./entity/vendor.entity";
import { VendorController } from "./vendor.controller";
import { VendorService } from "./vendor.service";

@Module({
    imports: [TypeOrmModule.forFeature([VendorEntity],'data')],
    providers:[VendorService],
    controllers:[VendorController]
})

export class VendorModule {}