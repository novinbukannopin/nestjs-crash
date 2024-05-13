import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SongsModule } from "./songs/songs.module";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ArtistsModule } from "./artists/artists.module";
import { dataSourceOptions } from "../database/data-source";

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), JwtModule.register({
    secret: "novinimut"
  }),
    SongsModule, AuthModule, UsersModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log("DATABASE NAME : ", dataSource.driver.database);
  }

  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  };
}
