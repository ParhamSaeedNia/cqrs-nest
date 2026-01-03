import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [
    // Configure TypeORM with SQLite database
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true, // Auto-create tables (disable in production)
      logging: true, // Log SQL queries (disable in production)
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
