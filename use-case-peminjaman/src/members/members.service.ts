import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from './entities/member.entity';
import { IsNull, Repository } from 'typeorm';
import { Borrowed } from 'src/borrow/entities/borrowed.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Members)
    private memberRepository: Repository<Members>,
    @InjectRepository(Borrowed)
    private readonly borrowedRepository: Repository<Borrowed>,
  ) {}

  async findAll() {
    const members =  this.memberRepository.find();
    const membersWithCount = await Promise.all((await members).map(async member => {
      const borrowed = await this.borrowedRepository.count({ where: { member, return_date:IsNull() } });
        return {
            ...member,
            borrowed,
        };
    }));

    return membersWithCount;
  }

  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member';
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
