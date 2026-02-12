import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/create.user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  /**
   * Create a new user
   */
  public async createUser(req: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email: req.email } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    try {
      const user = this.userRepository.create(req);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
        throw new BadRequestException('Email already exists');
      }
      throw new BadRequestException(`Failed to create user: ${error.message}`);
    }
  }

  /**
   * Find user by email (returns null if not found)
   */
  public async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'status']
    });
  }


  /**
   * Get user by email (throws if not found)
   */
  public async getByEmail(email: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Change user password
   */
  public async changePassword(email: string, hashedPassword: string): Promise<void> {
    await this.getByEmail(email);
    await this.userRepository.update({ email }, { password: hashedPassword });
  }

  /**
   * Update user status
   */
  private async updateStatus(email: string, status: 'active' | 'inactive' | 'pending' | 'deleted'): Promise<void> {
    await this.getByEmail(email);
    await this.userRepository.update({ email }, { status });
  }

  /**
   * Activate user account (convenience method)
   */
  public async activate(email: string): Promise<void> {
    await this.updateStatus(email, 'active');
  }
}