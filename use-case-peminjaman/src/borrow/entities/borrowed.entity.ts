import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Members } from 'src/members/entities/member.entity';
import { Books } from 'src/books/entities/book.entity';

@Entity({ name: 'borrowed' })

export class Borrowed {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @ManyToOne(type => Members)
    @JoinColumn({ name: 'members_id' })
    member: Members;
    @ManyToOne(type => Books)
    @JoinColumn({ name: 'books_id' })
    book: Books;
    @Column()
    borrow_date: Date;
    @Column({nullable: true})
    return_date: Date | null;
}