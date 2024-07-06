import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';
import { BorrowModule } from './borrow/borrow.module';
import { dataSourceOptions } from './db/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MembersModule,
    BooksModule,
    BorrowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
