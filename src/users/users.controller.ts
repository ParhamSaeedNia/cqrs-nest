import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { UpdateUserCommand } from '../commands/update-user.command';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { GetUserQuery } from '../queries/get-user.query';
import { GetAllUsersQuery } from '../queries/get-all-users.query';
import { User } from '../domain/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * UsersController - API Controller
 *
 * Controllers in CQRS:
 * - Receive HTTP requests
 * - Dispatch commands or queries using CommandBus/QueryBus
 * - Return responses
 * - Should be thin - no business logic here
 *
 * The separation is:
 * Controller -> CommandBus/QueryBus -> Handler -> Repository -> Database
 */
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * POST /users - Create a new user
   * Uses CommandBus to dispatch CreateUserCommand
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    const command = new CreateUserCommand(dto.name, dto.email, dto.age);
    return this.commandBus.execute(command);
  }

  /**
   * GET /users/:id - Get a user by ID
   * Uses QueryBus to dispatch GetUserQuery
   */
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const query = new GetUserQuery(id);
    return this.queryBus.execute(query);
  }

  /**
   * GET /users - Get all users
   * Uses QueryBus to dispatch GetAllUsersQuery
   */
  @Get()
  async getAllUsers(): Promise<User[]> {
    const query = new GetAllUsersQuery();
    return this.queryBus.execute(query);
  }

  /**
   * PUT /users/:id - Update a user
   * Uses CommandBus to dispatch UpdateUserCommand
   */
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    const command = new UpdateUserCommand(id, dto.name, dto.email, dto.age);
    return this.commandBus.execute(command);
  }

  /**
   * DELETE /users/:id - Delete a user
   * Uses CommandBus to dispatch DeleteUserCommand
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    const command = new DeleteUserCommand(id);
    await this.commandBus.execute(command);
  }
}
