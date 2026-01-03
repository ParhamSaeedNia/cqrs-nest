/**
 * GetAllUsersQuery - Query for retrieving all users
 *
 * Queries are optimized for reading data.
 * In a full CQRS implementation, queries might read from a separate read model
 * optimized for querying (e.g., a denormalized database or cache).
 */
export class GetAllUsersQuery {
  constructor() {}
}
