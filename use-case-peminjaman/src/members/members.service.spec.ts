import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { Repository } from 'typeorm';
import { Members } from './entities/member.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('MembersService', () => {
  let service: MembersService;
  let repository: Repository<Members>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersService,
        {
          provide: getRepositoryToken(Members),
          useClass: Repository
        }
      ],
    }).compile();

    service = module.get<MembersService>(MembersService);
    repository = module.get<Repository<Members>>(getRepositoryToken(Members));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    //arrange
    const member = {
      id: 1,
      code: "M001",
      name: "Angga",
      penalty_end_date: "2024-07-09T14:43:39.000Z",
      borrowed: 0
    };
    const members = [member];
    jest.spyOn(repository, 'find').mockResolvedValue(members as unknown as Members[]);

    //act
    const result = await service.findAll();

    // assert
    expect(result).toEqual(members);
  });
});
