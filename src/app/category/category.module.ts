import { CategoryEntity } from './entity/category.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity], 'data')],
    controllers:[CategoryController],
    providers:[CategoryService]
})
export class CategoryModule {}
