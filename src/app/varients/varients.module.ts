import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { AttributeEntity } from './entity/attribute.entity';
import { VarientEntity } from './entity/varients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeEntity, VarientEntity], 'data')],
  controllers: [AttributeController],
  providers: [AttributeService],
})
export class VarientModule {}
