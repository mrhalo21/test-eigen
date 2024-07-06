import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from 'src/members/entities/member.entity';
import { IsNull, Repository } from 'typeorm';
import { ReturnDto } from './dto/return.dto';
import { Books } from 'src/books/entities/book.entity';
import { Borrowed } from './entities/borrowed.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrowed)
    private borrowedRepository: Repository<Borrowed>,
    @InjectRepository(Members)
    private membersRepository: Repository<Members>,
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
) {}

  async create(createBorrowDto: CreateBorrowDto) {
    const member = await this.membersRepository.findOne({where:{code:createBorrowDto.memberCode} });
        if (!member) {
            throw new BadRequestException('Member tidak ditemukan');
        }

        if (member.penalty_end_date && new Date() < new Date(member.penalty_end_date)) {
            throw new BadRequestException('Member tidak dapat meminjam karena terkena penalti');
        }

        const activePeminjamans = await this.borrowedRepository.count({
            where: { member, return_date: IsNull() },
        });

        if (activePeminjamans >= 2) {
            throw new BadRequestException('Member hanya dapat meminjam maksimal 2 buku');
        }

        const book = await this.booksRepository.findOne({where:{code:createBorrowDto.bookCode}});
        if (!book) {
            throw new BadRequestException('Buku tidak ditemukan');
        }

        const bookBorrowed = await this.borrowedRepository.findOne({
            where: { book, return_date: IsNull() },
        });

        if (bookBorrowed) {
            throw new BadRequestException('Buku telah dipinjam');
        }

        const peminjaman = new Borrowed();
        peminjaman.member = member;
        peminjaman.book = book;
        peminjaman.borrow_date = new Date();

        return await this.borrowedRepository.save(peminjaman);
  }

  async returnBook(@Body() request: ReturnDto){
    // get member
    const member = await this.membersRepository.findOne({where:{code:request.memberCode} });
        if (!member) {
            throw new BadRequestException('Member tidak ditemukan');
        }
    // get book
    const book = await this.booksRepository.findOne({where:{code:request.bookCode}});
        if (!book) {
            throw new BadRequestException('Buku tidak ditemukan');
        }
    // get borrowed
    const bookBorrowed = await this.borrowedRepository.findOne({
      where: { book, member, return_date: IsNull() },
    });

    if (!bookBorrowed) {
      throw new BadRequestException('member tidak ditemukan meminjam buku');
    }

    if(this.getTimeDiff(bookBorrowed.borrow_date, request.returnDate) > 24*7){
      member.penalty_end_date = this.calculatePenaltyEndDate();
      this.membersRepository.save(member);
    }

    bookBorrowed.return_date = new Date(request.returnDate);

    return await this.borrowedRepository.save(bookBorrowed);
  }

  findAll() {
    return `This action returns all borrow`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrow`;
  }

  update(id: number, updateBorrowDto: UpdateBorrowDto) {
    return `This action updates a #${id} borrow`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrow`;
  }

  getTimeDiff(borrowDate, returnDate){
        borrowDate = new Date(borrowDate);
        returnDate = new Date(returnDate);
        const diffTime = Math.abs(returnDate.getTime() - borrowDate.getTime());
        const diffHour = Math.ceil(diffTime / (1000 * 60 * 60));

        return diffHour;
  }

  // Method to calculate the penalty end date
  calculatePenaltyEndDate(): Date {
    const currentDate = new Date();
    const penaltyEndDate = new Date(currentDate);
    penaltyEndDate.setDate(currentDate.getDate() + 3);
    return penaltyEndDate;
  }

}
