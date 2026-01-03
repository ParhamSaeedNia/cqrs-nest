import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/entities/user.entity';

/**
 * UserRepository - Data Access Layer
 *
 * The repository pattern abstracts data access logic.
 * This keeps our domain logic separate from database concerns.
 * In CQRS, repositories are typically used by command handlers for writes.
 */
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: string, updates: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updates);
    const updated = await this.findById(id);
    if (!updated) {
      throw new Error(`User with ID ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
