import { Injectable } from "@nestjs/common";
import { Artist } from "./artists.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ArtistsService {
  constructor(@InjectRepository(Artist) private artistsRepository: Repository<Artist>) {
  }

  findArtist(userId: number): Promise<Artist> {
    return this.artistsRepository.findOneBy({ user: { id: userId } });
  };
}
