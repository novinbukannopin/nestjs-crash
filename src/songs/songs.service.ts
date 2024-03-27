import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Song } from "./entities/song.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSongDTO } from "./dto/create-song.dto";
import { UpdateSongDto } from "./dto/update-song.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { Artist } from "../artists/artists.entity";

@Injectable()
export class SongsService {

  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
    @InjectRepository(Artist) private artistsRepository: Repository<Artist>
  ) {
  }

  private readonly songs = [];

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    song.artists = await this.artistsRepository.findByIds(songDTO.artists);

    return this.songsRepository.save(song);
  }

  findAll() {
    return this.songsRepository.find();
  }

  findOne(id: number) {
    return this.songsRepository.findOneBy(
      {
        id
      }
    );
  }

  remove(id: number) {
    return this.songsRepository.delete(id);
  }

  update(id: number, updateSongDTO: UpdateSongDto) {
    return this.songsRepository.update(id, updateSongDTO);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder("song");
    queryBuilder.orderBy("song.releasedDate", "DESC");

    return paginate<Song>(queryBuilder, options);
  }
}