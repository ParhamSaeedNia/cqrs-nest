import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUserQuery } from '../../queries/get-user.query';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

/**
 * GetUserHandler - Query Handler
 *
 * Query Handlers:
 * - Execute read operations (no mutations)
 * - Are optimized for reading data
 * - Can read from read models, caches, or the same database
 * - Should be fast and efficient
 *
 * In a full CQRS implementation, queries might:
 * - Read from a separate read database (optimized for queries)
 * - Use materialized views
 * - Use caching layers
 * - Use denormalized data structures
 */
@QueryHandler(GetUserQuery)
@Injectable()
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<User> {
    const user = await this.userRepository.findById(query.id);

    if (!user) {
      throw new NotFoundException(`User with ID ${query.id} not found`);
    }

    return user;
  }
}
