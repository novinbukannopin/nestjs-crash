import { Module } from "@nestjs/common";
import { SongsService } from "./songs.service";
import { SongsController } from "./songs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Song } from "./entities/song.entity";
import { Artist } from "../artists/artists.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  providers: [SongsService],
  controllers: [SongsController]
})
export class SongsModule {
}
