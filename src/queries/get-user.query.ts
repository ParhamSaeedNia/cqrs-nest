/**
 * GetUserQuery - Query for retrieving a single user by ID
 *
 * Queries represent read operations in CQRS.
 * They are immutable DTOs that carry the intent to read data.
 * Queries should not modify state - they only return data.
 */
export class GetUserQuery {
  constructor(public readonly id: string) {}
}
