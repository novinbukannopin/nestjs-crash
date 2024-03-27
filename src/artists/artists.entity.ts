import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "../songs/entities/song.entity";

@Entity("artists")
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Song, song => song.artists)
  songs: Song[];
}