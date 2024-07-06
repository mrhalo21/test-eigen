import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsNull } from "typeorm";
import { Books } from './entities/book.entity';
import { Borrowed } from 'src/borrow/entities/borrowed.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private bookRepository: Repository<Books>,
    @InjectRepository(Borrowed)
    private borrowedRepository: Repository<Borrowed>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async findAll() {
    const books = await this.bookRepository.find();

        // Fetch all active peminjamans
        const activePeminjamans = await this.borrowedRepository.find({
            where: { return_date: IsNull() },
            relations: ['book'],
        });

        // Create a set of book IDs that are currently borrowed
        const borrowedBookIds = new Set(activePeminjamans.map(p => p.book.id));

        // Filter out the borrowed books
        const availableBooks = books.filter(book => !borrowedBookIds.has(book.id));

        return availableBooks;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
