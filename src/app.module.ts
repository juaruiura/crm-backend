import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://root:root@mongodb:27017/crm?serverSelectionTimeoutMS=2000&authSource=admin'),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
