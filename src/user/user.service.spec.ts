import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/create.user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const mockRepository: Partial<jest.Mocked<Repository<User>>> = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  

  describe('createUser()', () => {
    const dto: CreateUserDto = {
      fullName: 'Basil',
      email: 'basil@gmail.com',
      password: 'password',
    };

    it('should create a user successfully', async () => {
      const savedUser = { id: "1", ...dto } as User;

      repository.findOne.mockResolvedValue(null); 
      repository.create.mockReturnValue(savedUser);
      repository.save.mockResolvedValue(savedUser);

      const result = await service.createUser(dto);

      expect(result).toEqual(savedUser);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(savedUser);
    });

    it('should throw if user already exists', async () => {
      repository.findOne.mockResolvedValue({ id: "1" } as User);

      await expect(service.createUser(dto)).rejects.toThrow(
        BadRequestException,
      );

      expect(repository.create).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException on duplicate DB error', async () => {
      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(dto as User);
      repository.save.mockRejectedValue({ code: '23505' });

      await expect(service.createUser(dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findByEmail()', () => {
    it('should return user if found', async () => {
      const user = { id: "1", email: 'test@test.com' } as User;
      repository.findOne.mockResolvedValue(user);

      const result = await service.findByEmail('test@test.com');

      expect(result).toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
      });
    });

    it('should return null if not found', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.findByEmail('missing@test.com');

      expect(result).toBeNull();
    });
  });

  describe('changePassword()', () => {
    it('should update password after user exists', async () => {
      repository.findOne.mockResolvedValue({ id: "1" } as User);
      repository.update.mockResolvedValue(undefined as any);

      await service.changePassword('test@test.com', 'hashed');

      expect(repository.update).toHaveBeenCalledWith(
        { email: 'test@test.com' },
        { password: 'hashed' },
      );
    });
  });

  describe('activate()', () => {
    it('should activate user', async () => {
      repository.findOne.mockResolvedValue({ id: "1" } as User);
      repository.update.mockResolvedValue(undefined as any);

      await service.activate('test@test.com');

      expect(repository.update).toHaveBeenCalledWith(
        { email: 'test@test.com' },
        { status: 'active' },
      );
    });
  });
});
