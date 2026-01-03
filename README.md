# CQRS Example Project

A comprehensive example of CQRS (Command Query Responsibility Segregation) pattern implementation using NestJS, TypeORM, and SQLite.

## What is CQRS?

**CQRS (Command Query Responsibility Segregation)** is an architectural pattern that separates read and write operations:

- **Commands** = Write operations (mutations) - change state
- **Queries** = Read operations - retrieve data without changing state

### Key Benefits

1. **Separation of Concerns**: Read and write logic are completely separate
2. **Scalability**: Can scale reads and writes independently
3. **Optimization**: Read models can be optimized differently than write models
4. **Flexibility**: Can use different databases for reads and writes
5. **Clear Intent**: Commands and queries explicitly show what operations do

## Project Structure

```
src/
├── domain/
│   └── entities/          # Domain models (User entity)
├── commands/              # Write operations (CreateUser, UpdateUser, DeleteUser)
├── queries/               # Read operations (GetUser, GetAllUsers)
├── handlers/
│   ├── commands/          # Command handlers (business logic for writes)
│   ├── queries/           # Query handlers (data retrieval logic)
│   └── events/            # Event handlers (side effects)
├── repositories/          # Data access layer
├── events/                # Domain events
└── users/
    ├── users.controller.ts    # API endpoints
    └── users.module.ts         # Feature module configuration
```

## Architecture Flow

### Command Flow (Write Operations)
```
HTTP Request → Controller → CommandBus → Command Handler → Repository → Database
                                                              ↓
                                                         Domain Event
```

### Query Flow (Read Operations)
```
HTTP Request → Controller → QueryBus → Query Handler → Repository → Database
```

## Components Explained

### 1. Commands (`src/commands/`)
Commands represent **intentions to change state**. They are immutable DTOs.

- `CreateUserCommand` - Intent to create a new user
- `UpdateUserCommand` - Intent to update an existing user
- `DeleteUserCommand` - Intent to delete a user

### 2. Queries (`src/queries/`)
Queries represent **intentions to read data**. They never modify state.

- `GetUserQuery` - Retrieve a single user by ID
- `GetAllUsersQuery` - Retrieve all users

### 3. Command Handlers (`src/handlers/commands/`)
Command handlers contain **business logic** for write operations:
- Validate commands
- Execute business rules
- Persist changes via repositories
- Emit domain events

### 4. Query Handlers (`src/handlers/queries/`)
Query handlers are optimized for **data retrieval**:
- Simple and fast
- No business logic (that's in command handlers)
- Can read from optimized read models

### 5. Repository (`src/repositories/`)
The repository pattern abstracts data access:
- Keeps domain logic separate from database concerns
- Used by handlers to persist/retrieve data

### 6. Domain Events (`src/events/`)
Events represent **something that happened** in the domain:
- Emitted after successful command execution
- Can trigger side effects (emails, notifications, etc.)
- Enable eventual consistency

### 7. Event Handlers (`src/handlers/events/`)
Event handlers react to domain events:
- Perform side effects
- Should be idempotent
- Can update read models

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The application will start on `http://localhost:3000`

## API Endpoints

### Create User (Command)
```bash
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

### Get User (Query)
```bash
GET /users/:id
```

### Get All Users (Query)
```bash
GET /users
```

### Update User (Command)
```bash
PUT /users/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "age": 31
}
```

### Delete User (Command)
```bash
DELETE /users/:id
```

## Example Usage

### Create a user
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "email": "alice@example.com",
    "age": 25
  }'
```

### Get all users
```bash
curl http://localhost:3000/users
```

### Get a specific user
```bash
curl http://localhost:3000/users/{user-id}
```

### Update a user
```bash
curl -X PUT http://localhost:3000/users/{user-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Smith",
    "age": 26
  }'
```

### Delete a user
```bash
curl -X DELETE http://localhost:3000/users/{user-id}
```

## Key Concepts to Understand

### 1. Command vs Query
- **Command**: Changes state, returns void or the created/updated entity
- **Query**: Returns data, never changes state

### 2. CommandBus vs QueryBus
- **CommandBus**: Dispatches commands to their handlers
- **QueryBus**: Dispatches queries to their handlers

### 3. Separation of Concerns
- **Controllers**: Handle HTTP, dispatch commands/queries
- **Handlers**: Contain business logic
- **Repositories**: Handle data access
- **Entities**: Domain models

### 4. Event-Driven Architecture
After a command succeeds, events can be emitted to:
- Update read models
- Send notifications
- Trigger other processes
- Maintain eventual consistency

## Best Practices Demonstrated

1. ✅ **Clear separation** between commands and queries
2. ✅ **Single Responsibility** - each handler does one thing
3. ✅ **Repository pattern** for data access abstraction
4. ✅ **Domain events** for decoupled side effects
5. ✅ **Type safety** with TypeScript
6. ✅ **Error handling** with proper exceptions
7. ✅ **Documentation** in code comments

## Advanced CQRS Concepts (Not Implemented Here)

In more advanced CQRS implementations, you might see:

1. **Separate Read/Write Databases**: Different databases optimized for reads vs writes
2. **Event Sourcing**: Store events instead of current state, rebuild state from events
3. **Materialized Views**: Pre-computed read models updated via events
4. **CQRS + Event Sourcing**: Combine both patterns for maximum flexibility
5. **Saga Pattern**: Coordinate multiple commands across services

## Learning Path

1. **Start here**: Understand commands vs queries
2. **Next**: See how handlers encapsulate business logic
3. **Then**: Explore how events enable decoupling
4. **Finally**: Consider when to use separate read/write models

## Resources

- [NestJS CQRS Module Documentation](https://docs.nestjs.com/recipes/cqrs)
- [Martin Fowler on CQRS](https://martinfowler.com/bliki/CQRS.html)
- [CQRS Pattern - Microsoft Docs](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)

## License

This is an educational example project.
