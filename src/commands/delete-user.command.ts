/**
 * DeleteUserCommand - Command for deleting a user
 *
 * Commands are immutable and contain only the data needed to execute the operation.
 */
export class DeleteUserCommand {
  constructor(public readonly id: string) {}
}
