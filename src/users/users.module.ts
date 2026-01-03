import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './users.controller';
import { User } from '../domain/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

// Import all command handlers
import { CreateUserHandler } from '../handlers/commands/create-user.handler';
import { UpdateUserHandler } from '../handlers/commands/update-user.handler';
import { DeleteUserHandler } from '../handlers/commands/delete-user.handler';

// Import all query handlers
import { GetUserHandler } from '../handlers/queries/get-user.handler';
import { GetAllUsersHandler } from '../handlers/queries/get-all-users.handler';

// Import event handlers
import { UserCreatedEventHandler } from '../handlers/events/user-created.handler';

/**
 * UsersModule - Feature Module
 *
 * This module demonstrates CQRS setup:
 * 1. Registers TypeORM entity
 * 2. Imports CqrsModule (provides CommandBus and QueryBus)
 * 3. Registers all command handlers
 * 4. Registers all query handlers
 * 5. Registers event handlers
 * 6. Provides repository for data access
 * 7. Exposes controller for API endpoints
 */
@Module({
  imports: [
    CqrsModule, // Provides CommandBus and QueryBus
    TypeOrmModule.forFeature([User]), // Register User entity
  ],
  controllers: [UsersController],
  providers: [
    // Repository
    UserRepository,

    // Command Handlers
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,

    // Query Handlers
    GetUserHandler,
    GetAllUsersHandler,

    // Event Handlers
    UserCreatedEventHandler,
  ],
})
export class UsersModule {}
