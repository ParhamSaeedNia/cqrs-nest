import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { GetAllUsersQuery } from '../../queries/get-all-users.query';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

/**
 * GetAllUsersHandler - Query Handler for retrieving all users
 *
 * Query handlers are simple and focused on data retrieval.
 * They don't contain complex business logic - that's for command handlers.
 */
@QueryHandler(GetAllUsersQuery)
@Injectable()
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_query: GetAllUsersQuery): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
