import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteUserCommand } from '../../commands/delete-user.command';
import { UserRepository } from '../../repositories/user.repository';

/**
 * DeleteUserHandler - Command Handler for deleting users
 *
 * Command handlers can perform validation and business logic
 * before executing the actual operation.
 */
@CommandHandler(DeleteUserCommand)
@Injectable()
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    // Business logic: Verify user exists before deletion
    const existingUser = await this.userRepository.findById(command.id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${command.id} not found`);
    }

    // Execute deletion
    await this.userRepository.delete(command.id);
  }
}
