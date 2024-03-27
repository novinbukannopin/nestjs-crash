import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Artist } from "../../artists/artists.entity";

@Entity("songs")
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @Column("varchar", { array: true })
  // artists: string[];

  @Column("date")
  releasedDate: Date;

  @Column("time")
  duration: Date;

  @Column("text")
  lyrics: string;

  @ManyToMany(() => Artist, artist => artist.songs, { cascade: true })
  @JoinTable({ name: "artists_songs" })
  artists: Artist[];
}
