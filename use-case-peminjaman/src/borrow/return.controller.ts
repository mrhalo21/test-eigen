import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { ReturnDto } from './dto/return.dto';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Controller('return')
export class ReturnController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  return(@Body() request: ReturnDto) {
    return this.borrowService.returnBook(request);
  }
}
