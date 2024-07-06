import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'members' })

export class Members {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column({unique: true})
    code: string;
    @Column()
    name: string;
    @Column({nullable:true})
    penalty_end_date: Date | null;
}