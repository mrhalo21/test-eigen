import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Members } from 'src/members/entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowed } from 'src/borrow/entities/borrowed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Members, Borrowed])],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
