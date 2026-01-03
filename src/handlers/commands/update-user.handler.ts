import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserCommand } from '../../commands/update-user.command';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

/**
 * UpdateUserHandler - Command Handler for updating users
 *
 * This handler demonstrates how command handlers encapsulate business logic
 * for state-changing operations.
 */
@CommandHandler(UpdateUserCommand)
@Injectable()
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    // Business logic: Verify user exists
    const existingUser = await this.userRepository.findById(command.id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${command.id} not found`);
    }

    // Build update object (only include provided fields)
    const updates: Partial<User> = {};
    if (command.name !== undefined) updates.name = command.name;
    if (command.email !== undefined) updates.email = command.email;
    if (command.age !== undefined) updates.age = command.age;

    // Persist the update
    return this.userRepository.update(command.id, updates);
  }
}
