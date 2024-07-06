import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'books' })

export class Books {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column({unique: true})
    code: string;
    @Column()
    title: string;
    @Column()
    author: string;
    @Column()
    stock: number;
}