import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

/**
 * UpdateUserDto - Data Transfer Object for updates
 *
 * All fields are optional since we only update provided fields.
 */
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsInt()
  @Min(0)
  @Max(150)
  @IsOptional()
  age?: number;
}
