/**
 * UserCreatedEvent - Domain Event
 *
 * Domain Events represent something that happened in the domain.
 * They are emitted by command handlers after successful operations.
 *
 * Events can be used for:
 * - Event sourcing
 * - Notifying other bounded contexts
 * - Triggering side effects (e.g., sending emails)
 * - Updating read models
 * - Audit logging
 */
export class UserCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}
