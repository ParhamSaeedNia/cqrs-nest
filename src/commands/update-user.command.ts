/**
 * UpdateUserCommand - Command for updating an existing user
 *
 * Commands carry the intent to modify state.
 * They are handled by Command Handlers which perform the actual business logic.
 */
export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly email?: string,
    public readonly age?: number,
  ) {}
}
