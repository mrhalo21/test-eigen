import { Module } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnController } from './return.controller';
import { Members } from 'src/members/entities/member.entity';
import { Books } from 'src/books/entities/book.entity';
import { Borrowed } from './entities/borrowed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Books, Borrowed, Members])],
  controllers: [BorrowController, ReturnController],
  providers: [BorrowService],
})
export class BorrowModule {}
