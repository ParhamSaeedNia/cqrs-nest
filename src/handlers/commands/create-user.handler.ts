import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserCommand } from '../../commands/create-user.command';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserCreatedEvent } from '../../events/user-created.event';

/**
 * CreateUserHandler - Command Handler
 *
 * Command Handlers:
 * - Execute write operations (mutations)
 * - Contain business logic for the command
 * - Use repositories to persist changes
 * - Can emit domain events after successful operations
 *
 * In CQRS, command handlers are responsible for:
 * 1. Validating the command
 * 2. Executing business logic
 * 3. Persisting changes
 * 4. Emitting events (optional)
 */
@CommandHandler(CreateUserCommand)
@Injectable()
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    // Business logic: Check if email already exists
    const existingUser = await this.userRepository.findByEmail(command.email);
    if (existingUser) {
      throw new ConflictException(
        `User with email ${command.email} already exists`,
      );
    }

    // Create the user entity
    const user = new User();
    user.name = command.name;
    user.email = command.email;
    user.age = command.age;

    // Persist the user
    const savedUser = await this.userRepository.create(user);

    // Emit domain event (optional - for event sourcing or other handlers)
    this.eventBus.publish(new UserCreatedEvent(savedUser.id, savedUser.email));

    return savedUser;
  }
}
