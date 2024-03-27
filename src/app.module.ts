import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SongsModule } from "./songs/songs.module";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Song } from "./songs/entities/song.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    database: "spotify",
    host: "ep-floral-glade-a1xtdkzb.ap-southeast-1.aws.neon.tech",
    username: "novinbukannopin",
    password: "zX3n0KYeNlpP",
    entities: [Song],
    synchronize: true,
    ssl: true
  }), SongsModule],
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
