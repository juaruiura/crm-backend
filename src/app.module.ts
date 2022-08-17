import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersController } from './customers/customers.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [AppController, CustomersController, UsersController],
  providers: [AppService],
})
export class AppModule {}