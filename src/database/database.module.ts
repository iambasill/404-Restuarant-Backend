import { TypeOrmModule } from "@nestjs/typeorm";
import { createDatabaseOptions } from "./config/data.options";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: createDatabaseOptions,
    }),
  ],
})
export class DatabaseModule {}

