# CQRS Flow Diagram

## Command Flow (Write Operation)

```
┌─────────────┐
│ HTTP POST   │  Create User Request
│ /users      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller  │  Receives DTO, validates input
│ (Thin)      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ CommandBus  │  Dispatches CreateUserCommand
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Command     │  CreateUserHandler
│ Handler     │  - Validates business rules
│             │  - Creates User entity
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Repository  │  Persists to database
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Database    │  SQLite (db.sqlite)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ EventBus    │  Publishes UserCreatedEvent
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Event       │  UserCreatedEventHandler
│ Handler     │  - Logs event
│             │  - Could send email, etc.
└─────────────┘
```

## Query Flow (Read Operation)

```
┌─────────────┐
│ HTTP GET    │  Get User Request
│ /users/:id  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller  │  Receives ID parameter
│ (Thin)      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ QueryBus    │  Dispatches GetUserQuery
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Query       │  GetUserHandler
│ Handler     │  - Simple data retrieval
│             │  - No business logic
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Repository  │  Queries database
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Database    │  SQLite (db.sqlite)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Returns     │  User entity
│ Response    │
└─────────────┘
```

## Key Differences


|--------|----------|---------|
| **Purpose** | Change state | Read data |
| **Returns** | Entity or void | Data |
| **Side Effects** | Yes (modifies DB) | No |
| **Business Logic** | Contains validation & rules | Minimal (just retrieval) |
| **Events** | Can emit events | Never emits events |
| **Optimization** | Optimized for writes | Optimized for reads |

## File Organization

```
Commands (Writes):
  commands/create-user.command.ts
  └──> handlers/commands/create-user.handler.ts
       └──> repositories/user.repository.ts
            └──> domain/entities/user.entity.ts

Queries (Reads):
  queries/get-user.query.ts
  └──> handlers/queries/get-user.handler.ts
       └──> repositories/user.repository.ts
            └──> domain/entities/user.entity.ts

Events (Side Effects):
  events/user-created.event.ts
  └──> handlers/events/user-created.handler.ts
```

## Learning Checklist

- [ ] Understand the difference between Commands and Queries
- [ ] See how CommandBus routes commands to handlers
- [ ] See how QueryBus routes queries to handlers
- [ ] Understand how handlers encapsulate business logic
- [ ] See how repositories abstract data access
- [ ] Understand how events enable decoupling
- [ ] Notice the separation of concerns at each layer

