/**
 * CreateUserCommand - Command for creating a new user
 *
 * Commands represent write operations (mutations) in CQRS.
 * They are immutable DTOs that carry the intent to change state.
 * Commands should be named in imperative form (CreateUser, not CreateUserCommand).
 */
export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly age: number,
  ) {}
}
