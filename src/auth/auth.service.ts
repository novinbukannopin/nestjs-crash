import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { LoginDTO } from "./dto/login.dto";
import { User } from "../users/entities/user.entity";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ArtistsService } from "src/artists/artists.service";
import { PayloadTypes } from "./types/payload.types";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private artistsService: ArtistsService
  ) {
  }

  async login(loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);

    if (passwordMatched) {
      delete user.password;

      const payload: PayloadTypes = { email: user.email, userId: user.id };

      const artist = await this.artistsService.findArtist(user.id);

      if (artist) {
        payload.artistId = artist.id;
      }

      return {
        access_token: this.jwtService.sign(payload)
      };
    } else {
      throw new UnauthorizedException("Invalid credentials");
    }
  }
}
