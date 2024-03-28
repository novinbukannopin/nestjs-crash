import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Body,
  Inject,
  Scope, Query, DefaultValuePipe, UseGuards, Req
} from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDTO } from "./dto/create-song.dto";
import { Song } from "./entities/song.entity";
import { Pagination } from "nestjs-typeorm-paginate";
import { ArtistJwtGuard } from "../auth/guard/artist-jwt.guard";

@Controller("songs")
export class SongsController {
  constructor(private songsService: SongsService) {
  }

  @Post()
  @UseGuards(ArtistJwtGuard)
  create(@Body() createSongDTO: CreateSongDTO, @Req() request): Promise<Song> {
    console.log(request.user);
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({ page, limit });
  }

  @Get(":id")
  findOne(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
      id: number
  ) {
    return this.songsService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() updateSongDTO: CreateSongDTO) {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.songsService.remove(id);
  }
}