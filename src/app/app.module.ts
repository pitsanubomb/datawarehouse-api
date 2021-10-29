import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'udomrat.ddns.net',
      name: 'data',
      port: 3306,
      username: 'erp',
      password: 'Udlimited@1234',
      database: 'datawarehouse-data-dev',
      entities: [],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      name: 'user',
      host: 'udomrat.ddns.net',
      port: 3306,
      username: 'erp',
      password: 'Udlimited@1234',
      database: 'datawarehouse-dev',
      entities: [UserEntity],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
