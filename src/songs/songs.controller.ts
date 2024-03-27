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
  Scope
} from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDTO } from "./dto/create-song.dto";
import { Song } from "./entities/song.entity";

@Controller("songs")
export class SongsController {
  constructor(private songsService: SongsService) {
  }

  @Post()
  create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (e) {
      throw new HttpException(
        "server error",
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e
        }
      );
    }
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