import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

/**
 * CreateUserDto - Data Transfer Object
 *
 * DTOs are used for:
 * - Input validation
 * - Type safety
 * - API documentation
 * - Separating API contracts from domain models
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @Min(0)
  @Max(150)
  age: number;
}
