import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './entities/book.entity';
import { Borrowed } from 'src/borrow/entities/borrowed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Books, Borrowed])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
