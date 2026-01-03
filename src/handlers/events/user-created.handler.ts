import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable, Logger } from '@nestjs/common';
import { UserCreatedEvent } from '../../events/user-created.event';

/**
 * UserCreatedEventHandler - Event Handler
 *
 * Event Handlers:
 * - React to domain events
 * - Perform side effects (e.g., send emails, update read models)
 * - Should be idempotent (safe to run multiple times)
 * - Can be used for eventual consistency
 *
 * This is an example of how events can trigger additional actions
 * without coupling the command handler to those actions.
 */
@EventsHandler(UserCreatedEvent)
@Injectable()
export class UserCreatedEventHandler implements IEventHandler<UserCreatedEvent> {
  private readonly logger = new Logger(UserCreatedEventHandler.name);

  handle(event: UserCreatedEvent) {
    // Example: Send welcome email, update analytics, etc.
    this.logger.log(`User created: ${event.userId} (${event.email})`);
    this.logger.log(`Event timestamp: ${event.timestamp.toISOString()}`);

    // In a real application, you might:
    // - Send a welcome email
    // - Update a read model
    // - Trigger analytics events
    // - Notify other microservices
  }
}
